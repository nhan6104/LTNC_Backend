const createStaff = async (req, res) => {
  try {
          const { error } = doctorValidation.validateCreateDoctor(req.body);
  
          if (error) {
              console.log(error);
              return res.status(400).json({
                  error: true,
                  message: error.message,
              });
          }

          const doctors = await doctorService.findDoctor();

          if (doctors.doctor) {
              for (let doctor of doctors.doctor) {
                  if (doctor.cccd === req.body.cccd || doctor.email === req.body.email) {
                      return res.status(400).json({
                          error: true,
                          message: "Người dùng đã tồn tại",
                      });
                  }   
              }
          }

          const resultSignUp = await doctorService.signupAccount(req.body.email, req.body.cccd);
          
          let newStaff = new Array();
          let tempStaff = new Object();           
          const  ref = `doctor/${req.body.cccd}` 
          tempStaff = {
              cccd: req.body.cccd,
              refference: ref,
              fullname: req.body.name,
              userUid: resultSignUp.user.uid
          }

          newStaff.push(tempStaff)
          if (doctors.doctors) 
          {
              for (const staff of doctors.doctors)  
              {
                  newStaff.push(staff);
              }
          }

          const resultCreatingNewStaffInTotal = await doctorService.createStaffInTotal({doctors: newStaff});
          // console.log(resultCreatingNewStaffInTotal)
          let textResultCreatingNewStaffInTotal;
          if (!resultCreatingNewStaffInTotal) {
              textResultCreatingNewStaffInTotal = `Tạo nhân viên trong bảng tổng thất bại.`;
          }
          else {
              textResultCreatingNewStaffInTotal = `Tạo nhân viên trong bảng tổng thành công.`
          }

          //!
          const resultCreatingNewStaff = await doctorService.createStaff(req.body);
          

          let textResultCreatingNewStaff;
          if (!resultCreatingNewStaff) {
              textResultCreatingNewStaff = `Tạo nhân viên thất bại.`;
          }
          else {
              textResultCreatingNewStaff = `Tạo nhân viên thành công.`
          }

          return res.status(200).json({
              error: false,
              message: `
              Kết quả:\n
              ${textResultCreatingNewStaff}\n
              ${textResultCreatingNewStaffInTotal}\n`,
          });

  }
  catch (error) {
      // console.log(err);
  return res.status(500).json({
    error: true,
    message: error.message,
  });
  }
  
}
