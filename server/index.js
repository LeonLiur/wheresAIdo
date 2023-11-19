const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require('dotenv').config()

app.use(cors());

const server = http.createServer(app);

const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;

const image_size = '1024x1024'

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
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
});

app.get('/getRoom', (req, res) => {
  res.send('11')
})