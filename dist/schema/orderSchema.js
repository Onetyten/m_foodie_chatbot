"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["pending", "completed", "canceled"], default: "pending" },
    items: [{ type: mongoose_1.default.Types.ObjectId, ref: "OrderItem" }],
    placedAt: { type: Date, default: Date.now },
    paidAt: { type: Date },
    name: { type: String, required: true },
    reference: { type: String, required: true },
    payment_url: { type: String, required: true },
    access_code: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone_number: { type: String, required: true },
    total: { type: Number, required: true }
});
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
