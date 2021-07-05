const chatId=document.getElementById('chatId').value;
const msg=document.getElementById('message');
const sendBtn=document.getElementById('sendBtn');
const msgContainer=document.getElementById('messages-container');
const callBtn=document.getElementById("callBtn");
msgContainer.scrollTop=msgContainer.scrollHeight;


socket.emit('joinChat',chatId);

sendBtn.onclick=()=>{
    let content=msg.value;
    socket.emit('sendMessage',{
        chat:chatId,
        content:content,
        sender:myid
    },()=>{
        msg.value='';
        msgContainer.scrollTop=msgContainer.scrollHeight;
    });

}

socket.on('newMessage',msg=>{
let html=`
 <span class="messages-item">`
 if(msg.sender===myid ){
   html+=`<p class="contentMsgR">${msg.content}</p>`
}else{
 html+=`<p class="contentMsg">${msg.content}</p>`
} 
 html+=`</span>`
 msgContainer.innerHTML+=html;
})



let peer=new Peer()
let peerId=null
peer.on('open',id=>{
    console.log("my id",id)
    peerId=id
});

//user1 envoie requise pour recuperir peerId de user2
callBtn.onclick=()=>{
socket.emit('requestPeerID',chatId);
}

//user2 envoie leur peerid au server 
socket.on('getPeerId',()=>{
    socket.emit('sendPeerId',{
        chatId:chatId,
        peerId:peerId
    })
})

//call
socket.on('recievePeerId',id=>{
          navigator.mediaDevices.getUserMedia({audio:true,video:true})
          .then(stream=>{
            let call=peer.call(id,stream)
            call.on('stream',showVideoCall(stream))
          }).catch(err=>console.log(err))
});
//answer
peer.on('call',call=>{
    navigator.mediaDevices.getUserMedia({audio:true,video:true})
    .then(stream=>{
       call.answer(stream)
       call.on('stream',showVideoCall(stream))
    }).catch(err=>console.log(err))
})

function showVideoCall(stream){
    let video=document.createElement('video')
    video.srcObject=stream
    document.body.append(video)
    video.play()
}