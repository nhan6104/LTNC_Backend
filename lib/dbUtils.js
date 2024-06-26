const { initializeApp } = require("firebase/app");
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
  deleteField,
} = require("firebase/firestore/lite");

const {getDatabase, ref, set, get, remove} = require('firebase/database');


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
const database = getDatabase(app);


//

//add field
const add = async (data, collectionName, documentID ) => {
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
const findOne = async (collectionName, documentID, subcollectionName = '', subdocumentID = '') => {
  try {
    const ref = doc(db, collectionName, documentID, subcollectionName, subdocumentID);
    const docSnap = await getDoc(ref);
    const result = docSnap.data();
    // console.log(result);
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
      console.log("Document deleted successfully");
      return true;
  } catch (error) { 
      return error;
  }
};

// Remove the 'field' from the document docRef
const eraseField = async (docRef, field) => {
  await updateDoc(docRef, {[field]:deleteField()});
}

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

//update path  , 
const updatePath = async (data, path) => {
  try {
    const ref = doc(db, path);
    await updateDoc(ref, data);
    return true;
  } catch (error) {
    return error;
  }
}

const findOnePath = async (path) => {
  try {
    const ref = doc(db, path);
    const snapShot = await getDoc(ref);
    if (!snapShot.exists()) throw "No such document!";
    else return snapShot.data();
  } catch (error) {
    return error;
  }
}


const erasePath = async (path) => {
  try{
    const ref = doc(db, path);
    const result = await deleteDoc(ref);
    return true;
  } catch (error) {
    return error;
  }
}


async function insertPath(data, path) {
  try {
    const ref = doc(db, path);
    await setDoc(ref, data);
    return true;
  } catch (error) {
    return false;
  }
}

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

const setRealtimeDb = async (reference, info) => {
  try{
    await set(ref(database, reference), info);
  }
  catch (error) {
    return error;
  }
};

const getRealtimeDb = async (reference) => {
  try {
    const sessionRef = ref(database, reference);
    const result = await get(sessionRef);
    return result.val();
  }
  catch (error) {
    return error;
  }
}

const removeRealtimeDb = async (reference) => {
  try {
    await remove(ref(database, reference));
  }
  catch (error) {
    return error;
  }
};

module.exports = {
  insert,
  erase,
  findMany,
  findOne,
  update,
  checkExist,
  eraseField,
  add,
  updatePath,
  findOnePath,
  erasePath,
  insertPath,
  findAll,
  setRealtimeDb,
  getRealtimeDb,
  removeRealtimeDb
}