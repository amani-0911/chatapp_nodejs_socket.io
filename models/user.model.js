const mongoose=require('mongoose')

const DB_URL="mongodb://ahmed123:ahmed123@cluster0-shard-00-00.ibkly.mongodb.net:27017,cluster0-shard-00-01.ibkly.mongodb.net:27017,cluster0-shard-00-02.ibkly.mongodb.net:27017/chatApp?ssl=true&replicaSet=atlas-pxod9w-shard-0&authSource=admin&retryWrites=true&w=majority";
const chat=require('./chat.model')
const userShema=mongoose.Schema({
    username: String,
    email: String,
    password: String,
    image:{
        type:String,
        default:"noAvatar.jpg"
    },
    isOnline:{type: Boolean,default: false},
    friends:{
        type:[{name: String,image: String, id:String,chatId:String}],
        default:[]
    },
    friendsRequests:{
        type:[{name: String, id: String}],
        default:[]
    },
    sentRequests:{
        type:[{name: String, id: String}],
        default:[]
    }
});

const User=mongoose.model("User",userShema);
exports.User=User;

exports.getUserData=id=>{
    return new Promise((resolve,reject)=>{
        mongoose
        .connect(DB_URL)
        .then(()=>{
            return User.findById(id);
        })
        .then(data=>{
            mongoose.disconnect();
            resolve(data);
        })
        .catch(err=>{
            mongoose.disconnect();
            reject(err);
        });
    })
}
exports.sendFriendRequest=async (data)=>{
  //add my data to friend  friendRequests
    //add friend data to user my sentRequests
   
   try{
    await mongoose.connect(DB_URL);
    await User.updateOne({_id:data.friendId},
        {$push: {friendsRequests:{name:data.myName, id:data.myId}}});
    await User.updateOne({_id:data.myId},{$push:{sentRequests:{name:data.friendName, id:data.friendId}}});
    //await User.updateOne({_id:ObjectId(data.friendId)},{$push: {friendsRequests:{name:data.myName, id:data.myId}}});
    //await User.updateOne({_id:ObjectId(data.myId)},{$push:{sentRequests:{name:data.friendName, id:data.friendId}}});
    mongoose.disconnect();
   }catch(err){
    console.log(err);
   mongoose.disconnect()
   throw new Error(err)
   }
};

exports.cancelFriendRequest=async (data)=>{
     //remove my data to friend  friendRequests
    //remove friend data to user my sentRequests
   try{
    await mongoose.connect(DB_URL);
     await User.updateOne({_id:data.friendId},{$pull: {friendsRequests:{ id:data.myId}}});
    await User.updateOne({_id:data.myId},{$pull:{sentRequests:{id:data.friendId}}});
    mongoose.disconnect();
   }catch(err){
    console.log(err);
   mongoose.disconnect()
   throw new Error(err)
   }
};

exports.acceptFriendRequest=async (data)=>{
    //remove my data to friend  friendRequests
   //remove friend data to user my sentRequests
  try{
   await mongoose.connect(DB_URL);
   const user = await User.findById(mongoose.Types.ObjectId(data.friendId));
   const currentUser = await User.findById(mongoose.Types.ObjectId(data.myId));
     await user.updateOne({$pull: {sentRequests :{ id:data.myId}}});
     await currentUser.updateOne({$pull:{friendsRequests:{id:data.friendId}}});
   
     let newChat=new chat.Chat({
        users:[data.myId,data.friendId]
    });
    let chatDoc= await newChat.save();
     await user.updateOne({$push: {friends:{name:data.myName, id:data.myId,image:currentUser.image,chatId:chatDoc._id}}});
    await currentUser.updateOne({$push:{friends:{name:data.friendName, id:data.friendId,image:user.image,chatId:chatDoc._id}}});
    
    
   mongoose.disconnect();
  }catch(err){
   console.log(err);
  mongoose.disconnect()
  throw new Error(err)
  }
};

exports.rejectFriendRequest=async (data)=>{
    //remove my data to friend  friendRequests
   //remove friend data to user my sentRequests
  try{
   await mongoose.connect(DB_URL);
   await User.updateOne({_id:data.myId},{$pull:{friendsRequests:{id:data.friendId}}});
   mongoose.disconnect();
  }catch(err){
   console.log(err);
  mongoose.disconnect()
  throw new Error(err)
  }
};

exports.deleteFriend=async (data)=>{
    //remove my data to friend  friendRequests
   //remove friend data to user my sentRequests
  try{
   await mongoose.connect(DB_URL);
    await User.updateOne({_id:data.friendId},{$pull: {friends:{ id:data.myId}}});
   await User.updateOne({_id:data.myId},{$pull:{friends:{id:data.friendId}}});
   mongoose.disconnect();
  }catch(err){
   console.log(err);
  mongoose.disconnect()
  throw new Error(err)
  }
};

exports.getFrinedRequests=async id=>{

    try{
        await mongoose.connect(DB_URL);
     let data=await User.findById(id,{friendsRequests:true});
    return data.friendsRequests
       }catch(err){
       mongoose.disconnect()
       throw new Error(err)
       } 
};
exports.getFriends= async id=>{
    try{
        await mongoose.connect(DB_URL);
     let data=await User.findById(id,{friends:true});
      mongoose.disconnect();
     return data.friends;
       }catch(err){
       mongoose.disconnect()
       throw new Error(err)
       } 
}