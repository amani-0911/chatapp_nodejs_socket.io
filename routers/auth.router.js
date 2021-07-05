const router = require("express").Router();
const bodyParser=require("body-parser");
const authController=require("../controllers/auth.controller");
const authGuard=require('./guards/auth.guard');
router.get("/signup",authGuard.notAuth,authController.getSignup);
router.post("/signup",
authGuard.notAuth,
bodyParser.urlencoded({extended:true}),
authController.postSignup)

router.get("/login",authGuard.notAuth,authController.getLogin)
router.post("/login",
authGuard.notAuth,
bodyParser.urlencoded({extended:true}),
authController.postLogin)


router.all("/logout",authGuard.isAuth,authController.logout);
module.exports=router;