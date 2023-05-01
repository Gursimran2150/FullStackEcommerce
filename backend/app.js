const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const errorMiddleWare = require("./middleware/error");
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

//Middleware for error
app.use(errorMiddleWare);

module.exports = app;
