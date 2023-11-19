import express from "express";
import 'dotenv/config'


const app = express();
app.use(express.static("public"));

app.get('/generate_waldo', async (req, res) => {
  const dalleRes = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_KEY}`
    },
    body: JSON.stringify({
      model: 'dall-e-2',
      prompt: `${req.query.prompt}`,
      n: 1,
      size: '256x256'
    })
  }).then(response => response.json()).catch(error => console.error('Error:', error));

  const URL = dalleRes.data[0].url

  res.status(200).send({ img_url: URL })
})

app.listen(3001, () => {
  if (process.env.NODE_ENV === "development") {
    broadcastDevReady(build);
  }
  console.log("App listening on http://localhost:3001");
});

