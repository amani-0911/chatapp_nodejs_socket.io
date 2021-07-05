const userModel=require("../models/user.model")

exports.getHome=(req,res,next)=>{
    res.render("index",{
        isUser:req.session.userId,
        myId: req.session.userId,
        friendRequests: req.friendRequests
    });
}