const cookieParser = require('cookie-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const userModel = require("./models/user");


const app = express();
app.use(cookieParser());
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// middleware
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

// route
app.get("/", function (req, res) {
  res.render("index.ejs");
})

app.post("/create", (req, res) => {
  const { username, password, email, age } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let createdUser = awaituserModel.create({
        username,
        email,
        password: hash,
        age
      })
      let token = jwt.sign({ email }, "nand");
      res.cookie("token", token)
      res.send(createdUser);
    })
  })

  app.get("/login", (req, res) => {
    res.render("login.ejs")
  })
  app.post("/login", async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.send("something went wrong");
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign({ email: user.email }, "nand");
        res.cookie("token", token)
        res.send("you can login");
      }
      else res.send("something went wrong");
    })
  })

  app.get("/logout", (req, res) => {
    res.cookie("token", "");
    res.redirect("/")
  })

})
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});