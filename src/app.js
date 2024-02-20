// app.js
require("dotenv").config();
const express = require("express");
const app = express();
const { connectMySQLDB } = require("./v1/config/mysql-db");


// Set up body-parser middleware
app.use(express.json({ limit: "1mb", extended: true }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));

global.env = process.env;


// Define API routes
const pcmc = require("./v1/routes/pcmc");
app.use("/pcmc", pcmc); 

module.exports = app;
