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
        // const prompt = " A scene with a " + text + "background in a 'Where's Waldo' style with many small cartoonish characters in the scene but WITHOUT having a Waldo character anywhere in the scene";
        const prompt = "wheres waldo style childrens book," + text;
        setSubmittedText(text);
        const res = await fetch(`http://localhost:3001/generate_waldo?prompt=${prompt}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json()).catch(error => console.error('Error:', error));
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
