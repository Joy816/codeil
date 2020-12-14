const passport = require ('passport');
const LocalStratergy = require ('passport-local').Strategy;

const User = require ('../models/user');

//Authenticating using Passport

passport.use (new LocalStratergy(
    {
        usernameField:"email"
    },

    function (email , password , done){

        User.findOne({email:email}, function (err , user){
            if (err){console.log (`error found while local authentication : ${err}`); return done(err);}

            if (!user ||  user.password!=password){
                return done(null , false)
            }

            return done(null , user);
        });
    }

));

//serializing the user so as to know which key to be kept as cookie 

passport.serializeUser( function (user , done){
    return done (null , user.id);
})


//deserializing , so that browser could authenticate the user 

passport.deserializeUser(function (id , done){
 
    User.findById(id , function( err , user){
        if (err){console.log (`error found while local authentication : ${err}`); return done(err);}

        return done (null , user);
    });

})


//check if the user is authenticated

passport.checkAuthenticated = function ( req , res , next ){
    // if the user is signed in , then pass on the request to the next function ('controller action )
    if (req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in 
    return res.redirect ('/users/signin');
}

// set authenticated user 

passport.setAuthenticatedUser = function ( req , res , next ){

    if ( req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for view 
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport ;