module.exports.users = function (req , res){
    return res.end ('<h1> This is users  page!</h1>');
}

module.exports.profile = function (req , res){
    return res.end ('<h1> This is  profile page! inside users page </h1>');
}

module.exports.about = function (req , res){
    return res.end ('<h1> This is  About page! inside users page </h1>');
}