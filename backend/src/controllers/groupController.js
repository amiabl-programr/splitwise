// group routes

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
      return res.status(404).json({ success: false, message: "No groups found" });
    }

    const groupData = groupDoc.data();
    if (groupData.ownerId !== userId) {
      return res.status(403).json({ success: false, message: "Only the owner can delete this group" });
    }

    await groupDatabaseReference.doc(groupId).delete();
    res.status(200).json({ success: true, message: "Group deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete group" });
  }
}

async function inviteUser(req, res) {
  const { groupId } = req.params;
  const { email } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ success: false, message: 'Invalid input format' });
  }

  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    const userId = userRecord.uid;

    const groupRef = groupDatabaseReference.doc(groupId);

    await db.runTransaction(async (transaction) => {
      const groupSnap = await transaction.get(groupRef);

      if (!groupSnap.exists) {
        throw new Error('Group not found');
      }

      const groupData = groupSnap.data();
      const members = groupData.members || [];

      if (members.includes(userId)) {
        throw new Error('User is already a member of the group');
      }

      transaction.update(groupRef, {
        members: admin.firestore.FieldValue.arrayUnion(userId),
      });
    });

    return res.status(200).json({ success: true, message: 'User invited successfully' });

  } catch (err) {
    console.error('Invite error:', err);

    if (err.message === 'Group not found') {
      return res.status(404).json({ success: false, message: 'Group not found' });
    }

    if (err.message === 'User is already a member of the group') {
      return res.status(400).json({ success: false, message: 'User is already a member of the group' });
    }

    if (err.code === 'auth/user-not-found') {
      return res.status(404).json({ success: false, message: 'User with this email does not exist' });
    }

    return res.status(500).json({ success: false, message: 'Something went wrong' });
  }
}



async function getAllUserGroupMembers(req, res) {
  const { groupId } = req.params;

  try {
    const groupSnap = await groupDatabaseReference.doc(groupId).get();
    if (!groupSnap.exists) return res.status(404).json({ success: false, error: 'Group not found' });

    const group = groupSnap.data();
    const memberUIDs = group.members;

    const memberInfoPromises = memberUIDs.map(uid =>
      admin.firestore().collection("users").doc(uid).get()
    );
    const memberDocs = await Promise.all(memberInfoPromises);

    const formattedMembers = memberDocs.map(doc => {
      const data = doc.data();
      if (!doc.exists) {
        console.warn(`User document not found for UID: ${doc.id}`);
      }
      
      return {
        uid: doc.id,
        email: data.email,
        username: data.username
      };
    });

    res.json({ success: true, members: formattedMembers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

async function editGroupTitle(req, res) {
  const { groupId } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ success: false, error: 'Title is required' });
  }

  try {
    const groupRef = db.collection('groups').doc(groupId);

    await groupRef.update({ title });

    const updatedGroupDoc = await groupRef.get();
    const updatedGroup = updatedGroupDoc.data();

    res.json({ success: true, message: 'Group title updated', group: { id: groupId, ...updatedGroup } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Failed to update group title' });
  }
}


export  { createGroups, getAllGroupsTest, getAllUserGroups, deleteGroup,inviteUser, getAllUserGroupMembers, editGroupTitle};
