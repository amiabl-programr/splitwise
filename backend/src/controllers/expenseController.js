import admin from "../config/firebase.js"

const db = admin.firestore();
const groupDatabaseReference = db.collection('groups');
const expenseRef = db.collection('expenses');


async function createExpense(req, res){
  const { groupId } = req.params;
  const { description, amount } = req.body;
  
  try {
    const groupSnap = await groupDatabaseReference.doc(groupId).get();
    if (!groupSnap.exists) return res.status(404).json({ success: false, error: 'Group not found' });

    const group = groupSnap.data();
    const members = group.members;
    const share = amount / members.length;
    const expense = {
      groupId: groupId,
      description,
      amount,
      createdBy: req.user.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      splits: members.reduce((acc, uid) => ({ ...acc, [uid]: share }), {})
    };

    const expenseDoc = await expenseRef.add(expense);
    const createdExpense = await expenseDoc.get();
    res.status(201).json({ success: true, expenseId: expenseDoc.id, expense: createdExpense.data() });
  } catch (err) {
    res.status(500).json({success: false,  message: err.message });
  }
}

async function getAllUserExpense(req, res){
    res.send("hi");
}

async function deleteExpense(req, res) {
  const { expenseId } = req.params;

  try {
    const docRef = expenseRef.doc(expenseId);
    const expenseDoc = await docRef.get(); 

    if (!expenseDoc.exists) {
      return res.status(404).json({ message: "No expense found" });
    }

    await docRef.delete(); 
    res.status(200).json({ success: true, message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}


export {createExpense, deleteExpense, getAllUserExpense};