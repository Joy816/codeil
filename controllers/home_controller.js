module.exports.home = function (req , res){

    // return res.end("<h1> This is a home page!</h1>");

    return res.render ('home',
    {
        title: "Home"

    }
    );
}


