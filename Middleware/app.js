const express = require('express')
const app = express()
const port = 3000;

const ExpressError = require("./Express.error")

// middleware using req,res
app.use((req, res) => {
  console.log('middleware 2');
  res.send("our middleware")
})

// using next
app.use((req, res, next) => {
  console.log(date.now(), 'time')
  next()
})

// utility middleware
app.use((req, res, next) => {
  console.log(req);
  req.time = new.Date(Date.now()).to String();
  console.log(req.method, req.hostname, req.path, req.time);
  next();
})

app.use("/api", (req, res, next) => {
  let { token } = req.query;
  if (token === 'giveaccess') {
    next()
  }
  else {
    // res.status(401).send('unauthorized')
    throw new ExpressError(401, "access denied");
  }
})

app.get("/api", (req, res) => {
  res.send("api route")
})

// admin route
app.get("/admin", (req, res) => {
  throw new ExpressError(403, "access is forbiden");
})
// mongoose error
app.use((err, req, res, next) => {
if(err==="validattionerror"){
  res.status(400).send(err.message)
}
  console.log(err.name);
  next(err);
})

// error handling middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "internal server error" } = err;
  res.status(status).send({ msg: message });
  // console.error(err);
  // res.status(500).send('internal server error')
  // next(err);
})
// index route
app.get("/", (req, res) => {
  res.send("Hello World!")
})
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
})