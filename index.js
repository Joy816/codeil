const express = require('express');
const app = express();
const port = 8000;

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