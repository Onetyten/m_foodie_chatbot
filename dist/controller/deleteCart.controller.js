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
exports.deleteCart = deleteCart;
const mongoConnect_1 = __importDefault(require("../config/mongoConnect"));
const joi_1 = __importDefault(require("joi"));
const cartShema_1 = __importDefault(require("../schema/cartShema"));
const cartSchema = joi_1.default.object({
    id: joi_1.default.string().length(24).hex().required()
});
function deleteCart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error, value } = cartSchema.validate(req.params);
        if (error)
            return res.status(400).json({ message: `Validation error:${error.message}}`, success: false });
        const id = value.id;
        yield (0, mongoConnect_1.default)();
        try {
            const deleted = yield cartShema_1.default.findByIdAndDelete(id);
            if (!deleted) {
                return res.status(400).json({ message: `Item does not exist`, success: false });
            }
            return res.status(200).json({ message: "Message deleted succesfully", success: true });
        }
        catch (error) {
            console.log("error deleting item", error);
            res.status(500).json({ message: `error deleting item`, error, success: false });
        }
    });
}
