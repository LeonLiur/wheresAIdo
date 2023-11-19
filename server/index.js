const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {

  socket.on("send_message", (data) => {
    // socket.to(data.room).emit("receive_message", data)
    socket.to("11").emit("receive_message", data)
  });

  socket.on("join_room", (roomNum) => {
    socket.join(roomNum);
  })

});

server.listen(3001, () => {
});

app.get('/getRoom', (req, res) => {
  res.send('11')
})