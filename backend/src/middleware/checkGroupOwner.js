import admin from "../config/firebase.js";

const db = admin.firestore();

export default async function checkGroupOwner(req, res, next) {
  const groupId = req.params.groupId;
  const uid = req.user.uid;

  try {
    const groupDoc = await db.collection('groups').doc(groupId).get();
    if (!groupDoc.exists) return res.status(404).json({ success: false, error: 'Group not found' });

    const groupData = groupDoc.data();
    if (groupData.ownerId !== uid) {
      return res.status(403).json({ success: false, error: 'Only group owner can perform this action' });
    }

   
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
}


