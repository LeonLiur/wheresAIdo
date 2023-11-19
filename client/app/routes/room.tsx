import * as io from "socket.io-client";

import { useEffect, useState } from "react";
import { Button } from "~/@/components/ui/button";
import { Input } from "~/@/components/ui/input";
import config from "../../public/config.json";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

const color = ["red", "blue", "green", "purple"];

const socket = io.connect(config.SERVER_URL);

export function Players() {
  const [users, setUsers] = useState<Array<string>>([]);
  socket.on("user_joined", (data: any) => {
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

enum Actions {
  NONE = 0,
  JOIN = 1,
  CREATE = 2,
}

export default function Room() {
  // Messages States
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [action, setAction] = useState<Actions>(Actions.NONE);
  const auth = getAuth();

  useEffect(() => {
    signInAnonymously(auth)
      .then(() => {})
      .catch((error: any) => {
        console.log(error.message);
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  }, []);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      console.log(auth.currentUser?.uid);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

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

  async function createRoom() {
    setAction(Actions.CREATE);
    const getRoom = await (
      await fetch(`${config.SERVER_URL}/createRoom`, {
        method: "POST",
        body: JSON.stringify({
          uid: auth.currentUser?.uid,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    setRoom(getRoom);
  }

  return (
    <div className="p-4 flex gap-4 flex-col">
      <div className="flex gap-4">
        <Button
          onClick={() => setAction(Actions.JOIN)}
          variant={action == Actions.CREATE ? "secondary" : "default"}
        >
          Join Room
        </Button>
        <Button
          onClick={createRoom}
          variant={action == Actions.JOIN ? "secondary" : "default"}
        >
          Start Room
        </Button>
        {/* <Button onClick={() => joinRoom("11")}> Join Room</Button> */}
        {/* <Input onChange={(e: any) => setMessage(e.target.value)}></Input> */}
        {/* <Button onClick={sendMessage}> Send mock message</Button> */}
        {/* <h3>{messageReceived}</h3> */}
      </div>
      {action == Actions.JOIN ? (
        <div className="flex gap-4">
          <Input
            onChange={(e: any) => setMessage(e.target.value)}
            placeholder="Room Number"
          ></Input>
          <Button>Join</Button>
        </div>
      ) : action == Actions.CREATE ? (
        <div>
          <h1>Join Room: {room}</h1>
        </div>
      ) : null}
      <Players />
    </div>
  );
}
