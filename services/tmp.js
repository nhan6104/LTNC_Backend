const dbUtils = require('../lib/dbUtils')

const func = async ()=>{
    await dbUtils.erase('patient', '123456789');
  }
  func();