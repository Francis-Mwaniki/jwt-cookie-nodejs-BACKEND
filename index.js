const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const User = require("./model/user");
const port = 5000;
const app = express();

app.use(cors({ credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
mongoose.connect("mongodb://localhost:27017/jwtAndNuxt", () => {
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
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  await user.save();
  res.send(`${user.name} created successfully`);
});
app.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  let validPass = await bcrypt.compare(req.body.password, user.password);
  if (!user) {
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
});
app.get("/user", async (req, res) => {
  try {
    const cookie = req.cookies;

    const claim = jwt.verify(cookie.jwt, "secret");
    if (!claim) {
      return res.status(401).send({ message: "Unauthenticated" });
    }
    const user = await User.findOne({ id: claim._id });
    const { password, ...data } = await user.toJSON();
    console.log(data);
  } catch (error) {
    return res.status(401).send({ message: "Unauthenticated" });
  }
});
app.post("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });

  return res.send({ message: "success" });
});
app.listen(port, () => {
  console.log("Server listening on port " + port);
});