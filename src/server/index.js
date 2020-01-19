var path = require("path");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ailyenAPI = require("aylien_textapi");

const PORT = process.env.APP_PORT || 8000;

const textProcessingAPI = new ailyenAPI({
  application_id: process.env.APP_ID, //c64792a5
  application_key: process.env.API_KEY //ca74fd266980aa04e453fdbf68349846
});

const app = express();

app.use(express.static("dist"));
app.use(cors());
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
app.listen(PORT, function() {
  console.log(`Sentiment Analysis server listening on port ${PORT}`);
});

app.post("/analyzeSentiment", function(req, resp) {
  textProcessingAPI.sentiment(
    {
      url: req.body.url
    },
    function(err, res) {
      console.log(res);
      if (!err) resp.send(res);
      else
        resp.send({
          error: "Error analyzing sentiment.Please try again."
        });
    }
  );
});
