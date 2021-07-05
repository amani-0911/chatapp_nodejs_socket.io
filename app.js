const express = require('express')
const path = require('path')
const app = express()
const session =require('express-session')
const SessionStrore=require('connect-mongodb-session')(session)
const flash=require('connect-flash')
const socketIO=require('socket.io');

const authRouter=require("./routers/auth.router");
const friendRouter=require("./routers/friend.route");
const chatRouter=require("./routers/chat.route");
const profileRouter=require("./routers/profile.router");

const server=require("http").createServer(app);
const io=socketIO(server);
 io.onligneUsers={};
 require('./sockets/friend.socket')(io);

require('./sockets/init.socket')(io);
 
require('./sockets/chat.socket')(io);


app.use(express.static(path.join(__dirname,'assets')))
app.use(express.static(path.join(__dirname,'images')))

app.set('view engine','ejs')
app.set('views','views') 


//preparer session 
const Store=new SessionStrore({
    uri: "mongodb://ahmed123:ahmed123@cluster0-shard-00-00.ibkly.mongodb.net:27017,cluster0-shard-00-01.ibkly.mongodb.net:27017,cluster0-shard-00-02.ibkly.mongodb.net:27017/chatApp?ssl=true&replicaSet=atlas-pxod9w-shard-0&authSource=admin&retryWrites=true&w=majority",
    collection: 'sessions'
})
app.use(session({
    secret: 'hi this is a secret of session  if you want do samething ha..hhh ',
    saveUninitialized:false,
    store:Store
}))
app.use(flash())
////



app.use('/',authRouter)
app.use('/',require("./routers/home.router"))
app.use('/profile',profileRouter)
app.use('/friend',friendRouter)
app.use('/chat',chatRouter)

const port=process.env.PORT || 3000;
server.listen(port,(err)=>{
    console.log(err)
    console.log('server demareé.......')
})