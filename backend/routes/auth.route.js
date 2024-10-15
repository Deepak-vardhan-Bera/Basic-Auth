import express from "express"
import { logout, signin, signup, verifyEmail,forgotPassword,resetPassword,checkAuth } from "../controllers/auth.controller.js";
import { verifyJwt } from "../middleware/verifyJwt.middleware.js";

const router=express.Router();

router.get('/checkauth',verifyJwt,checkAuth)

router.post("/login",signin)
router.post("/signup",signup)
router.post("/logout",logout)
router.post('/verifyemail',verifyEmail)
router.post('/forgot-password',forgotPassword)
router.post('/reset-password/:token',resetPassword)

export default router