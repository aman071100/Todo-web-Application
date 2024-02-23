const express = require('express')
const dotenv = require("dotenv");
const path = require("path")
const cors = require("cors");
const { errorHandlerMiddleWare } = require('./middleware/errorHandler');
const app = express();


app.use(cors());
dotenv.config()
app.set("view engine", "ejs");
app.use(express.json());
app.set('views', path.join(__dirname, 'views', 'index'));
app.use("/test/user/", require("./routes/user"));
app.use("/test/user/", require("./routes/contact"));
app.use(errorHandlerMiddleWare);

module.exports = app;