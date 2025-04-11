import admin from "../config/firebase.js";

export default async function verifySessionToken(req, res, next) {
  const sessionCookie = req.cookies.session || '';
  console.log("session ",sessionCookie);
    try {
      const verifiedSession = await admin.auth().verifySessionCookie(sessionCookie, true);
      req.user = verifiedSession;
      next();
    } catch (error) {
      res.status(401).send('Unauthorized');
}
}
