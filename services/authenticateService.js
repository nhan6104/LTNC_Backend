const authenticate = require("../database/auth");
const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword, signOut } = require("firebase/auth");

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


const setSession = async (userId , data) => {
    await authenticate.saveSessionToDatabase(userId, data);
};

const getSession = async (userId) => {
  return await authenticate.getSessionFromDatabase(userId);
};

const login = async (info) => {
    return await signInWithEmailAndPassword(auth, info.account, info.password)
};

const signout = async () => {
  await signOut(auth);
};

const removeSession = async (useruid) => { 
  await authenticate.removeSession(useruid);
}

module.exports = {
  setSession,
  getSession,
  login,
  signout,
  removeSession
}
