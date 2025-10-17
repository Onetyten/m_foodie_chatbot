"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fetchOrders_controller_1 = require("../../controller/fetchOrders.controller");
const router = express_1.default.Router();
router.post('/fetch', fetchOrders_controller_1.fetchOrderController);
exports.default = router;
