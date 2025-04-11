import admin from "../config/firebase.js";

export default async function verifyAuthToken(req,res, next){
    const idToken = req.body.idToken;
    if (!idToken) {
        return res.status(400).json({ error: "Missing ID token in request body" });
    }
    console.log("idtoken", idToken);
    
        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
    
            // Fetch full user details from Firebase
            const userRecord = await admin.auth().getUser(decodedToken.uid);
    
            const user = {
                uid: userRecord.uid,
                email: userRecord.email,
                // emailVerified: userRecord.emailVerified,
                // displayName: userRecord.displayName,
                // photoURL: userRecord.photoURL,
                // phoneNumber: userRecord.phoneNumber,
                // lastSignInTime: userRecord.metadata.lastSignInTime,
                creationTime: userRecord.metadata.creationTime,
            };
    
            req.user = user;
            console.log("verify", user);
          
        } catch (error) {
            res.status(401).json({ error: "Unauthorized: Invalid token" });
            console.log(error);
        }

    next();  
}