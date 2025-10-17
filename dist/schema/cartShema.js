"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cartSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    foodId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Food" },
    quantity: { type: Number, default: 1 },
    customisation: [{
            name: { type: String },
            type: { type: String },
            value: { type: String },
            price: { type: Number },
        }],
    totalPrice: { type: Number }
});
const Cart = mongoose_1.default.model('Cart', cartSchema);
exports.default = Cart;
