"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicalEquipment = exports.MedicalManage = exports.Authenticate = exports.Staff = exports.Patient = void 0;
var axios_1 = require("axios");
var Patient = /** @class */ (function () {
    function Patient() {
        this.baseUrl = "http://localhost:3000/api/v1/patient";
    }
    Patient.prototype.createPatient = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create_patient"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_1 = _a.sent();
                        console.log("Error creating patient: ", error_1.response.data);
                        return [2 /*return*/, error_1.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Patient.prototype.updatePatient = function (info, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update_patient?cccd=").concat(condition.cccd), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_2 = _a.sent();
                        console.log("Error updating patient: ", error_2.response.data);
                        return [2 /*return*/, error_2.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Patient.prototype.removePatient = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/remove_patient?cccd=").concat(condition.cccd), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_3 = _a.sent();
                        console.log("Error deleting patient: ", error_3.response.data);
                        return [2 /*return*/, error_3.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Patient.prototype.removeRecords = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/remove_records?date=").concat(condition.date), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_4 = _a.sent();
                        console.log("Error deleting record: ", error_4.response.data);
                        return [2 /*return*/, error_4.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Patient.prototype.createRecords = function (info, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create_records?cccd=").concat(condition.cccd), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_5 = _a.sent();
                        console.log("Error create record: ", error_5.response.data);
                        return [2 /*return*/, error_5.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Patient.prototype.findTreatment = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/find_treatment?cccd=").concat(condition.cccd), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, {
                                error: data.error,
                                data: data.medicalHistory,
                                message: data.message,
                            }];
                    case 2:
                        error_6 = _a.sent();
                        console.log("Error find all treatment: ", error_6.response.data);
                        return [2 /*return*/, error_6.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Patient.prototype.findPatient = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/find_patient?cccd=").concat(condition.cccd), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_7 = _a.sent();
                        console.log("Error find patient: ", error_7.response.data);
                        return [2 /*return*/, error_7.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Patient.prototype.findAllPatient = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/find_patient_all"), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_8 = _a.sent();
                        console.log("Error find all patient: ", error_8.response.data);
                        return [2 /*return*/, error_8.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Patient.prototype.findRecords = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/find_records?cccd=").concat(condition.cccd, "&date=").concat(condition.date), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_9 = _a.sent();
                        console.log("Error find record: ", error_9.response.data);
                        return [2 /*return*/, error_9.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Patient.prototype.createRegister = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/register_patient"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_10 = _a.sent();
                        console.log("Error register patient: ", error_10.response.data);
                        return [2 /*return*/, error_10.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Patient.prototype.findPatientsInQueue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/find_patient_in_queue"), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_11 = _a.sent();
                        console.log("Error find all patient in queue: ", error_11.response.data);
                        return [2 /*return*/, error_11.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Patient.prototype.updateStatusAferRegister = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update_status?cccd=").concat(condition.cccd, "&faculty=").concat(condition.faculty), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_12 = _a.sent();
                        console.log("Error updating patient: ", error_12.response.data);
                        return [2 /*return*/, error_12.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Patient.prototype.completeHealing = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/complete_healing?cccd=").concat(condition.cccd, "&faculty=").concat(condition.faculty), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_13 = _a.sent();
                        console.log("Error updating patient: ", error_13.response.data);
                        return [2 /*return*/, error_13.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Patient;
}());
exports.Patient = Patient;
var Staff = /** @class */ (function () {
    function Staff() {
        this.baseUrl = "http://localhost:3000/api/v1/staff";
    }
    Staff.prototype.createStaff = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_14 = _a.sent();
                        console.log("Error creating patient: ", error_14.response.data);
                        return [2 /*return*/, error_14.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Staff.prototype.findStaff = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/detail?cccd=").concat(condition.cccd), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_15 = _a.sent();
                        console.log("Error finding staff: ", error_15.response.data);
                        return [2 /*return*/, error_15.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Staff.prototype.getschedule = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/getschedule"), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_16 = _a.sent();
                        console.log("Error finding staff: ", error_16.response.data);
                        return [2 /*return*/, error_16.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Staff.prototype.deleteStaff = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/delete?cccd=").concat(condition.cccd), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_17 = _a.sent();
                        console.log("Error removing staff: ", error_17.response.data);
                        return [2 /*return*/, error_17.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Staff.prototype.updateStaff = function (condition, info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?cccd=").concat(condition.cccd), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_18 = _a.sent();
                        console.log("Error updating staff: ", error_18.response.data);
                        return [2 /*return*/, error_18.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Staff.prototype.findAllStaff = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/getalldoctor"), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_19 = _a.sent();
                        console.log("Error updating staff: ", error_19.response.data);
                        return [2 /*return*/, error_19.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Staff;
}());
exports.Staff = Staff;
var Authenticate = /** @class */ (function () {
    function Authenticate() {
        this.baseUrl = "http://localhost:3000/api/v1/authenticate";
    }
    Authenticate.prototype.login = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/login"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.info, message: data.message }];
                    case 2:
                        error_20 = _a.sent();
                        console.log("Error login: ", error_20.response.data);
                        return [2 /*return*/, error_20.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Authenticate.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/logout"), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_21 = _a.sent();
                        console.log("Error logout: ", error_21.response.data);
                        return [2 /*return*/, error_21.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Authenticate.prototype.getUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_22;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/getUser"), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_22 = _a.sent();
                        console.log("Error getUser: ", error_22.response.data);
                        return [2 /*return*/, error_22.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Authenticate;
}());
exports.Authenticate = Authenticate;
var MedicalManage = /** @class */ (function () {
    function MedicalManage() {
        this.baseUrl = "http://localhost:3000/api/v1/medicine";
    }
    MedicalManage.prototype.createMedicine = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_23 = _a.sent();
                        console.log("Error creating patient: ", error_23.response.data);
                        return [2 /*return*/, error_23.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MedicalManage.prototype.getDetail = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_24;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/getDetail?id=").concat(condition.id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_24 = _a.sent();
                        console.log("Error creating patient: ", error_24.response.data);
                        return [2 /*return*/, error_24.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MedicalManage.prototype.getExpire = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_25;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/getExp"), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_25 = _a.sent();
                        console.log("Error creating patient: ", error_25.response.data);
                        return [2 /*return*/, error_25.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MedicalManage.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_26;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/getData"), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_26 = _a.sent();
                        console.log("Error creating patient: ", error_26.response.data);
                        return [2 /*return*/, error_26.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MedicalManage.prototype.deleteMedicine = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_27;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/delete?id=").concat(condition.id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_27 = _a.sent();
                        console.log("Error creating patient: ", error_27.response.data);
                        return [2 /*return*/, error_27.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MedicalManage.prototype.updateMedicine = function (condition, info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_28;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?id=").concat(condition.id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_28 = _a.sent();
                        console.log("Error updating medicine: ", error_28.response.data);
                        return [2 /*return*/, error_28.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return MedicalManage;
}());
exports.MedicalManage = MedicalManage;
var medicalEquipment = /** @class */ (function () {
    function medicalEquipment() {
        this.baseUrl = "http://localhost:3000/api/v1/medicalEquip";
    }
    medicalEquipment.prototype.createMedicalEquipment = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_29;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_29 = _a.sent();
                        console.log("Error creating patient: ", error_29.response.data);
                        return [2 /*return*/, error_29.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    medicalEquipment.prototype.getDetail = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_30;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/getDetail?id=").concat(condition.id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_30 = _a.sent();
                        console.log("Error creating patient: ", error_30.response.data);
                        return [2 /*return*/, error_30.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    medicalEquipment.prototype.getExpire = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_31;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/getExp"), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_31 = _a.sent();
                        console.log("Error creating patient: ", error_31.response.data);
                        return [2 /*return*/, error_31.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    medicalEquipment.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_32;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/getData"), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, data: data.data, message: data.message }];
                    case 2:
                        error_32 = _a.sent();
                        console.log("Error creating patient: ", error_32.response.data);
                        return [2 /*return*/, error_32.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    medicalEquipment.prototype.deleteMedicalEquipment = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_33;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/delete?id=").concat(condition.id), {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_33 = _a.sent();
                        console.log("Error creating patient: ", error_33.response.data);
                        return [2 /*return*/, error_33.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    medicalEquipment.prototype.updateMedicalEquip = function (condition, info) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_34;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update?id=").concat(condition.id), info, {
                                withCredentials: true,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, { error: data.error, message: data.message }];
                    case 2:
                        error_34 = _a.sent();
                        console.log("Error updating medical: ", error_34.response.data);
                        return [2 /*return*/, error_34.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return medicalEquipment;
}());
exports.medicalEquipment = medicalEquipment;
