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
    res.status(201).json({ success: true, groupId: groupDoc.id, group: createdGroup.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllGroupsTest(req, res) {
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

async function getAllUserGroups(req, res) {
  try {
    const snapshot = await groupDatabaseReference.where('members', 'array-contains', req.user.uid).get();
    const groups = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({success: true, groups});
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
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

async function inviteUser(req, res){
  const { groupId } = req.params;
  const { email } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ success: false, message: 'Invalid input format' });
  }
  
  const isEmail = email.includes('@');
  
  try {
    // Lookup user by email or username
    const userQuery = await admin.auth().getUserByEmail(email)
    const userId = userQuery.uid;
    const groupDoc = groupDatabaseReference.doc(groupId);
    await groupDoc.update({ members: admin.firestore.FieldValue.arrayUnion(userId) });
    res.status(200).json({ success: true, message: 'User invited' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

export  { createGroups, getAllGroupsTest, getAllUserGroups, deleteGroup, inviteUser};
