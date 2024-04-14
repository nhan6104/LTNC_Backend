const { initializeApp } = require("firebase/app");
const { getAuth, onAuthStateChanged } = require("firebase/auth");
const authenticateService = require("../services/authenticateService");

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


const isAuthenticated = (req, res, next) => {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      return res.status(403).json({
          error: true,
          message: "Người dùng không được phép truy cập tài nguyên này."
      });
    } 
    console.log(user.uid);
    req.body.uid = user.uid;
    next();
  })
};


const  isAuthorized = (roles) => {
  return async (req, res, next) => {
      const userSession = await authenticateService.getSession(req.body.uid);
      const data = userSession.val();
      for (const role of roles) {
          if (data.role === role) {
           delete req.body.uid;
              return next();
          }
      }
    
    return res.status(403).json({
        error: true,
        message: "Người dùng không được phép truy cập tài nguyên này.",
    });
  }

}

const  isAuthorizedFinding = (roles) => {
  return async (req, res, next) => {
      const userSession = await authenticateService.getSession(req.body.uid);
      const data = userSession.val();

      for (const role of roles) {
          if (userSession.role === role) {
            req.body.role = data.role;
            req.body.cccd = data.cccd;
            return next();
          }
      }
    
    return res.status(403).json({
        error: true,
        message: "Người dùng không được phép truy cập tài nguyên này.",
    });
  }

}


module.exports = {
  isAuthenticated,
  isAuthorizedFinding,
  isAuthorized
}
