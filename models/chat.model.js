const mongoose=require('mongoose');

const DB_URL="mongodb://ahmed123:ahmed123@cluster0-shard-00-00.ibkly.mongodb.net:27017,cluster0-shard-00-01.ibkly.mongodb.net:27017,cluster0-shard-00-02.ibkly.mongodb.net:27017/chatApp?ssl=true&replicaSet=atlas-pxod9w-shard-0&authSource=admin&retryWrites=true&w=majority";
const chatSchema=mongoose.Schema({
    users:[ {type:mongoose.Schema.Types.ObjectId,ref:'User'}]
});
const Chat=mongoose.model("chat",chatSchema);
exports.Chat=Chat;

exports.getChat=async chatId=>{
    try {
        await mongoose.connect(DB_URL);
      let chat=  await Chat.findById( chatId).populate('users');
      mongoose.disconnect();
      return chat;
    } catch (error) {
      mongoose.disconnect();
      throw new Error(error);
    }
}
