import type { MetaFunction } from "@remix-run/node";
import { Button } from "app/@/components/ui/button";
import { Input } from "app/@/components/ui/input";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import * as io from "socket.io-client";
import waldo from "../../public/waldo.json";
import new_waldo from "../../public/assets/new_waldo.png";
import config from "../../public/config.json";
import { getAuth } from "firebase/auth";
import { useParams } from "@remix-run/react";

const threshold = 5;

const socket = io.connect(config.SERVER_URL);

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [found, setFound] = useState(false);
  const [text, setText] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [imgWidth, setImageWidth] = useState(0);
  const [imgHeight, setImageHeight] = useState(0);
  const [waldo_x, setWaldoX] = useState(0);
  const [waldo_y, setWaldoY] = useState(0);
  const [waldoImageWidth, setWaldoImageWidth] = useState(0);
  const [waldoImageHeight, setWaldoImageHeight] = useState(0);
  const [time, setTime] = useState(59);
  const [intervalID, setIntervalID] = useState<any>(null);
  const [room, setRoom] = useState("");

  const auth = getAuth();

  const param: any = useParams();

  useEffect(() => {
    setRoom(param.room);

    socket.emit("display_image", param.room.toString());

    // async function getPrompts() {
    //   const prompts = fetch("getPrompts", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       room: param.room,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    // }
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(
      () => setTime((prevTime) => prevTime - 1),
      1000
    );
    setIntervalID(timerInterval);

    return () => {
      setTime(59);
      clearInterval(timerInterval);
    };
  }, []);

  useEffect(() => {
    if (time <= 0) {
      clearInterval(intervalID);
      socket.emit("add_points", { time_left: time });
      setTime(59);
    }
  }, [time]);

  useEffect(() => {
    socket.on("receive_message", (data: any) => {
      alert(data.message);
    });

    socket.on("reset_game", () => {
      alert("Game Over");
    });

    socket.on(
      "send_images",
      (
        prompts: [{ img_url: string; img_width: number; img_height: number }]
      ) => {
        console.log(prompts[0]);
        setImageWidth(Math.min(window.innerWidth, prompts[0].img_width));
        setImageHeight(
          prompts[0].img_height * (window.innerWidth / prompts[0].img_height)
        );
        setImgUrl(prompts[0].img_url);
        const rand_x = 0.3;
        const rand_y = 0.8;
        setWaldoX(rand_x);
        setWaldoY(rand_y);
      }
    );
  }, [socket]);

  useEffect(() => {
    const waldoImg = new Image();
    waldoImg.src = new_waldo;

    waldoImg.onload = () => {
      setWaldoImageWidth(waldoImg.width * 0.03); // 3% scaling
      setWaldoImageHeight(waldoImg.height * 0.03); // 3% scaling
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  async function generateImage() {
    const prompt =
      " A scene with a " +
      text +
      "background in a 'Where's Waldo' style with many small cartoonish characters in the scene but WITHOUT having a Waldo character anywhere in the scene";
    // const prompt = "wheres waldo style childrens book," + text;
    setSubmittedText(text);
    const res = await fetch(
      `http://localhost:3001/generate_waldo?prompt=${prompt}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));

    return res;
  }

  const handleSubmit = async () => {
    let res = await generateImage();
    setImgUrl(res.img_url);
    // console.log(`img width ${Math.min(window.innerWidth, res.img_width)}, img height ${res.img_height * (window.innerWidth / res.img_width)}`)
    setImageWidth(Math.min(window.innerWidth, res.img_width));
    setImageHeight(res.img_height * (window.innerWidth / res.img_width));
    // const rand_x = 0.1 + Math.random() * 0.8;
    // const rand_y = 0.1 + Math.random() * 0.7;
    const rand_x = 0.5;
    const rand_y = 0.5;
    setWaldoX(rand_x);
    setWaldoY(rand_y);
    console.log(`waldo x ${rand_x}, waldo y ${rand_y}`);
  };

  function handleClick(event: any) {
    const img = new Image();
    img.src = imgUrl;

    img.onload = () => {
      const x = (event.clientX / imgWidth) * 100;
      const y = ((event.clientY + window.scrollY) / imgHeight) * 100;
      console.log(`x ${x}, y ${y}`);
      console.log(`waldo x ${waldo_x * 100}, waldo y ${waldo_y * 100}`);

      if (!found) {
        if (
          Math.abs(x - waldo_x * 100) < threshold &&
          Math.abs(y - waldo_y * 100) < threshold
        ) {
          console.log("You found Waldo!");
          socket.emit("send_message", { message: "found waldo" });
          setFound(false);
          clearInterval(intervalID);
          socket.emit("add_points", {
            time_left: time,
            uid: auth.currentUser?.uid,
          });
          setTime(59);
        } else {
          console.log("Try again!");
        }
      }
    };
  }

  return (
    <div>
      <img
        src={imgUrl ? imgUrl : ""}
        onClick={imgUrl ? handleClick : () => {}}
      />
      {imgUrl && (
        <img
          src={imgUrl ? new_waldo : ""}
          style={{
            position: "absolute",
            top: waldo_y * imgHeight,
            left: waldo_x * imgWidth,
            width: `${waldoImageWidth}px`, // Adjust the size as needed
            height: `${waldoImageHeight}px`, // Adjust the size as needed
            pointerEvents: "none", // Allow clicks to pass through the overlay
          }}
        />
      )}
      <h3>00:{time}</h3>
      {/* <Input type="text" value={text} onChange={handleChange} /> */}
      {/* <Button onClick={handleSubmit}>Submit</Button> */}
      {/* <p>Typed Text: {submittedText}</p> */}
    </div>
  );
}
