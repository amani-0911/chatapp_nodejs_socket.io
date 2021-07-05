const socket = io();
const btn=document.getElementById('friendRequestsdropdown');
let myid=document.getElementById("userId").value;
socket.on('connect',()=>{

socket.emit('joinNotificationRoom',myid);
socket.emit('goOnline',myid);
})
socket.on('newFriendRequest',data=>{
   const friendRequests=document.getElementById("friendRequests")
   friendRequests.innerHTML +=`
 <a class="dropdown-item" href="/profile/${data.id}">
     ${data.name}
 </a>`;
 btn.classList.remove("btn-primary")
 btn.classList.add("btn-danger")
})
btn.onclick=()=>{
   btn.classList.add("btn-primary")
   btn.classList.remove("btn-danger")
}