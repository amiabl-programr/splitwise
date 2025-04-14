import express from 'express';
import {login, signup, logout, forgotPassword}  from '../controllers/authController.js';
import { createGroups, getAllGroups, deleteGroup} from '../controllers/groupController.js'
import verifyAuthToken from '../middleware/verifyAuthToken.js';
import verifySessionToken from "../middleware/verifySessionToken.js";

const router = express.Router();

router.post("/login",verifyAuthToken, login);
router.post("/signup", signup);
router.post("/forgot-password", forgotPassword);
router.post("/logout", logout);
router.post("/create-group", verifySessionToken, createGroups);
router.delete("/groups/:groupId", verifySessionToken, deleteGroup);
router.get("/groups", verifySessionToken, getAllGroups);



export default router;
