import express from "express";

const app = express();
app.use(express.static("public"));

app.get('/generate_waldo', async (req, res) => {
  const KEY = req.query.key

  // const dalleRes = await fetch('https://api.openai.com/v1/images/generations', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${KEY}`
  //   },
  //   body: JSON.stringify({
  //     model: 'dall-e-3',
  //     prompt: `${req.query.prompt}`,
  //     n: 1,
  //     size: '1024x1024'
  //   })
  // }).then(response => response.json()).catch(error => console.error('Error:', error));

  const URL = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-HLG04Ga2mW41OX29TdYvfZdT/user-jtQ9wzzYkpwjrVLLwKqvFpJC/img-bqFMRugI11xurUlX8oURRegj.png?st=2023-11-18T23%3A07%3A41Z&se=2023-11-19T01%3A07%3A41Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-18T20%3A31%3A20Z&ske=2023-11-19T20%3A31%3A20Z&sks=b&skv=2021-08-06&sig=WPXOM7bqn3aYclQiC9pPngUzLL8sahTRIgsZBSxiNH4%3D"

  console.log(URL)
  res.status(200).send({ img_url: URL })
})

app.listen(3001, () => {
  if (process.env.NODE_ENV === "development") {
    broadcastDevReady(build);
  }
  console.log("App listening on http://localhost:3001");
});

