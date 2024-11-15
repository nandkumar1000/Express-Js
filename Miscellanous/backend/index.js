const express = require("express");
const app = express();
const port = 3000;
// middleware
app.use(express.urlencoded({extended:true}));
// for json data  middleware 
app.use(express.json());
// routing:
app.get("/register", (req, res) => {
  let { user, password } = req.query;
  res.send(`standard Get response${user}`);
});
app.post("/register", (req, res) => {
  res.send("standard post response")
})
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
