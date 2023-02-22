const fetch = require('node-fetch')
const express = require('express')
const router = express.Router()
const app = express()
app.set("view engine", 'hbs')
app.set("views", 'hbsFiles_1')
app.use(express.static("public"))
app.use(express.json())
const hbs = require('hbs')
hbs.registerPartials('./hbsFiles_1/partials')
const { createPool } = require('mysql');
const connection = createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'cointabdb',
    connectionLimit: 10
});
router.get("/", async (req, res) => {

    connection.query('select * from users order by id limit ?', [10], async (err, result) => {
        if (err) throw err;
        await res.render('fetchuser', {result})
        // console.log(result);
        await console.log("data retrived");
    })
})
module.exports = router;