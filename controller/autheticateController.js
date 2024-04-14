const authenticateService = require("../services/authenticateService")
const staffService = require("../services/staffService")
const validation = require('../lib/validation');

const authenticateValidation = new validation.AuthenticateValidation();

const login = async (req, res) => {
  try {
    const { error } = authenticateValidation.login(req.body);
    if (error) {
        return res.status(400).json({
            error: true,
            message: error.message,
        });
    }
    const userCredential = await authenticateService.login(req.body);
    const staff = await staffService.findDoctor();
    
    const tempStaff = staff.doctors.filter(item => item.userUid == userCredential.user.uid);
    
    if (!tempStaff) {
        return res.status(400).send({
          error: true,
          message: "Người dùng không tồn tại."
      });
    }

    const data = {
      role : tempStaff[0].role,
      cccd: tempStaff[0].cccd
    }

    await authenticateService.setSession(tempStaff[0].userUid, data)
    
    return res.status(200).send({
        error: false,
        message: "Login sucessfully."
    });
  }
  catch (err) {
    return res.status(400).send({
      error: true,
      message: err.message
    })
  }
};

const logout = async (req, res) => {
  try {
    await authenticateService.signout(req.body.uid);
    console.log("run");

    return res.status(200).send({
      error: false,
      message: "Đăng xuất thành công"
    })
  }
    catch (err) {
      return res.status(400).send({
        error: true,
        message: err.message
      })
    }
};

module.exports = {
  login,
  logout
}
