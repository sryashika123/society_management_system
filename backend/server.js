const express = require("express");

const port = 8000;

const app = express();

const db = require("./config/mongoose");

const dotenv = require('dotenv');

const cors = require('cors');

dotenv.config();

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true // enable set cookies
    }));

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/users", require("./routes/authRoute"));
app.use("/api/users/v2", require("./routes/societyroutes"))
app.use("/api/users/v3", require("./routes/ImportantNumroute"));
// app.use("/api/users/v4", require("./routes/CompalintRoute"));

app.listen(port, (e)=>{
    if(e) return false;
    console.log("server is running in "+port);
})  