import * as io from "socket.io-client";

import { useEffect, useState } from "react";
import { Button } from "~/@/components/ui/button";
import { Input } from "~/@/components/ui/input";

const color = ["red", "blue", "green", "purple"];

const socket = io.connect("http://localhost:3001");

export function Players() {
  const [users, setUsers] = useState<Array<string>>([]);
  socket.on("user_joined", (data: any) => {
    console.log(data);
    setUsers([...users, data]);
  });

  return (
    <div className="flex gap-4">
      {users.map((user, key) => {
        return (
          <div
            className={`w-24 h-24 rounded-full bg-${color[key]}-600`}
            key={key}
          ></div>
        );
      })}
    </div>
  );
}

export default function Room() {
  // Messages States
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = (room_id: string) => {
    setRoom(room_id);
    socket.emit("join_room", room_id);
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data: any) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="p-4 flex gap-4">
      <div className="flex gap-4">
        <Button onClick={() => joinRoom("11")}> Join Room</Button>
        <Input onChange={(e: any) => setMessage(e.target.value)}></Input>
        <Button onClick={sendMessage}> Send mock message</Button>
        <h3>{messageReceived}</h3>
      </div>
      <Players />
    </div>
  );
}
