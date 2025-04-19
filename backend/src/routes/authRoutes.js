import express from 'express';
import {login, signup, logout, forgotPassword, getUser}  from '../controllers/authController.js';
import { createGroups, getAllUserGroups, getAllGroupsTest, deleteGroup, inviteUser} from '../controllers/groupController.js';
import { createExpense, deleteExpense } from '../controllers/expenseController.js';
// import verifyAuthToken from '../middleware/verifyAuthToken.js';
import verifySessionToken from "../middleware/verifySessionToken.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/forgot-password", forgotPassword);
router.post("/logout", logout);

// users
router.get("/me", verifySessionToken, getUser);
router.post("/groups/:groupId/invite", verifySessionToken, inviteUser);

// groups
router.post("/create-group", verifySessionToken, createGroups);
router.delete("/groups/:groupId", verifySessionToken, deleteGroup);
// gets all groups just for testing
// router.get("/groups-testing", verifySessionToken, getAllGroupsTest);
router.get("/groups", verifySessionToken, getAllUserGroups);

// expenses
router.post("/:groupId/create-expense", verifySessionToken, createExpense);
router.delete("/expenses/:expenseId", verifySessionToken, deleteExpense);




export default router;
