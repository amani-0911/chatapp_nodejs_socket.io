const mongoose=require('mongoose');

const DB_URL="mongodb://ahmed123:ahmed123@cluster0-shard-00-00.ibkly.mongodb.net:27017,cluster0-shard-00-01.ibkly.mongodb.net:27017,cluster0-shard-00-02.ibkly.mongodb.net:27017/chatApp?ssl=true&replicaSet=atlas-pxod9w-shard-0&authSource=admin&retryWrites=true&w=majority";
const messageSchema=mongoose.Schema({
    chat:{
        type:mongoose.Schema.Types.ObjectId,ref:'chat'
    },
    content:String,
    sender:String,
    timestamp:Number
});
const Message=mongoose.model("message",messageSchema);
exports.Message=Message;

exports.getMessages= async chatId=>{
  try {
      await mongoose.connect(DB_URL);
    let messages=  await Message.find({chat: chatId},null,{sort:{timestamp:1}}).populate({
        path:'chat' ,//field,
        model:'chat',
        populate:{
            path:'users',
            model:'User',
            select: 'username image'
        }
    });
    mongoose.disconnect();
    return messages;
  } catch (error) {
    mongoose.disconnect();
    throw new Error(error);
  }
}
exports.newMessage= async msg=>{
  try {
    msg.temestamp=Date.now();
    await mongoose.connect(DB_URL);
    let newMsg= new Message(msg)
    await newMsg.save()
  mongoose.disconnect();
} catch (error) {
  mongoose.disconnect();
  throw new Error(error);
}
}