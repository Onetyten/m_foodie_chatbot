"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    cart: [{
            foodId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Food" },
            quantity: { type: Number, default: 1 },
            customisation: [{
                    name: { type: String },
                    type: { type: String },
                    value: { type: String },
                }],
        }],
    moneySpent: { type: Number, default: 0 }
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
