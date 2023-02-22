const fetch = require('node-fetch')
const express = require('express')
const router = express.Router()
const app=express()
app.set("view engine",'hbs')
app.set("views",'hbsFiles_1')
app.use(express.static("public"))
app.use(express.json())
const hbs=require('hbs')
hbs.registerPartials('./hbsFiles_1/partials')
const { createPool } = require('mysql');
const fetchuserRoute = require('./routes/fetchuser')
const deleteuserRoute = require('./routes/deleteuser')
const userdetailsRoute = require('./routes/userdetails')
app.use('/fetchuser', fetchuserRoute)
app.use('/deleteuser', deleteuserRoute)
app.use('/userdetails', userdetailsRoute)
const connection = createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'cointabdb',
  connectionLimit: 10
});


const createTableQuery = 'CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), phone VARCHAR(255), picture VARCHAR(255))';
connection.query(createTableQuery, (err, result) => {
  if (err) throw err;
  console.log('Users table created');
});


app.get('/', (req, res) => {
  res.render('home')
})
// app.get("/fecthuser", (req, res) => {
//   const fetchUrl = 'https://randomuser.me/api/?results=50';
//   fetch(fetchUrl)
//       .then(response => response.json())
//       .then(data => {
//           const users = data.results;
//           const insertQuery = 'INSERT INTO users (name, email, phone, picture) VALUES ?';
//           const values = users.map(user => [`${user.name.first} ${user.name.last}`, user.email, user.phone, user.picture.large]);
//           connection.query(insertQuery, [values], (err, result) => {
//               if (err) throw err;
//               console.log(`${result.affectedRows} users inserted`);
//               // res.send(`${result.affectedRows} users inserted`);
//           });


//       })
//       .catch(err => {
//           console.log(err);
//           res.render('Error fetching users');
//       });
//   // res.render('fetchuser')
//   connection.query('select * from users', (err, result) => {
//       if (err) throw err;
//       res.render('fetchuser', result)
//       console.log("data retrived");
//   })
// })
app.listen(5000, () => {
  console.log("listening to server on 5000");
})