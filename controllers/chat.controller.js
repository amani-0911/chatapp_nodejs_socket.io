const chatModel=require('../models/chat.model');
const messageModel=require('../models/message.model');

exports.getChat=(req,res,next)=>{
    let chatId=req.params.id;

    messageModel.getMessages(chatId).then(messages=>{
       if(messages.length==0){
chatModel.getChat(chatId).then(chat=>{
    res.render("chat",{
        isUser:req.session.userId,
        myId:req.session.userId,
        friendRequests: req.friendRequests,
        messages:messages,
        chatId:chatId,
        friendData:chat.users.find(user =>user._id!=req.session.userId)
    })
})
       }else{
      
        res.render("chat",{
            isUser:req.session.userId,
            myId:req.session.userId,
            friendRequests: req.friendRequests,
            messages:messages,
            chatId:chatId,
            friendData: messages[0].chat.users.find(user =>user._id!=req.session.userId)
        })
    }
    })

}