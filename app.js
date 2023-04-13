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

const routes = require('./server/routes/userRoute');
app.use('/', routes);

app.listen(port, () => {
    console.log(`server running on ${port}`);
})

