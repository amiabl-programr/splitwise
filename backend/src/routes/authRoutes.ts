import express from "express";
import { signInWithGoogle, signOut } from "../controllers/authController";

const router = express.Router();

router.post("/google-signin", signInWithGoogle);
router.post("/signout", signOut);

export default router;
