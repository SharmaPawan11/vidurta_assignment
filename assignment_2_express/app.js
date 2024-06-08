const express = require("express");
require("dotenv").config();

const app = express();
const router = require('./routes')

app.use(express.json());
app.use('/', router)

module.exports = app;

 