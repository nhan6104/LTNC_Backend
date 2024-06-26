const dbUtils = require('../lib/dbUtils');

const collectionName = "Medicines";
const collectiontotal = "staff";

const findMedicines = async () => {
    const result = await dbUtils.findAll(collectionName);
    return result;
};

const findMedicineToTal = async () => {
    const result = await dbUtils.findOne(collectiontotal, collectionName);
    return result;
};
  

const findMedicinesExpire = async () => {
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
        const expirationDate = convertToDate(item.expiration_date);
        const expirationYear = expirationDate.getFullYear();
        const expirationMonth = (expirationDate.getMonth() + 1).toString().padStart(2, '0');
        const expirationDay = expirationDate.getDate().toString().padStart(2, '0');
        const expirationFormatted = `${expirationYear}/${expirationMonth}/${expirationDay}`;
        return expirationFormatted <= nowFormatted;
    });

    return filteredResult;
};

const createMedicine = async (data) => {
    const documentID = generateRandomString(10);
    data.id = documentID;
    const result = await dbUtils.insert(data, collectionName, documentID);

    if (result) return data;

    return result;
};

const createMedicineInTotal = async (dataMedicine) => {
    // console.log(documentID)

    const result = await dbUtils.add(dataMedicine, collectiontotal, collectionName);
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

const removeMedicine = async (medicineID) => {
    return dbUtils.erase(collectionName, medicineID);
};

const removeMedicineByPath = async (ref) => {
    return dbUtils.erasePath(ref);
};

const checkExistMedicine = async (data) => {
    const documentID = data;
    const result = await dbUtils.findOne(collectionName, documentID);
    return result;
};


const updateMedicine = async (data, medicineID) => {
    const documentID = medicineID;
    // console.log(documentID)
    const result = await dbUtils.update(data, collectionName, documentID);
    return result;
};


module.exports = {
    findMedicines,
    findMedicinesExpire,
    createMedicine,
    createMedicineInTotal,
    generateRandomString,
    removeMedicine,
    checkExistMedicine,
    updateMedicine,
    findMedicineToTal,
    removeMedicineByPath
}