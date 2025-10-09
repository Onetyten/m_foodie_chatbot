"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["pending", "completed", "canceled"], default: "pending" },
    items: [
        {
            FoodId: { type: mongoose_1.default.Types.ObjectId, ref: "Food" },
            quantity: { type: Number, default: 1 },
            priceAtPurchase: { type: Number },
            customisation: [{
                    name: { type: String },
                    type: { type: String },
                    value: { type: String },
                }],
        }
    ],
    placedAt: { type: Date, default: Date.now },
    paidAt: { type: Date },
    total: { type: Number, required: true }
});
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
