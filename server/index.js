const https = require("https");
const express = require("express");
const fs = require("fs");
var cors = require('cors');


// Instantiate an Express application
const app = express();
const port = 4000;
app.use(cors());

https
  .createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
  }, app)

  .listen(port, () => { 
    console.log(`server is running at port ${port}`)
  });

app.get('/', (req,res)=>{
    res.send("Should be running on HTTPS")
})