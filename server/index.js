const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require('dotenv').config()
const admin = require("firebase-admin");
const serviceAccount = require("./admin.json");
const { getDatabase, child } = require('firebase-admin/database')
const bodyParser = require('body-parser')

app.use(cors());
app.use(express.json())

const server = http.createServer(app);
const OPENAI_KEY = process.env.OPENAI_KEY;


const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://waldo-224bf-default-rtdb.firebaseio.com"
});

const db = getDatabase(firebaseApp)

const image_size = '1024x1024'

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log(`User Connected: ${socket.id}`);
  
  socket.on("send_message", (data) => {
    // socket.to(data.room).emit("receive_message", data)
    socket.to("11").emit("receive_message", data)
  });

  socket.on("join_room", (message) => {
    console.log(message)
    socket.to(message.roomNum).emit("user_joined", {name: message.name, uid: message.uid, score: message.score})
    socket.join(message.roomNum);
  })

  socket.on("add_points", (data) => {
    console.log("Adding points")
    let playerRef = db.ref(`rooms/${data.room_number}/players/${data.uid}`)
    // if they ran out of time
    playerRef.get().then((snapshot) => {
      var current_points = snapshot.child("score").val()
      
      // give them points
      current_points += data.time_left
      playerRef.update({"score": current_points})
    })
     
    socket.broadcast.emit("reset_game", {})
  })

});

app.get('/generate_waldo', async (req, res) => {
  console.log('received fetch')
  const dalleRes = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_KEY}`
    },
    body: JSON.stringify({
      model: 'dall-e-2',
      prompt: `${req.query.prompt}`,
      n: 1,
      size: image_size
    })
  }).then(response => response.json()).catch(error => console.error('Error:', error));

  const URL = dalleRes.data[0].url
  const size = image_size.split('x')

  res.status(200).send({ img_url: URL, img_width: size[0], img_height: size[1] })
})

server.listen(3001, () => {
  console.log("Listening in on 3001!")
});

app.post('/createRoom', (req, res) => {

  let roomNum = db.ref(`roomNumbers`)
  let roomsInUse = []
  let roomNumber = 11
  roomNum.get().then((snapshot) => {
    roomsInUse = snapshot.val()
    if (roomsInUse == null){
      roomNumber = 0
      roomsInUse = []
    }
    else{
      roomNumber = roomsInUse[roomsInUse.length - 1] + 1
    }

    let roomRef = db.ref(`rooms/${roomNumber}`)
    roomRef.set({
      roomNumber: roomNumber.toString(),
      host: req.body.uid,
      players: {
        [req.body.uid]: {
          name: req.body.name,
          score: 0
        }
      }
    })

    roomNum.update([...roomsInUse, roomNumber])

    res.send(JSON.stringify(roomNumber))
  })

})

app.post("/joinRoom", async(req, res) => {
  let roomNum = db.ref(`roomNumbers`)
  const roomNumbers = (await roomNum.get()).val()
  if (req.body.roomNum in roomNumbers){
    let roomRef = db.ref(`rooms/${req.body.roomNum}/players`)

    let users = (await roomRef.get()).val()

    let userRef = db.ref(`rooms/${req.body.roomNum}/players/${req.body.uid}`)


    await userRef.set({ 
      [req.body.uid]:{
        "name": req.body.name,
        score: 0
      }
    })

    // let ids = Object.keys(users)
    // let values = Object.values(users)
    // let ret = []
    // for (let i = 0; i < ids.length; i++){
    //   ret.push({
    //     id: ids[i],
    //     name: values[i].name,
    //     score: values[i].score
    //   })
    // }

    res.send(JSON.stringify(users))


  }
  else{

    res.status(200).send("No room number")
  }

})