"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const subCategorySchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    categoryId: { type: mongoose_1.default.Types.ObjectId, ref: "Category" },
    imageUrl: { type: String, default: "https://t4.ftcdn.net/jpg/01/05/90/77/360_F_105907729_4RzHYsHJ2UFt5koUI19fc6VzyFPEjeXe.jpg" },
});
const subCategory = mongoose_1.default.model("subCategory", subCategorySchema);
exports.default = subCategory;
