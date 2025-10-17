"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderItemSchema = new mongoose_1.default.Schema({
    foodId: { type: mongoose_1.default.Types.ObjectId, ref: "Food", required: true },
    quantity: { type: Number, default: 1 },
    priceAtPurchase: { type: Number, required: true },
    customisation: [
        {
            name: { type: String },
            type: { type: String },
            value: { type: String },
        },
    ],
}, { timestamps: true });
const OrderItem = mongoose_1.default.model("OrderItem", orderItemSchema);
exports.default = OrderItem;
