const dbUtils = require('../lib/dbUtils');

const collectionName = "MedicalEquipment";
const collectiontotal = "staff";

const findMedicalEquip = async () => {
  const result = await dbUtils.findAll(collectionName);
  return result;
};

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
    if (item.warranty_expiration_date) {
      const expirationDate = convertToDate(item.warranty_expiration_date);
      const expirationYear = expirationDate.getFullYear();
      const expirationMonth = (expirationDate.getMonth() + 1).toString().padStart(2, '0');
      const expirationDay = expirationDate.getDate().toString().padStart(2, '0');
      const expirationFormatted = `${expirationYear}/${expirationMonth}/${expirationDay}`;
      return expirationFormatted <= nowFormatted;
    }
  });

  return filteredResult;
};

const createMedicalEquip = async (data) => {
  const documentID = generateRandomString(10);
  data.id = documentID;

  console.log(data);
  const result = await dbUtils.insert(data, collectionName, documentID);

  if (result) return data;

  return result;
};

const createMedicalEquipInTotal = async (dataMedicalEquip) => {
  const result = await dbUtils.add(dataMedicalEquip, collectiontotal, collectionName);
  return result;
};

function generateRandomString(length) {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};


const removeMedicalEquip = async (medicalEquipID) => {
  return dbUtils.erase(collectionName, medicalEquipID);
};

const checkExistMedicalEquip = async (data) => {
  const documentID = data;
  const result = await dbUtils.findOne(collectionName, documentID);
  return result;
};

const updateMedicalEquip = async (data, medicineID) => {
  const documentID = medicineID;
  // console.log(documentID)
  const result = await dbUtils.update(data, collectionName, documentID);
  return result;
};

const removeMedicalEquipByPath = async (ref) => {
  return dbUtils.erasePath(ref);
};

const findMedicalEquipToTal = async () => {
  const result = await dbUtils.findOne(collectiontotal, collectionName);
  return result;
};



module.exports = {
  findMedicalEquip,
  findMedicalEquipExpire,
  createMedicalEquip,
  createMedicalEquipInTotal,
  generateRandomString,
  removeMedicalEquip,
  checkExistMedicalEquip,
  updateMedicalEquip,
  removeMedicalEquipByPath,
  findMedicalEquipToTal
}