const User = require ('../models/user');
const Post = require ('../models/post');

module.exports.users = function (req , res){
    // return res.end ('<h1> This is users  page!</h1>');
    return res.render('user_home',
    {
        title:"user_home"
    } 
    );
}

module.exports.profile = async function (req , res){

    try{
        let user = await User.findById(req.params.id );
        return res.render ("user_profile",
        {
            title :"user profile",
            profile_user :user
            
        });

    }
    catch(err){
        console.log("Error :" , err);
        return ;
    }
      
}

module.exports.update =  async function(req, res){

    try{
        if(req.user.id == req.params.id){
            await User.findByIdAndUpdate(req.params.id, req.body);
            req.flash ('success' , 'Succesfully updated details ! ');
            return res.redirect('back');
           
        }else{
            return res.status(401).send('Unauthorized');
        }

    }
    catch(err){
        console.log("Error :", err);
        return ;
    }

}
   


module.exports.signin = function (req , res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render ('user_signin',
        {
            title:"user signin"
        }
    );
}

module.exports.signup = function (req , res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render ('user_signup',
        {
            title:"user signup"
        }
    );
}

//get the sign up data 
module.exports.create = async function(req , res){

    try{
        if (req.body.password != req.body.confirm_password){
            return res.redirect ('back');      
        }
    
       let user = await User.findOne({email:req.body.email});
    
        if ( !user){
            await  User.create(req.body );
            return res.redirect('/users/signin');
        }

        else{     
            return res.redirect ('back');         
        }

    }
    catch(err){
        console.log("Error :", err);
        return ;
    }

   
}

// sigin data
module.exports.createSession = function ( req , res ){

    req.flash('success' , 'logged in succesfully ');
    return res.redirect('/');

}

//signout

module.exports.destroySession = function ( req , res ){
    req.logout();

    req.flash('success' , 'logged out succesfully ');
    return res.redirect('/');
   

    
}