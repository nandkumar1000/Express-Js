const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const port = 3000;
app.use(cookieParser())

app.get("/", function (req, res) {
  res.cookie('name', 'nand');
  res.send('done');
});
app.get("/read", function (req, res) {
  console.log(req.cookies)
  res.send('read page');
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
})