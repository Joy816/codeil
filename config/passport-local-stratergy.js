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

module.exports = passport ;