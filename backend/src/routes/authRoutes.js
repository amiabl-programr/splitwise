import express from 'express';
import {login, signup, logout, forgotPassword, getUser}  from '../controllers/authController.js';
import { createGroups, getAllGroups, deleteGroup} from '../controllers/groupController.js'
// import verifyAuthToken from '../middleware/verifyAuthToken.js';
import verifySessionToken from "../middleware/verifySessionToken.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/forgot-password", forgotPassword);
router.post("/logout", logout);
router.get("/me", verifySessionToken, getUser);
router.post("/create-group", verifySessionToken, createGroups);
router.delete("/groups/:groupId", verifySessionToken, deleteGroup);
router.get("/groups", verifySessionToken, getAllGroups);



export default router;
