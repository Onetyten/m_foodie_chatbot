"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const customisationSchema = new mongoose_1.default.Schema({
    name: { type: String },
    type: { type: String, enum: ["option", "check", "quantity"] },
    options: [{ label: { type: String }, extraPrice: { type: Number } }],
    quantity: {
        min: { type: Number, default: 0 },
        max: { type: Number, default: 5 },
        size: { type: Number, default: 1 }
    }
});
const Customisation = mongoose_1.default.model("Customisation", customisationSchema);
exports.default = Customisation;
