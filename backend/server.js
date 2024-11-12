const express = require("express");

const port = 8000;

const path = require('path');

const app = express();

const db = require("./config/mongoose");

const dotenv = require('dotenv');

const cors = require('cors');

dotenv.config();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true // enable set cookies
    }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", require("./routes/authRoute"));
app.use("/api/users/v2", require("./routes/societyRoutes.js"))
app.use("/api/users/v3", require("./routes/ImportantNumRoute.js"));
app.use("/api/users/v4", require("./routes/CompalintRoute"));
app.use("/api/users/v5", require("./routes/profileRoute"));
app.use("/api/users/v6", require("./routes/residenttRoute"));
app.use("/api/users/v7", require("./routes/requestRoute"));
app.use("/api/users/v8", require("./routes/security_protocol_Route"));
app.use("/api/users/v9", require("./routes/visitorLogRoute.js"));
app.use("/api/users/v10", require("./routes/SecuritygaurdRoute.js"))


app.listen(port, (e)=>{
    if(e) return false;
    console.log("server is running in "+port);
})  