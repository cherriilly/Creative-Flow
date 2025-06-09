// Importing express and Axios
import express from "express";
import axios from "axios";
import {creativeTopics} from "./topic.mjs"
// Express app amd set up the port number
const app = express();
const port = 3000;

// 3. Use the public folder for static files.
app.use(express.static("public"));

const API_URL = "http://colormind.io/api/";



app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/generate", async (req, res) => {

  // Color palette
  try {
    const response = await axios.get(API_URL,{
        data: {model : "default"}
    });
    const x = response.data;
    let r1 = (x.result[0])[0];
    let g1 = (x.result[0])[1];
    let b1 = (x.result[0])[2];
    let rgb1 = `rgb(${r1},${g1},${b1})`;
    let rgb2 = `rgb(${(x.result[1])[0]},${(x.result[1])[1]},${(x.result[1])[2]})`;
    let rgb3 = `rgb(${(x.result[2])[0]},${(x.result[2])[1]},${(x.result[2])[2]})`;
    let rgb4 = `rgb(${(x.result[3])[0]},${(x.result[3])[1]},${(x.result[3])[2]})`;
    let rgb5 = `rgb(${(x.result[4])[0]},${(x.result[4])[1]},${(x.result[4])[2]})`;

    //random image
    const generatedImage = "https://picsum.photos/600/400";

    //random topic
    const randomTopic = creativeTopics[Math.floor(Math.random() * creativeTopics.length)];


    //passing data
    res.render("index.ejs", {
      generatedRGB1: rgb1,
      generatedRGB2: rgb2,
      generatedRGB3: rgb3,
      generatedRGB4: rgb4,
      generatedRGB5: rgb5,
      image: generatedImage,
      topic: randomTopic,

    });
    
    console.log(x);
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "Failed to generate content",
    });
}


});

// Listen to the predefined port and start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})