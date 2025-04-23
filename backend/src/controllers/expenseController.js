import admin from "../config/firebase.js"

const db = admin.firestore();
const groupDatabaseReference = db.collection('groups');
const expenseRef = db.collection('expenses');


async function createExpense(req, res) {
  const { groupId } = req.params;
  const { description, amount } = req.body;

  try {
    const groupSnap = await groupDatabaseReference.doc(groupId).get();
    if (!groupSnap.exists) return res.status(404).json({ success: false, error: 'Group not found' });

    const group = groupSnap.data();
    const members = group.members;
    const share = amount / members.length;

    const enrichedSplits = {};
    for (const uid of members) {
      const userRecord = await admin.auth().getUser(uid);
      enrichedSplits[uid] = {
        amount: share,
        email: userRecord.email,
        username: userRecord.displayName || userRecord.email.split('@')[0]
      };
    }

    const expense = {
      groupId,
      description,
      amount,
      createdBy: req.user.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      splits: enrichedSplits,
      payerId: group.ownerId // default payer is the group owner
    };

    const expenseRef = db.collection('expenses');
    const expenseDoc = await expenseRef.add(expense);
    const createdExpense = await expenseDoc.get();

    res.status(201).json({ success: true, expenseId: expenseDoc.id, expense: createdExpense.data() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
}

async function getAllUserExpense(req, res) {
  const { groupId } = req.params;

  try {
    const expensesSnapshot = await db
      .collection('expenses')
      .where('groupId', '==', groupId)
      .get();

    const expenses = [];

    for (const doc of expensesSnapshot.docs) {
      const expense = doc.data();
      const enrichedSplits = {};

      // Enrich splits with user info
      for (const uid in expense.splits) {
        if (uid && typeof uid === 'string' && uid.length <= 128) {
          try {
            const userRecord = await admin.auth().getUser(uid);
            enrichedSplits[uid] = {
              ...expense.splits[uid],
              email: userRecord.email,
              username: userRecord.displayName || userRecord.email.split('@')[0]
            };
          } catch (err) {
            console.error(`Failed to get user data for uid: ${uid}`, err);
          }
        } else {
          console.warn(`Invalid uid detected: ${uid}`);
        }
      }

      // Enrich payerId with user info
      if (expense.payerId && typeof expense.payerId === 'string' && expense.payerId.length <= 128) {
        try {
          const payerRecord = await admin.auth().getUser(expense.payerId);
          const enrichedExpense = {
            id: doc.id,
            ...expense,
            splits: enrichedSplits, // Add enriched splits
            payer: {
              id: expense.payerId,
              email: payerRecord.email,
              username: payerRecord.displayName || payerRecord.email.split('@')[0]
            },
          };

          expenses.push(enrichedExpense);
        } catch (err) {
          console.error(`Failed to get user data for payerId: ${expense.payerId}`, err);
        }
      } else {
        console.warn(`Invalid payerId detected: ${expense.payerId}`);
      }
    }

    res.json({ expenses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get expenses' });
  }
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

async function editExpense(req, res) {
  const { expenseId } = req.params;
  const { description, amount } = req.body;

  try {
    const expenseRef = db.collection('expenses').doc(expenseId);
    const expenseDoc = await expenseRef.get();

    if (!expenseDoc.exists) {
      return res.status(404).json({ success: false, error: 'Expense not found' });
    }

    const expense = expenseDoc.data();

    // Build updateFields only with fields that have actually changed
    const updateFields = {};
    if (description !== undefined && description !== expense.description) {
      updateFields.description = description;
    }
    if (amount !== undefined && amount !== expense.amount) {
      updateFields.amount = amount;
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ success: false, error: 'No valid changes provided' });
    }

    await expenseRef.update(updateFields);

    const updatedExpenseDoc = await expenseRef.get();
    const updatedExpense = updatedExpenseDoc.data();

    res.json({ success: true, message: 'Expense updated', expense: { id: expenseId, ...updatedExpense } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Failed to update expense' });
  }
}




export {createExpense, deleteExpense, getAllUserExpense, editExpense};