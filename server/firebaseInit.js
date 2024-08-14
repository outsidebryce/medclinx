const admin = require('firebase-admin');

function initializeFirebase() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: process.env.FIREBASE_PROJECT_ID,
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
  }
  return admin.firestore();
}

module.exports = initializeFirebase;