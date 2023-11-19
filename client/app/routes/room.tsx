import { Button } from "~/@/components/ui/button";
import * as io from "socket.io-client";
import { useState } from "react";

const socket = io.connect("http://localhost:3001/");
const color = ["red", "blue", "green", "purple"];

async function getRoom() {
  let result = await fetch("http://localhost:3001/getRoom");
  console.log(await result.json());
}

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
  const sendMessage = () => {
    console.log(1);
    socket.emit("send_message", {});
  };

  return (
    <div className="p-4 flex gap-4">
      <div className="flex gap-4">
        <Button>Join Room</Button>
        <Button onClick={getRoom}>Start Room</Button>
      </div>
      <Players />
    </div>
  );
}
