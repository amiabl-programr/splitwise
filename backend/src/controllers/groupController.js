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

async function deleteGroup(req, res) {
  const groupId = req.params.groupId;
  const userId = req.user.uid;

  try {
    const groupDoc = await groupDatabaseReference.doc(groupId).get();
    if (!groupDoc.exists) {
      return res.status(404).json({ message: "No groups found" });
    }

    const groupData = groupDoc.data();
    if (groupData.ownerId !== userId) {
      return res.status(403).json({ message: "Only the owner can delete this group" });
    }

    await groupDatabaseReference.doc(groupId).delete();
    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete group" });
  }
}

export  { createGroups, getAllGroups, deleteGroup};
