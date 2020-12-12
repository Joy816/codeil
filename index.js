const express = require('express');
const cookieParser = require ('cookie-parser');
const expressLayouts = require ('express-ejs-layouts');
const app = express();
const port = 8000;


//importing mongoDB 
const db = require ("./config/mongoose");

//using Express layouts
app.use(expressLayouts);
// for POST request
app.use(express.urlencoded());
//using cookie-parser
app.use(cookieParser());

// creating static middleware called asset( for accessing css and js files )
app.use(express.static('assets'));

//extract styles and scripts for sub pages in layouts
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

// use express router
app.use('/', require('./routes'));


//setting up ejs as view engine 
app.set('view engine', 'ejs');
app.set('views','./views');


//check for server to listen
app.listen(port , function (err){
    if (err){
        console.log (`Error in running te server : ${err}`);
    }

    console.log (`Server is up and running on port no : ${port}`);

});