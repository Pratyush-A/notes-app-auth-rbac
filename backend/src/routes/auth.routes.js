const express=require ('express')

const authController=require('../controllers/auth.controller')

const router=express.Router()



router.post('/register',authController.registerUser)

router.post('/logout', (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});



module.exports=router