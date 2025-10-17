"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getCartList_controller_1 = require("../../controller/getCartList.controller");
const router = express_1.default.Router();
router.get('/cart/fetch', getCartList_controller_1.getCartList);
exports.default = router;
