import type { MetaFunction } from "@remix-run/node";
import { Button } from "app/@/components/ui/button";
import { Input } from "app/@/components/ui/input";
import { SyntheticEvent, useEffect, useState } from "react";
import * as io from "socket.io-client";

const socket = io.connect("http://localhost:3001/");

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [msg, setMsg] = useState();
  const [found, setFound] = useState(false);

  useEffect(() => {
    socket.on("receive_message", (data: any) => {
      alert(data.message);
    });
  }, [socket]);

  const sendMessage = () => {
    console.log(1);
    socket.emit("send_message", { message: msg });
  };

  function handleClick(event: any) {
    const threshold = 15;
    const x = event.clientX;
    const y = event.clientY;
    console.log(x, y);
    if (
      !found &&
      x < 553 + threshold &&
      x > 553 - threshold &&
      y < 223 + threshold &&
      y > 233 - threshold
    ) {
      setFound(true);
      socket.emit("send_message", { message: "found waldo" });
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <img src="/assets/Waldo.jpeg" alt="Waldo" onClick={handleClick} />
      <Input
        type="email"
        placeholder="Email"
        onChange={(e: any) => setMsg(e.target.value)}
      />
      <Button onClick={sendMessage}>Sumbit</Button>
    </div>
  );
}
