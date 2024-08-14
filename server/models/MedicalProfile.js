const initializeFirebase = require('../firebaseInit');
const db = initializeFirebase();

class MedicalProfile {
  static async create(data) {
    const docRef = await db.collection('medicalProfiles').add(data);
    return { id: docRef.id, ...data };
  }

  static async get(patientId) {
    const snapshot = await db.collection('medicalProfiles').where('patientId', '==', patientId).get();
    if (snapshot.empty) {
      return null;
    }
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }

  static async update(patientId, data) {
    const snapshot = await db.collection('medicalProfiles').where('patientId', '==', patientId).get();
    if (snapshot.empty) {
      return null;
    }
    const doc = snapshot.docs[0];
    await doc.ref.update(data);
    const updatedDoc = await doc.ref.get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
  }
}

module.exports = MedicalProfile;