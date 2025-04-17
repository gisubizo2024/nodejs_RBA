const express = require("express");
const dotenv = require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
//db connection
const dbconnect = require("./config/dbconnect");


dbconnect();
//create app
const app = express();

//middleware

app.use(express.json());
//Routes
app.use("/api/auth",authRoutes);
//Run Server
const PORT = process.env.PORT || 9002;
app.listen(PORT, ()=> {
    console.log(`Server is Running on port: ${PORT}`)
});