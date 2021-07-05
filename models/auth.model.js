const mongoose=require("mongoose");


//const DB_URL="mongodb://localhost:27017/chatapp";
const DB_URL="mongodb://ahmed123:ahmed123@cluster0-shard-00-00.ibkly.mongodb.net:27017,cluster0-shard-00-01.ibkly.mongodb.net:27017,cluster0-shard-00-02.ibkly.mongodb.net:27017/chatApp?ssl=true&replicaSet=atlas-pxod9w-shard-0&authSource=admin&retryWrites=true&w=majority";
const bcrypt=require("bcrypt");
const User =require("./user.model").User;



exports.createNewUser=(username,email,password)=>{
   
    return new Promise((resolve,reject)=>{
        mongoose
        .connect(DB_URL)
        .then(()=>{
            return User.findOne({email: email});
        })
        .then(user=>{
            if(user) {
                mongoose.disconnect();
                reject("email is used");
            }
            else{
                return bcrypt.hash(password,10)
            }
        })
        .then(hashedPassword=>{
            let user=new User({
                username:username,
                email: email,
                password:hashedPassword
            })
            return user.save()
        }).then(() =>{
           mongoose.disconnect()
            resolve()
        }).catch(err =>
            {
            mongoose.disconnect();
            reject(err);})
    });
}

exports.login=(email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>User.findOne({email: email}))
        .then(user =>{
            if(!user){
                mongoose.disconnect();
                reject("there is no user matches this email");
            }else{
                bcrypt.compare(password,user.password).then(same=>{
                    if(!same){
                        mongoose.disconnect();
                        reject("password is incorresct");
                    }else{
                        mongoose.disconnect();
                        resolve(user);
                    }
                })
            }
        }).catch(err =>{
            mongoose.disconnect();
            reject(err);
        })
    })
}