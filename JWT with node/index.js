// const http = require("http");
// const app = require("./app");
// const server = http.createServer(app);
require('dotenv').config()
require("./config/database").connect();
const express = require("express");
const port = process.env.PORT;
const auth = require("./routes/auth");
const post = require("./routes/post");

const app = express();



app.use(express.json());

app.get('/',(req, res)=>{
    res.send("Working")
});

app.use("/auth",auth);
app.use("/post",post);

app.listen(port,()=>{
    console.log("Server running yeeeee");
});


