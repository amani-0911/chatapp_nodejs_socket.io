const authModel=require("../models/auth.model");
exports.getSignup=(req,res,next)=>{
    res.render("signup",{
        isUser:false
    });
};

exports.postSignup=(req,res,next)=>{
   authModel
   .createNewUser(req.body.username,req.body.email,req.body.password)
   .then(()=>res.redirect("/login"))
   .catch(err=>{
       console.log(err);
       res.redirect("/signup");
   })
};

exports.getLogin=(req,res,next)=>{
    res.render("login",{
        authError: req.flash('authError')[0],
        isUser:false
    });
};

exports.postLogin=(req,res,next)=>{
authModel
.login(req.body.email,req.body.password)
.then(result=>{
    req.session.userId=String(result.id);
    req.session.name=result.username;
    req.session.image=result.image;
    res.redirect("/");
}).catch(err =>{
    req.flash('authError',err);
    res.redirect("/login");
});
}
exports.logout=(req,res,next)=>{
   req.session.destroy(()=>{
       res.redirect("/");
   }) 
}


