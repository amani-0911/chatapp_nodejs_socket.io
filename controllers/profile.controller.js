const userModel=require("../models/user.model");

exports.redirect=(req,res,next)=>{
    res.redirect("/profile/"+req.session.userId);
};

exports.getProfile=(req,res,next)=>{
  
    let id=req.params.id ;
if(!id) return res.redirect("/profile/"+req.session.userId);
    userModel
    .getUserData(id)
    .then(data=>{
        res.render("profile",{
            isUser:true,
            myId: req.session.userId,
            friendRequests: req.friendRequests,
            myName: req.session.name,
            myImage: req.session.image,
            username:data.username,
            userImage:data.image,
            friendId:data._id,
            isOwner: id===req.session.userId,
            isFriends: data.friends.find(friend=>friend.id===req.session.userId),
            isRequestSent: data.friendsRequests.find(friend=>friend.id===req.session.userId),
            isRequestRecieved: data.sentRequests.find(friend=>friend.id===req.session.userId)

        });
    })
    .catch(err=>{
        res.redirect("/error")
    })
}