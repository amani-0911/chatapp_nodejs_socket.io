

module.exports=io=>{
    io.on("connection",socket=>{
    socket.on('joinNotificationRoom',id=> socket.join(id))
socket.on('goOnline',id=>{
    io.onligneUsers[id]=true
    socket.on('disconnect',()=>{
        io.onligneUsers[id]=false
    })
})
});
}