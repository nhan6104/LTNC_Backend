const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword, AuthErrorCodes } = require("firebase/auth");

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

const login = async (req, res) => {
  try {
    await signInWithEmailAndPassword(auth, req.body.email, req.body.password);
    return res.status(200).send({
      error: false,
      message: "Login sucessfully."
    });
  }
  catch (err) {
    console.log(err.code);
    if (err.code == AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
      return res.status(400).send({
        error: true,
        message: "Password or email is wrong. Please sign in again."
      })
    }
    return res.status(400).send({
      error: true,
      message: err.message
    })
  }
};


module.exports = {
  login,
}
