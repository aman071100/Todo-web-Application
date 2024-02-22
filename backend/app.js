const express = require('express')
const dotenv = require("dotenv");
const path = require("path")

const app = express();
dotenv.config()
app.set("view engine", "ejs");
app.use(express.json());
app.set('views', path.join(__dirname, 'views', 'index'));
app.use("/test/user/", require("./routes/user"));
app.use("/test/contact/", require("./routes/contact"));



module.exports = app;