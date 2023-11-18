import React, { useState, useEffect } from 'react';

const WaldoGame = () => {
  // Assuming your AI-generated image URL is stored in a variable
  const [image, setImage] = useState('https://prodimage.images-bn.com/pimages/9781536210651_p2_v3_s600x595.jpg'); // **MUST BE CHANGED FOR NEW IMAGE
  const [score, setScore] = useState(0);
  const [waldoPosition, setWaldoPosition] = useState({ x: 0, y: 0 }); // Set the actual position

  useEffect(() => {
    // Set the initial position of Waldo for the first image
    setWaldoPosition({ x: 0, y: 0 }); // **MUST BE CHANGED FOR EACH NEW IMAGE
  }, [image]); // This will run when 'image' changes
  

  const handleImageClick = (e) => {
    // Get click position
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if the click is close to Waldo's position
    if (Math.abs(x - waldoPosition.x) < 50 && Math.abs(y - waldoPosition.y) < 50) {
      setScore(score + 1);
      // Load next image and update waldo's position
      //setImage(null); // ** MUST BE CHANGED FOR NEW IMAGE
      console.log('worked');
    }
  };

  return (
    <div>
      <h1>Find Waldo</h1>
      <p>Score: {score}</p>
      <img src={image} alt="Where's Waldo" onClick={handleImageClick} />
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <WaldoGame />
    </div>
  );
}
