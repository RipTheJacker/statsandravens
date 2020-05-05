const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { v4: uuid4 } = require('uuid');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.joinGroup = functions.https.onCall(async (data, context) => {
  const { code } = data
  const { uid } = context.auth
  const db = admin.firestore()

  const groupSnapshot = await db.collection('game-groups').where('joinCode', '==', code).get()

  if (groupSnapshot.size < 1) {
    throw new functions.https.HttpsError('permission-denied', 'No group found with this code!')
  }

  const group = groupSnapshot.docs[0]

  return db.doc(`game-groups/${group.id}`).set({ members: admin.firestore.FieldValue.arrayUnion( uid ) }, { merge: true })
});

// const setPlayerStats = functions.firestore
//   .document('game-groups/{groupId}/games/{gameId}')
//   .onWrite(async ( change, context ) => {
//     const deleted = change.after.exists
//     const games = await db.collection(`game-groups/${context.params.groupId}/games`).get()
//     const players = await db.collection(`game-groups/${context.params.groupId}/players`).get()
//
//   })

exports.setGroupMembers = functions.firestore
  .document('game-groups/{groupId}')
  .onCreate((snapshot, context) => {
    const members = [ snapshot.get('ownerId') ]
    const joinCode = uuid4()

    return snapshot.ref.set({ members, joinCode }, { merge: true })
  })
