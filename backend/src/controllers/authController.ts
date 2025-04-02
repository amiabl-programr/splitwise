import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { verifyIdToken } from "../services/authService";

export const signInWithGoogle = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;
    const decodedToken = await verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    // Generate session token
    const sessionToken = jwt.sign({ uid }, process.env.JWT_SECRET as string, { expiresIn: "7d" });

    // Set session token in HTTP-only cookie
    res.cookie("session", sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ success: true, uid, email });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export const signOut = async (req: Request, res: Response) => {
  res.clearCookie("session");
  res.json({ success: true, message: "Signed out successfully" });
};
