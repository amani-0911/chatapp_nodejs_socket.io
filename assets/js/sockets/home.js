socket.emit('getOnlineFriends',myid)

socket.on('onlineFriends',friends=>{
    let  div = document.getElementById("onligneFriends");
    
    if(friends.length === 0){
    div.innerHTML =`<p class="alert alert-danger"> No online friends</p>`

}else{
    let html=`<div class="row">
    `
    for(let f of friends){
       html += `
       <div class="col col-12 col-md-6 col-lg-4">
      <div class="card">
       <div class="card-image">
            <img src="/${f.image}">
       </div> 
       <div class="card-title">
              <h3><a href="/profile/${f.id}"> ${f.name}<a></h3>
               
       </div>
       <div class="card-body">
           <a href="/chat/${f.chatId}" class="btn btn-success">Chat</a>
       </div>
       </div>
       </div>
       `
    }
    html+=`</div>`
    div.innerHTML = html
}
})