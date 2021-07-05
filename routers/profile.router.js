const router=require("express").Router();

const authGuard=require("./guards/auth.guard");
const profileController=require("../controllers/profile.controller");

router.get("/",authGuard.isAuth,authGuard.request,profileController.getProfile);

router.get("/:id",authGuard.isAuth,authGuard.request,profileController.getProfile);

module.exports=router;