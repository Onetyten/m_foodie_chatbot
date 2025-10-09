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
exports.Authorization = Authorization;
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object({
    userId: joi_1.default.string().length(24).hex().required()
});
function Authorization(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            return res.status(400).json({ message: "No authorization header found", success: false });
        if (!authHeader.startsWith("Bearer"))
            return res.status(400).json({ message: "Invalid Auth format", success: false });
        const userId = authHeader.split(" ")[1];
        const { error } = userSchema.validate({ userId });
        if (error)
            return res.status(400).json({ message: `Validation error:${error.message}}`, success: false });
        req.userId = userId;
        next();
    });
}
