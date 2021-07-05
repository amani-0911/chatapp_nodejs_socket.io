const getFrinedRequests=require("../../models/user.model").getFrinedRequests;
exports.isAuth=(req,res,next)=>{
    if(req.session.userId) next()
    else res.redirect('/login')
}

exports.notAuth=(req,res,next)=>{
    if(!req.session.userId) next()
    else res.redirect('/')
}

exports.request=(req,res,next)=>{
 
   if(req.session.userId){
        getFrinedRequests(req.session.userId).then(requests=>{
        req.friendRequests=requests
        next();
        }).catch(err => res.redirect('/error'))
   }else{
       next()
   }
};