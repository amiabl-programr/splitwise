import admin from "../config/firebase.js";
import { sendEmail } from "../config/mailservice.js";

const db = admin.firestore();

async function login(req, res) {
    const idToken = req.body.idToken;
    const user = req.user;
    console.log("user in login route:", req.user);
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    try {
        // Create a session cookie
        const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

        const options = {
            maxAge: expiresIn,
            httpOnly: true,
            secure: false, // Set to true in production
            sameSite: "Strict"
        };

        res.cookie("session", sessionCookie, options);
        res.status(200).json({ message: "Login successful", user });
        console.log("login", user);
    } catch(error){
        console.error("Error creating session cookie:", error);
        res.status(500).json({ error: "Failed to create session cookie" });
    }

}

async function signup(req, res){
    const { email, uid, username } = req.body;
    
  if (!email || !uid || !username) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }
    console.log("Saving user:", { email, uid, username });
 
     if (username.length < 3 || username.length > 20) {
        return res.status(400).json({ success: false, message: "Username must be between 3 and 20 characters" });
      }
  
      // Check if username is already taken
      const usersRef = admin.firestore().collection("users");
      const usernameQuery = await usersRef.where("username", "==", username).limit(1).get();
  
      if (!usernameQuery.empty) {
        return res.status(409).json({ success: false, message: "Username already taken" });
      }
  
      await usersRef.doc(uid).set({
        uid,
        email,
        username,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
    
    console.log(`New User Signed Up: ${email} (UID: ${uid})`);

    res.json({ success: true, message: "User verified & stored successfully!" });
}

async function forgotPassword(req, res){
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: 'Email required' });

  // check if email exists in database
  const userRecord = await admin.auth().getUserByEmail(email);
  if (!userRecord.email) return res.status(404).json({ error: 'User not found' });
  console.log(userRecord.email);

  try {
    const link = await admin.auth().generatePasswordResetLink(email);

    const html = `<p>Click the link below to reset your password:</p>
                  <a href="${link}">Reset Password</a>`;

    await sendEmail(email, 'Reset your password', html);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}


async function logout(req, res){
    res.clearCookie("session");
    res.json({ success: true, message: "Logged out" });
}




export {login, signup, logout, forgotPassword};
