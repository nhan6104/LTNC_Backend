const dbUtils = require('../lib/dbUtils');
const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const collectionName = "doctor";
const collectiontotal = "staff";


const createNewStaff = async (data) => {
    const documentID = data.cccd;
    const result = await dbUtils.insert(data, collectionName, documentID);
    return result;
};

const checkExistStaff = async (data) => {
    const documentID = data;
    // console.log(documentID)
    const result = await dbUtils.findOne(collectionName, documentID);
    return result;
};

const removeStaff = async (path) => {
    return await dbUtils.erasePath(path);
};

const createNewStaffInTotal = async (doctorID) => {
    const result = await dbUtils.insert(doctorID, collectiontotal, collectionName);
    return result;
};

const detailOfStaff = async (path) => {
  const result = await dbUtils.findOnePath(path);
  return result;
}

const jobOfStaff = async (doctorID) => {
  const result = await dbUtils.findOne(collectionName, doctorID);
  return result.position;
}

const findDoctor = async () => {
  const result = await dbUtils.findOne(collectiontotal, collectionName);
  return result;
}

const UpdateDoctorInTotal = async (dataDoctor) => {
  // console.log(documentID)
  const result = await dbUtils.insert(dataDoctor, collectiontotal, collectionName);
  return result;
};

const signupAccount = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result;
};


module.exports = {
    createNewStaff,
    checkExistStaff,
    findDoctor,
    removeStaff,
    createNewStaffInTotal,
    detailOfStaff,
    jobOfStaff,
    UpdateDoctorInTotal,
    signupAccount
}
