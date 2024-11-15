const express = require("express");
const { url } = require("inspector");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

// middleware for understanding
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"));
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "./public")));

// making array
let posts = [
  {
    id: uuidv4(),
    username: "nand kumar",
    content: " I love hacking"
  },
  {
    id: uuidv4(),
    username: "shiva",
    content: " I love coding"
  },
  {
    id: uuidv4(),
    username: "nand aggrawal",
    content: " I love progarmming"
  },
]
//get request route
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});
// post method routing 
// 1.firs we get data using form  then send to add
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});
// routing for adding  the posts
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts")
})
// implement:post/:id
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);

  let allPosts = posts.find((p) => id === p.id);
  res.render("show.ejs", { allPosts });
})
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;

  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  console.log(post);
  res.redirect('/posts/:id');
});
// edit route
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});
// delete route
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.send("delete succesful");
  res.redirect("/posts");
});
// server starting
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});