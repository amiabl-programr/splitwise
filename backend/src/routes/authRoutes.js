import express from 'express';
import {login, signup, logout}  from '../controllers/authController.js';
import verifyToken from '../verification/verifyToken.js';

const router = express.Router();

router.post("/login",verifyToken, login);
router.post("/signup", signup);
router.post("/logout", logout);



export default router;
