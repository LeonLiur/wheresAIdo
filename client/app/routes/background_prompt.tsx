import React, { useState } from "react";
import { Button } from "app/@/components/ui/button";
import config from "../../public/config.json";

const TextBoxComponent = () => {
  const [text, setText] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async () => {
    const prompt =
      " A densely packed cartoonic 'where's waldo?' scene with a " +
      text +
      "background without Waldo";
    setSubmittedText(text);
    const res = await fetch(
      `${config.SERVER_URL}/generate_waldo?prompt=${prompt}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
    console.log(res.img_url);
    setImgUrl(res.img_url);
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <Button onClick={handleSubmit}>Submit</Button>
      <p>Typed Text: {submittedText}</p>
      <img src={imgUrl ? imgUrl : ""} />
    </div>
  );
};

export default TextBoxComponent;
