const express =require('express')
const router=express.Router()
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
router.get("/",(req,res)=>{
    connection.query('DELETE FROM users',(err,result)=>{
        if (err) throw err;
    console.log(`${result.affectedRows} users deleted`);
    res.render('fetchuser',{result})
    })
    
})
module.exports=router;