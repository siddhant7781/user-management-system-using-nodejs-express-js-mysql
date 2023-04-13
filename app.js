const express = require('express');
const exphbs = require('express-handlebars')
//const pug = require('pug');
const bodyParser = require('body-parser');
const mysql = require('mysql');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//parsing middleware
app.use(express.urlencoded({ extended: false }))

//parse application/json
app.use(express.json());

// static files
app.use(express.static('public'));

// template engine 
//app.engine('hbs', exphbs({ extname: '.hbs' }));
app.engine('hbs', exphbs.engine({ extname: '.hbs' }))

app.set('view engine', 'hbs');

//connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

})

pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("database connected as ID ", connection.threadId)
})




app.get('', (req, res) => {
    res.render('home')
});

app.listen(port, () => {
    console.log(`server running on ${port}`);
})

