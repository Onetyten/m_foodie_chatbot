"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deleteCart_controller_1 = require("../../controller/deleteCart.controller");
const router = express_1.default.Router();
router.delete('/cart/delete/:id', deleteCart_controller_1.deleteCart);
exports.default = router;
