"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubController = getSubController;
const joi_1 = __importDefault(require("joi"));
const mongoConnect_1 = __importDefault(require("../config/mongoConnect"));
const subCategory_1 = __importDefault(require("../schema/subCategory"));
const categorySchema_1 = __importDefault(require("../schema/categorySchema"));
const catSchema = joi_1.default.object({
    category: joi_1.default.string().valid('drink', 'snack', 'coffee')
});
function getSubController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error, value } = catSchema.validate(req.params);
        if (error) {
            console.log("validation error");
            return res.status(400).json({ message: "validation error", success: false });
        }
        const { category } = value;
        try {
            yield (0, mongoConnect_1.default)();
            const categoryId = yield categorySchema_1.default.findOne({ name: category });
            if (!categoryId) {
                return res.status(404).json({ message: `no categories found for ${category}`, success: false });
            }
            const subCategories = yield subCategory_1.default.find({ categoryId });
            if (subCategories.length == 0) {
                return res.status(404).json({ message: `no categories found for ${category}`, success: false });
            }
            res.status(200).json({ message: "subcategories fetched successfully", data: subCategories, success: true });
        }
        catch (error) {
            console.log("error getting subcategory", error);
            res.status(201).json({ message: "error getting subcategory", success: false });
        }
    });
}
