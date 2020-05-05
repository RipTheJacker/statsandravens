const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

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

    return snapshot.ref.set({ members }, { merge: true })
  })
