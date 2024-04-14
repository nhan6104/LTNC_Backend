const { initializeApp } = require("firebase/app");
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

// Lưu thông tin phiên đăng nhập vào Realtime Database
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


const saveSessionToDatabase = async (userId, sessionData) => {
  await set(ref(database, `sessions/${userId}`), sessionData);
}

const getSessionFromDatabase = async (userId) => {
  const sessionRef = ref(database, `sessions/${userId}`);
  return await get(sessionRef);
}

const removeSession = async (userId) => {
  await remove(ref(db, `sessions/${userId}`));
};


module.exports = {
  saveSessionToDatabase,
  getSessionFromDatabase,
  removeSession

}