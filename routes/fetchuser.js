// import fetch from 'node-fetch';
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
const connection = createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'cointabdb',
    connectionLimit: 10
});
router.get("/",async (req, res) => {
    const fetchUrl = 'https://randomuser.me/api/?results=25';
    await fetch(fetchUrl)
        .then(response => response.json())
        .then(data => {
            const users = data.results;
            const insertQuery = 'INSERT INTO users (name, email, phone, picture) VALUES ?';
            const values = users.map(user => [`${user.name.first} ${user.name.last}`, user.email, user.phone, user.picture.large]);
            connection.query(insertQuery, [values],async (err, result) => {
                if (err) throw err;
                await console.log(`${result.affectedRows} users inserted`);
            });
        })
        .catch(err => {
            console.log(err);
        });
    connection.query('select * from users',async (err, result) => {
        if (err) throw err;
        await res.render('fetchuser',{result})
        await console.log("data retrived to display");
    })
})
module.exports = router;