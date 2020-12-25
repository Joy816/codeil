const express = require('express');
const cookieParser = require ('cookie-parser');
const expressLayouts = require ('express-ejs-layouts');
const app = express();
const port = 8000;
//mongoose acts as a object-data modelling (ODM) betw node.js and mongoDB
const db = require ("./config/mongoose");
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stratergy');
const MongoStore = require ('connect-mongo')(session);
const saasMiddleware = require ('node-sass-middleware');
const flash = require ('connect-flash');
const createMware = require ('./config/middleware');

app.use(saasMiddleware(
    {
        src:'./assets/scss',
        dest: './assets/css',
        debug : 'true',
        outputStyle: 'extended',
        prefix : '/css'


    }
));

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




//setting up ejs as view engine 
app.set('view engine', 'ejs');
app.set('views','./views');

//using express- session to encyrpt the cookie 
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },

    store: new MongoStore (
        {
            mongooseConnection : db,
            autoRemove : 'disabled'
        }
        ),
        function (err){
            console.log (err || 'connect to the database ')
        }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use (passport.setAuthenticatedUser) ;

//using flash after session cookie 
app.use (flash());
app.use(createMware.createFlash);

// use express router
app.use('/', require('./routes'));

//check for server to listen
app.listen(port , function (err){
    if (err){
        console.log (`Error in running te server : ${err}`);
    }

    console.log (`Server is up and running on port no : ${port}`);

});