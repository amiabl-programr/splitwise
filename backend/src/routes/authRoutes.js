import express from 'express';
import {login, signup, logout, forgotPassword, getUser}  from '../controllers/authController.js';
import { createGroups, getAllUserGroups, getAllGroupsTest, deleteGroup, inviteUser, getAllUserGroupMembers, editGroupTitle} from '../controllers/groupController.js';
import { createExpense, deleteExpense, getAllUserExpense , editExpense} from '../controllers/expenseController.js';
// import verifyAuthToken from '../middleware/verifyAuthToken.js';
import verifySessionToken from "../middleware/verifySessionToken.js";
import checkGroupOwner from '../middleware/checkGroupOwner.js';

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
router.get("/groups/:groupId/members", verifySessionToken, getAllUserGroupMembers);
router.patch("/groups/:groupId", verifySessionToken, checkGroupOwner, editGroupTitle);

// expenses
router.get("/:groupId/expenses", verifySessionToken, getAllUserExpense);
router.post("/:groupId/create-expense", verifySessionToken, createExpense);
router.delete("/expenses/:expenseId", verifySessionToken, deleteExpense);
router.patch("/groups/:groupId/expenses/:expenseId", verifySessionToken, checkGroupOwner, editExpense);




export default router;
