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
exports.getFoodCustomisations = getFoodCustomisations;
const joi_1 = __importDefault(require("joi"));
const mongoConnect_1 = __importDefault(require("../config/mongoConnect"));
const customisationSchema_1 = __importDefault(require("../schema/customisationSchema"));
const custSchema = joi_1.default.object({
    customisationId: joi_1.default.array().items(joi_1.default.string().length(24).hex()).default([])
});
function getFoodCustomisations(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error, value } = custSchema.validate(req.body);
        if (error) {
            console.log("validation error", error);
            return res.status(400).json({ message: "validation error", success: false });
        }
        const { customisationId } = value;
        try {
            yield (0, mongoConnect_1.default)();
            const allCustomisations = yield customisationSchema_1.default.find({
                _id: { $in: customisationId }
            });
            if (!allCustomisations.length) {
                return res.status(404).json({ message: "No customisations found", success: false });
            }
            return res.status(200).json({ message: "customisations fetched", data: allCustomisations, success: true });
        }
        catch (error) {
            console.log("error fetching customisations", error);
            res.status(500).json({ message: `error fetching customisations : ${error instanceof Error ? error.message : ""}`, error, success: false });
        }
    });
}
