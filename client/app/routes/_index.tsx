import type { MetaFunction } from "@remix-run/node";
import { Button } from "app/@/components/ui/button";
import { Input } from "app/@/components/ui/input";
import { SyntheticEvent, useEffect, useState } from "react";
import * as io from "socket.io-client";
import waldo from "../../public/waldo.json";
import new_waldo from "../../public/assets/new_waldo.png";
import config from "../../public/config.json";
import { getAuth, } from "firebase/auth";

const threshold = 1.5;
const pic_id = 1;

const socket = io.connect(config.SERVER_URL);

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [found, setFound] = useState(false);
  const [time, setTime] = useState(59)
  const [intervalID, setIntervalID] = useState<any>(null)
  const auth = getAuth();

  useEffect(() => {
    const timerInterval = setInterval(() => setTime(prevTime => prevTime - 1), 1000)
    setIntervalID(timerInterval)

    return () => {
      setTime(59)
      clearInterval(timerInterval)
    };
  }, [])

  useEffect(() => {
    if(time <= 0){
      clearInterval(intervalID)
      socket.emit("add_points", { time_left: time })
      setTime(59)
    }
  }, [time])

  useEffect(() => {
    socket.on("receive_message", (data: any) => {
      alert(data.message);
    });
  }, [socket]);

  function handleClick(event: any) {
    const img = new Image();
    img.src = waldo.coords[0].src!;

    img.onload = () => {
      const renderedWidth = Math.min(window.innerWidth, img.width);
      const renderedHeight = img.height * (window.innerWidth / img.width);

      // console.log(renderedWidth, renderedHeight);

      const x = (event.clientX / renderedWidth) * 100;
      const y = (event.clientY / renderedHeight) * 100;

      // console.log(x, y);

      const waldo_x = waldo.coords[pic_id].x;
      const waldo_y = waldo.coords[pic_id].y;

      // console.log(waldo_x, waldo_y);

      if (!found) {
        if (
          Math.abs(x - Number(waldo_x)) < threshold &&
          Math.abs(y - Number(waldo_y)) < threshold
        ) {
          console.log("You found Waldo!");
          socket.emit("send_message", { message: "found waldo" });
          setFound(false);
          clearInterval(intervalID)
          socket.emit("add_points", { time_left: time, uid: auth.currentUser?.uid })
          setTime(59)
        } else {
          console.log("Try again!");
        }
      }
    };
  }

  return (
    <div>
      <h3>00:{time}</h3>
      <img src={waldo.coords[pic_id].src} alt="Waldo" onClick={handleClick} />
      {/* put the image for waldo here */}
      <img
        src={new_waldo}
        alt="new_waldo"
        style={{
          position: "absolute",
          top: waldo.coords[pic_id].y,
          left: waldo.coords[pic_id].x,
          width: "10%", // Adjust the size as needed
          height: "10%", // Adjust the size as needed
          pointerEvents: "none", // Allow clicks to pass through the overlay
        }}
      />
    </div>
  );
}
