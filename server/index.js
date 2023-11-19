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
  console.log(`User Connected: ${socket.id}`);

  socket.broadcast.emit("user_joined", socket.id)

  socket.on("send_message", (data) => {
    // socket.to(data.room).emit("receive_message", data)
    socket.to("11").emit("receive_message", data)
  });

  socket.on("join_room", (roomNum) => {
    socket.join(roomNum);
  })

  socket.on("add_points", (data) => {
    let playerRef = db.ref(`rooms/${data.room_number}/players/${data.uid}`)
    // if they ran out of time
    playerRef.get().then((snapshot) => {
      var current_points = snapshot.child("score").val()
      
      // give them points
      current_points += data.time_left
      playerRef.update({"score": current_points})
    })   
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

app.post('/createRoom', async (req, res) => {
  let roomNum = db.ref(`roomNumbers`)
  let roomsInUse = []
  let roomNumber = 11
  roomNum.get().then((snapshot) => {
    roomsInUse = snapshot.val()
    roomNumber = roomsInUse[roomsInUse.length - 1] + 1

    let roomRef = db.ref(`rooms/${roomNumber}`)
    roomRef.set({
      roomNumber,
      players: {
        [req.body.uid]: {
          name: "",
          score: ""
        }
      }


    })

    roomNum.update([...roomsInUse, roomNumber])

    res.send(JSON.stringify(roomNumber))
  })
})