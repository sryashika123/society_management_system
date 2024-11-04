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

app.use("/api/users", require("./routes/userRoute"));
app.use("/api/users", require("./routes/societyroutes"))
app.use("/api/users", require("./routes/ImportantNumroute"));

app.listen(port, (e)=>{
    if(e) return false;
    console.log("server is running in "+port);

})  