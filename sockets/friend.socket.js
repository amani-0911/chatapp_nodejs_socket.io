const sendFriendRequest=require('../models/user.model').sendFriendRequest;
const getFriends=require('../models/user.model').getFriends;


module.exports=(io) =>{
   io.on('connection',socket=>{
    socket.on('sendFriendRequest',data=>{
      console.log("data recuprir",data)
        sendFriendRequest(data).then(()=>{
           socket.emit('requestSent')
           io.to(data.friendId).emit('newFriendRequest',{name: data.MyName,id:data.myId})
        }).catch(err=>{
               socket.emit('requestFailed')
        });
    });
    socket.on('getOnlineFriends',id=>{
      getFriends(id).then(friends=>{
        let onlineFrinds=friends.filter(friend=>io.onligneUsers[friend.id])
        socket.emit('onlineFriends',onlineFrinds);
      })
    })
})
}
