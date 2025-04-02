import admin from "../config/firebase";

export const verifyIdToken = async (idToken: string) => {
  try {
    return await admin.auth().verifyIdToken(idToken);
  } catch (error) {
    throw new Error("Invalid token");
  }
};
