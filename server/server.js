/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const express = require("express");
const cors = require("cors");

const MailService = require("./services/mail.service");
require("dotenv").config();
const app = express();
const port = 3000;
//env
const ENV = process.env;
//middlewares
app.use(cors());
app.use(express.json());

//get
app.get("/", (req, res) => {
  res.json({ message: "welcome to geolocation backend" });
});

app.post("/", async (req, res) => {
  try {
    let location = req.body.location;

    // send email
    await MailService.sendEmail(ENV.RECEIVER_EMAIL, location);
    res.json({ message: "email send successfully" });
  } catch (error) {
    console.error(error, "error");
  }
});
app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}`);
});
