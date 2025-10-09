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
exports.foodListController = foodListController;
const joi_1 = __importDefault(require("joi"));
const mongoConnect_1 = __importDefault(require("../config/mongoConnect"));
const foodSchema_1 = __importDefault(require("../schema/foodSchema"));
const listSchema = joi_1.default.object({
    id: joi_1.default.string().length(24).hex().required()
});
function foodListController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error, value } = listSchema.validate(req.params);
        if (error) {
            console.log("validation error", error);
            return res.status(400).json({ message: "validation error", success: false });
        }
        const { id } = value;
        try {
            yield (0, mongoConnect_1.default)();
            const foodList = yield foodSchema_1.default.find({ subCategoryId: id });
            if (foodList.length == 0) {
                return res.status(404).json({ message: `no food found in this category`, success: false });
            }
            res.status(200).json({ message: "foods fetched successfully", data: foodList, success: true });
        }
        catch (error) {
            console.log("error fetching food", error);
            res.status(201).json({ message: "error fetching food", success: false });
        }
    });
}
