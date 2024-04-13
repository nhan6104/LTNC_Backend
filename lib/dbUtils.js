const {
  initializeApp
} = require("firebase/app");
const {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  query,
  where,
  deleteDoc,
} = require("firebase/firestore/lite");

const firebaseConfig = {
  apiKey: "AIzaSyB1gkuDziM58XIJtbBBt2wYR0LzY9oYf7s",
  authDomain: "ltnc-a844c.firebaseapp.com",
  databaseURL: "https://ltnc-a844c-default-rtdb.firebaseio.com",
  projectId: "ltnc-a844c",
  storageBucket: "ltnc-a844c.appspot.com",
  messagingSenderId: "520659904033",
  appId: "1:520659904033:web:af292fccd30a7d65956560",
  measurementId: "G-KL3GR845B4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//add field
const add = async (data, collectionName, documentID) => {
  try {
    const ref = doc(db, collectionName, documentID);
    await updateDoc(ref, data);
    return true;
  } catch (error) {
    return error;
  }
};

// Update data for document 'collectionName/documentID'
const update = async (data, collectionName, documentID, subcollectionName = '', subdocumentID = '') => {
  try {
    const ref = doc(db, collectionName, documentID, subcollectionName, subdocumentID);
    await updateDoc(ref, data);
    return true;
  } catch (error) {
    return error;
  }
};

// Find single document by documentID
const findOne = async (data, collectionName, documentID, subcollectionName = '', subdocumentID = '') => {
  try {
    const ref = doc(db, collectionName, documentID, subcollectionName, subdocumentID);
    const docSnap = await getDoc(ref);
    const result = docSnap.data();
    return result;
  } catch (error) {
    return error;
  }
};

// Remove document from collectionName
const erase = async (collectionName, documentID, subcollectionName = '', subdocumentID = '') => {
  try {
    const ref = doc(db, collectionName, documentID, subcollectionName, subdocumentID);
    const result = await deleteDoc(ref);
    return true;
  } catch (error) {
    return error;
  }
};

// Find all documents from collectionName 
const findMany = async (collectionName, field, value) => {
  try {
    const result = new Array();
    const q = query(collection(db, collectionName), where(field, "==", value));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });
    return result;
  } catch (error) {
    return error;
  }
};


//  Add a new document to 'collectionName/documentID/subcollectionName/subdocumentID'
const insert = async (data, collectionName, documentID, subcollectionName = '', subdocumentID = '') => {
  try {
    const ref = doc(db, collectionName, documentID, subcollectionName, subdocumentID);
    await setDoc(ref, data);
    return true;
  } catch (error) {
    return error;
  }
};


const checkExist = async (collectionName, documentID, subcollectionName = '', subdocumentID = '') => {
  try {
    const ref = doc(db, collectionName, documentID, subcollectionName, subdocumentID);
    const result = await ref.get();
    return result;
  } catch (error) {
    return error;
  }
};

// Find all documents from collectionName 
const findAll = async (collectionName) => {
  try {
    const result = new Array();
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  add,
  insert,
  erase,
  findMany,
  findOne,
  update,
  checkExist,
  findAll
}