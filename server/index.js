const https = require("https");
const express = require("express");
const fs = require("fs");
var cors = require('cors');


// Instantiate an Express application
const app = express();
const port = 4000;
app.use(cors());


app.listen(port, () => {
	console.log('Server running')
})

app.get('/', (req,res)=>{
    res.send("Should be running on HTTPS")
})
