const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const port = 8080;
// route 
app.get('/bcrypt', function (req, res) {
  // gensalt for random string
  bcrypt.genSalt(10, function (err, salt) {
    console.log(salt)
    // encryption of password
    bcrypt.hash('nand kumar sahu', salt, function (err, hash) {
      console.log(hash);
    });
  });

})
// decrypthion
app.get("/decrpt", function (req, res) {
  bcrypt.hash('nand kumar sahu', "$2b$10$W.f5841ZYlA/1xbiPilkbe$2b$10$W.f5841ZYlA/1xbiPilkbelT949k1vUPXggVV3B.OfLuRIkT/2bF2", function (err, hash) {
    // console.log(result);
    res.send('verify');
  });
})
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
})