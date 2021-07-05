
const newMessage=require('../models/message.model').newMessage;
module.exports=io=>{
    io.on('connection',socket=>{
        socket.on('joinChat',id=>{
            socket.join(id)
        })
        socket.on('sendMessage',(msg,cb)=>{
            newMessage(msg).then(()=>{
         io.to(msg.chat).emit('newMessage',msg)
         cb();
        })
        })
        socket.on('requestPeerID',chatId=>{
             socket.broadcast.to(chatId).emit('getPeerId')
        })
        socket.on('sendPeerId',data=>{
            socket.broadcast.to(data.chatId).emit('recievePeerId',data.peerId)
        })

    })
}