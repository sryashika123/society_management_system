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

app.use("/api/users", require("./routes/UserRoute.js"));
app.use("/api/users/v2", require("./routes/societyRoutes.js"))
app.use("/api/users/v3", require("./routes/ImportantNumRoute.js"));
app.use("/api/users/v4", require("./routes/CompalintRoute.js"));
app.use("/api/users/v5", require("./routes/profileRoute.js"));
app.use("/api/users/v6", require("./routes/residentRoute.js"));
app.use("/api/users/v7", require("./routes/requestRoute.js"));
app.use("/api/users/v8", require("./routes/security_protocol_Route.js"));
app.use("/api/users/v9", require("./routes/visitorLogRoute.js"));
app.use("/api/users/v10", require("./routes/SecuritygaurdRoute.js"));
app.use("/api/users/v11", require("./routes/NoteRoute.js"));
app.use("/api/users/v12", require("./routes/ExpensesRoute.js"));
app.use("/api/users/v13", require("./routes/OtherIncomeRoute.js"));
app.use("/api/users/v14", require("./routes/FacilityRoute.js"));
app.use("/api/users/v15", require("./routes/MaintenanceRoute.js"));
app.use("/api/users/v16", require("./routes/PollRoute.js"));
app.use("/api/users/v17", require("./routes/AlertRoute.js"));
app.use("/api/users/v18", require("./routes/VisitortrackingRoute.js"));
app.use("/api/users/v19", require("./routes/PaymentRoute.js"));
app.use("/api/users/v20", require("./routes/AnnouncementRoute.js"));


app.listen(port, (e)=>{
    if(e) return false;
    console.log("server is running in "+port);
})  