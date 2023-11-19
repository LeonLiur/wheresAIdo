import { Button } from "~/@/components/ui/button";
import * as io from "socket.io-client";

const socket = io.connect("http://localhost:3001/");

export default function Room() {
  const sendMessage = () => {
    console.log(1);
    socket.emit("send_message", {});
  };

  return (
    <div className="p-4 flex gap-4">
      <Button>Join Room</Button>
      <Button>Start Room</Button>
    </div>
  );
}
