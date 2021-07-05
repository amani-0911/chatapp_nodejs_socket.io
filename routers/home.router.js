const router=require("express").Router();

const authGuard=require("./guards/auth.guard");
const homeController=require("../controllers/home.controller");

router.get("/",authGuard.isAuth,authGuard.request,homeController.getHome);



module.exports=router;