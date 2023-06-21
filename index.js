const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes.js");
const dotenv = require("dotenv");

dotenv.config();
const uri =
`mongodb+srv://satanista:satanista123@cluster0.zsrttvb.mongodb.net/invoices_database`;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('CHUJ!')
})
app.use(`/`, routes);

app.listen(process.env.PORT || 3000)