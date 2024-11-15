const cookieParser = require('cookie-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 8080;
app.use(cookieParser());
app.get('/jwtroute', function (req, res) {
  const token = jwt.sign({ email: 'nand@12example.com' }, 'secretkey');
  console.log(token);
  res.cookie('token', token);
  res.send("working succesful");

})
app.get("/valid", function (req, res) {
  const token = req.cookies.token;
  let data = jwt.verify(token, "secretkey")
  console.log(data);
  res.send(data);
})
app.listen(port, () => {
  console.log(`server is running on port ${port}`)
});