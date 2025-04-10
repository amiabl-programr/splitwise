import admin from "../config/firebase.js"

const db = admin.firestore();
const groupDatabaseReference = db.collection('groups');

async function createGroups(req, res) {
  const sessionCookie = req.cookies.session || '';
  console.log(sessionCookie);
  const { title, description = '' } = req.body;
  const ownerId = req.user.uid;
  try {
    const groupData = {
      title,
      description,
      ownerId,
      members: [ownerId],
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    const groupDoc = await groupDatabaseReference.add(groupData);
    const createdGroup = await groupDoc.get();
    res.status(201).json({ groupId: groupDoc.id, group: createdGroup.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllGroups(req, res) {
    try {
        const snapshot = await groupDatabaseReference.get();
    
        if (snapshot.empty) {
          return res.status(404).json({ message: "No groups found" });
        }
    
        const groups = [];
        snapshot.forEach(doc => {
          groups.push({ id: doc.id, ...doc.data() });
        });
    
        res.status(200).json({ groups });
      } catch (error) {
        console.error("Error getting groups:", error);
        res.status(500).json({ message: "Failed to fetch groups" });
      }

}

export  { createGroups, getAllGroups};