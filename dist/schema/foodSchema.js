"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const foodSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    available: { type: Boolean, default: true },
    calories: { type: Number },
    imageUrl: { type: String, default: "https://t4.ftcdn.net/jpg/01/05/90/77/360_F_105907729_4RzHYsHJ2UFt5koUI19fc6VzyFPEjeXe.jpg" },
    categoryId: { type: mongoose_1.default.Types.ObjectId, ref: "Category", required: true },
    subCategoryId: { type: mongoose_1.default.Types.ObjectId, ref: "subCategory", required: true },
    customisationId: [{ type: mongoose_1.default.Types.ObjectId, ref: "Customisation" }]
});
const Food = mongoose_1.default.model("Food", foodSchema);
exports.default = Food;
