import * as io from "socket.io-client";

import { useEffect, useState } from "react";
import { Button } from "~/@/components/ui/button";
import { Input } from "~/@/components/ui/input";
import config from "../../public/config.json";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import Header from "~/@/components/header";

const color = ["red", "blue", "green", "purple"];

const socket = io.connect(config.SERVER_URL);

export function Players(props: { users: object }) {
  const [users, setUsers] = useState<any>(props.users);
  socket.on(
    "user_joined",
    (data: { uid: string; roomNum: string; name: string; score: number }) => {
      let temp = { ...users };
      temp[data.uid] = { name: data.name, score: data.score };
      setUsers(temp);
    }
  );

  return (
    <div className="flex gap-4">
      {users &&
        Object.keys(users).map((id: any, idx: number) => {
          let value = users[id];
          return (
            <div key={id} className="flex gap-2 items-center">
              <div className="text-right">
                <p>{value.name}</p>
                <p>{idx}</p>
              </div>
              <div
                className={`w-24 h-24 rounded-full bg-${color[idx]}-600`}
              ></div>
            </div>
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
  const [room, setRoom] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [action, setAction] = useState<Actions>(Actions.NONE);
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);
  const [players, setPlayers] = useState<object>({});
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
      console.log(auth.currentUser?.uid);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  const joinRoom = async () => {
    const roomExists = await (
      await fetch(`${config.SERVER_URL}/joinRoom`, {
        method: "POST",
        body: JSON.stringify({
          roomNum: room,
          name: name,
          uid: auth.currentUser?.uid,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();

    if (roomExists == "No room number") {
      //no room found
    } else {
      socket.emit("join_room", {
        roomNum: room,
        name,
        uid: auth.currentUser?.uid,
        score: 0,
      });
      setJoined(true);
      setPlayers(roomExists);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data: any) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  async function createRoom() {
    setAction(Actions.CREATE);
    let getRoom = await (
      await fetch(`${config.SERVER_URL}/createRoom`, {
        method: "POST",
        body: JSON.stringify({
          uid: auth.currentUser?.uid,
          name: name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    getRoom = getRoom.toString();
    setRoom(getRoom);

    socket.emit("join_room", {
      roomNum: getRoom,
      name,
      uid: auth.currentUser?.uid,
      score: 0,
    });
    setJoined(true);
  }

  return (
    <div className="p-4 flex gap-4 flex-col">
      <Header />
      <div className="flex gap-4">
        <Input
          placeholder="Username"
          onChange={(e: any) => setName(e.target.value)}
        ></Input>
        <Button
          onClick={() => setAction(Actions.JOIN)}
          variant={action == Actions.CREATE ? "secondary" : "default"}
          disabled={name == ""}
        >
          Join Room
        </Button>
        <Button
          onClick={createRoom}
          variant={action == Actions.JOIN ? "secondary" : "default"}
          disabled={name == ""}
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
            onChange={(e: any) => setRoom(e.target.value)}
            placeholder="Room Number"
          ></Input>
          <Button onClick={joinRoom}>Join</Button>
        </div>
      ) : action == Actions.CREATE ? (
        <div className="gap-4">
          <h1>Share your room with friends: {room}</h1>
          <Button>Start Game!</Button>
        </div>
      ) : null}
      <p className="text-lg font-semibold">Players</p>
      {joined ? <Players users={players} /> : null}
    </div>
  );
}
