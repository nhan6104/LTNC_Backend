const { documentId } = require('firebase/firestore');
const dbUtils = require('../lib/dbUtils');
const { generateRandomString } = require('./medicine');

const collectionName = "MedicalEquipment";

const findMedicalEquip = async () => {
    const result = await dbUtils.findAll(collectionName);
    return result;
}

const findMedicalEquipExpire = async () => {
    const result = await dbUtils.findAll(collectionName);
  
    // Lấy thời điểm hiện tại
    const now = new Date();
    const nowYear = now.getFullYear();
    const nowMonth = (now.getMonth() + 1).toString().padStart(2, '0');
    const nowDay = now.getDate().toString().padStart(2, '0');
    const nowFormatted = `${nowYear}/${nowMonth}/${nowDay}`;
  
    // Hàm chuyển đổi ngày từ định dạng "dd/mm/yyyy" sang đối tượng Date
    const convertToDate = (dateString) => {
      const [day, month, year] = dateString.split('/');
      return new Date(`${year}-${month}-${day}`);
    };
  
    // Lọc các kết quả sao cho expiration_day <= now
    const filteredResult = result.filter(item => {
      const expirationDate = convertToDate(item.warranty_expiration_date);
      const expirationYear = expirationDate.getFullYear();
      const expirationMonth = (expirationDate.getMonth() + 1).toString().padStart(2, '0');
      const expirationDay = expirationDate.getDate().toString().padStart(2, '0');
      const expirationFormatted = `${expirationYear}/${expirationMonth}/${expirationDay}`;
      return expirationFormatted <= nowFormatted;
    });
  
    return filteredResult;
};

const createMedicalEquip = async (data) => {
    const documentID = generateRandomString(10);
    data.id = documentID;
    const result = await dbUtils.insert(data,collectionName,documentID);
    return result;
};

const removeMedicalEquip = async (medicalEquipID) => {
    return dbUtils.erase(collectionName,medicalEquipID);
}

const checkExistMedicalEquip = async (data) => {
    const documentID = data;
    const result = await dbUtils.findOne(null,collectionName,documentID);
    return result;
}

  

module.exports = {
    findMedicalEquip,
    findMedicalEquipExpire,
    createMedicalEquip,
    removeMedicalEquip,
    checkExistMedicalEquip
}
