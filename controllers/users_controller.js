const User = require ('../models/user');

module.exports.users = function (req , res){
    // return res.end ('<h1> This is users  page!</h1>');
    return res.render('user_home',
    {
        title:"user_home"
    } 
    );
}

module.exports.profile = function (req , res){
    // return res.end ('<h1> This is  profile page! inside users page </h1>');

    return res.render ("user_profile",
    {
        title :"user profile"
    }
    );
}



module.exports.signin = function (req , res){

    return res.render ('user_signin',
        {
            title:"user signin"
        }
    );
}

module.exports.signup = function (req , res){

    return res.render ('user_signup',
        {
            title:"user signup"
        }
    );
}

//get the sign up data 
module.exports.create = function(req , res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect ('back');
        
    }

    User.findOne({email:req.body.email}, function (err , user){
        if (err){console.log ("Error in signing up "); return }

        if ( !user){
            User.create(req.body , function (err , user){
                if (err){console.log ("Error in creating new user "); return }

                return res.redirect('/users/signin');
            });

        }

        else{
            
            return res.redirect ('back');
            
        }
   
    });
}

module.exports.createSession = function ( req , res ){

    return res.redirect('/');

}