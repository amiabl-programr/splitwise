import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Path to the service account file
const serviceAccountPath = path.resolve(process.env.SERVICE_ACCOUNT_PATH);

// Load and parse the service account JSON file
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// Initialize Firebase Admin SDK
if (!admin.apps.length) {   
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export default admin;
