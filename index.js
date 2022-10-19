const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwtUser = require("./model/user");
const dotenv = require("dotenv");
const port = process.env.PORT || 7000;
const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
dotenv.config();
mongoose.connect(process.env.DB_CONNECT, () => {
  console.log("connected to db");
});
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my api",
  });
});

app.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  console.log(req.body);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = new jwtUser({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  await user.save();
  let { password, ...data } = user.toJSON();
  res.send({ message: `${data.name} created successfully` });
});
app.post("/login", async (req, res) => {
  try {
    let user = await jwtUser.findOne({ email: req.body.email });
    let { password, ...data } = user.toJSON();
    let validPass = await bcrypt.compare(req.body.password, user.password);
    if (!user) {
      console.log("User not found");
      return res.json({ message: "User not found" });
    } else if (!validPass) {
      return res.status(404).send({ message: "Invalid Credential" });
    } else {
      const token = jwt.sign({ id: user._id }, "secret");
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 100, //i day
      });
      res.send({ message: "success" });
    }
  } catch (error) {
    res.status(404).send({ message: "error" });
  }
});
app.get("/user", async (req, res) => {
  try {
    const cookie = req.cookies;

    const claim = jwt.verify(cookie.jwt, "secret");
    if (!claim) {
      return res.status(401).send({ message: "Unauthenticated" });
    }
    const user = await jwtUser.findOne({ id: claim._id });
    let { password, ...data } = user.toJSON();
    console.log(data);
    return res.send({ message: data });
  } catch (error) {
    return res.status(401).send({ message: "Unauthenticated" });
  }
});
app.post("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });

  return res.send({ message: "success" });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/dist/"));
  app.get("*", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
  });
}
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
