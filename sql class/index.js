const express = require('express');
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const app = express();
const port = 3000;
const path = require("path");
const { count } = require('console');

// middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'deltaapp',
  password: 'mysql@123'
});
let q = "insert into user (id,username,email,password)values(?,?,?,?)";
let data = [];
let createRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.image.avatar(),
    faker.internet.password(),
    faker.date.birthdate(),
    faker.date.past(),
  ];
};
for (let i = 1; i < 100; i++) {
  data.push(createRandomUser());
};

// routing 
app.get('/', (req, res) => {
  let q = `select count(*) from  user`;
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the MySQL database');


    connection.query(q, (error, result) => {
      if (error) {
        console.error('Error executing query:', error);
        return;
      }
      let count = result[0]["count(*)"];
      console.log(count);
    });
  });
  res.send('home.ejs', { count });
});
// show route
app.get("/user", (req, res) => {
  let q = `select * from user`;
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the MySQL database');


    connection.query(q, (error, result) => {
      if (error) {
        console.error('Error executing query:', error);
        return;
      }
      let count = result[0]["count(*)"];
      console.log(count);
    });
  });
  res.render("showuser.ejs", { q });
});
// edit route
app.get("/user/id/edit", (req, res) => {
  let { id } = req.params;
  let q = `select * from user where id='${id}'`;
  res.render("edit.ejs");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
