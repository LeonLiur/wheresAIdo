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

io.on("connection", async(socket) => {
  console.log(`User Connected: ${socket.id}`);
  
  socket.on("start_game", room => {
    console.log("start")
    socket.to(room).emit("start_game", room)
  })



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

  socket.on("display_image", async(room) => {
    let prompts = await getPrompts(room)
    console.log(prompts)
    socket.broadcast.emit("send_images", prompts)
    // socket.to(room.toString()).emit("send_images", prompts)
    // socket.to(room.toString()).emit("images", {prompts})
  })

});

async function generateImg(prompt){
  let input = " A scene with a " +
      prompt +
      "background in a 'Where's Waldo' style with many small cartoonish characters in the scene but WITHOUT having a Waldo character anywhere in the scene"
  const dalleRes = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_KEY}`
    },
    body: JSON.stringify({
      model: 'dall-e-2',
      prompt: `${input}`,
      n: 1,
      size: image_size
    })
  }).then(response => response.json()).catch(error => console.error('Error:', error));

  const URL = dalleRes.data[0].url
  const size = image_size.split('x')
  return ({ img_url: URL, img_width: size[0], img_height: size[1] })
}

app.get('/generate_waldo', async (req, res) => {
  console.log('received fetch')
  let ret = await generateImg(req.body.prompt)
  res.status(200).send(ret)
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
      prompts: [],
      roomNumber: roomNumber.toString(),
      host: req.body.uid,
      players: {
        [req.body.uid]: {
          name: req.body.name,
          score: 0
        }
      },
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

    res.send(JSON.stringify(users))


  }
  else{

    res.status(400).send("No room number")
  }

})

app.post('/addPrompt', async(req, res) => {
  let roomRef = db.ref(`rooms/${parseInt(req.body.roomNum)}/prompts`)

  let prompts = (await roomRef.get()).val()
  let ret = await generateImg(req.body.prompt)
  if(prompts == null){
    await roomRef.set([ret])
  }
  else{
    prompts.push(ret)
    await roomRef.set(prompts)
  }
  res.status(200)
})

async function getPrompts(room){
  let roomRef = db.ref(`rooms/${room}/prompts`)
  let prompts = (await roomRef.get()).val()
  return prompts
}