import type { MetaFunction } from "@remix-run/node";
import { Button } from "app/@/components/ui/button";
import { Input } from "app/@/components/ui/input";
import { SyntheticEvent, useEffect, useState } from "react";
import * as io from "socket.io-client";
import waldo from '../../public/waldo.json';



// const socket = io.connect("http://localhost:3001/");


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [msg, setMsg] = useState();

  // useEffect(() => {
  //   socket.on("receive_message", (data: any) => {
  //     alert(data.message);
  //   });
  // }, [socket]);

  const sendMessage = () => {
    console.log(1);
    // socket.emit("send_message", { message: msg });
  };

  function handleClick(event: any) {
    const img = new Image();
    img.src = "/assets/1.jpg";
  
    img.onload = () => {

      const renderedWidth = Math.min(window.innerWidth, img.width);
      const renderedHeight = img.height * (window.innerWidth / img.width);

      // console.log(renderedWidth, renderedHeight);

      const x = (event.clientX / renderedWidth) * 100;
      const y = (event.clientY / renderedHeight) * 100;

      // console.log(x, y);

      const waldo_x = waldo.coords[0].x;
      const waldo_y = waldo.coords[0].y;

      // console.log(waldo_x, waldo_y);

      if (Math.abs(x - Number(waldo_x)) < 1.5 && Math.abs(y - Number(waldo_y)) < 1.5) {
        console.log("You found Waldo!");
      } else {
        console.log("Try again!");
      }
    }
  }
  
  return (
    <div>
      <img src="/assets/1.jpg" alt="Waldo" onClick={handleClick} />
    </div>
  );
}
