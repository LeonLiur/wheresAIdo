import * as io from "socket.io-client";
import { useEffect, useState } from "react";
import { Button } from "~/@/components/ui/button";
import { Input } from "~/@/components/ui/input";

const socket = io.connect("http://localhost:3001");

function App() {

  // Messages States
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("")
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = (room_id: string) => {
    setRoom(room_id)
    socket.emit("join_room", room_id);
  };

  const sendMessage = () => {
    socket.emit("send_message", {message, room});
  };

  useEffect(() => {
    socket.on("receive_message", (data: any) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div>
      <Button onClick={() => joinRoom("11")}> Join Room</Button>
      <Input onChange={(e: any) => setMessage(e.target.value)}></Input>
      <Button onClick={sendMessage}> Send mock message</Button>
      <h3>{messageReceived}</h3>
    </div>
  );
}

export default App;