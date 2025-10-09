"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createUser_controller_1 = require("../controller/createUser.controller");
const router = express_1.default.Router();
router.get('/create', createUser_controller_1.createNewUser);
exports.default = router;
