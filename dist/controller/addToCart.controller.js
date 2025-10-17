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
exports.AddToCart = AddToCart;
const joi_1 = __importDefault(require("joi"));
const mongoConnect_1 = __importDefault(require("../config/mongoConnect"));
const cartShema_1 = __importDefault(require("../schema/cartShema"));
const userShema_1 = __importDefault(require("../schema/userShema"));
const tweakSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    type: joi_1.default.string().required(),
    value: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
});
const cartSchema = joi_1.default.object({
    foodId: joi_1.default.string().length(24).hex().required(),
    quantity: joi_1.default.number().integer().min(1).required(),
    customisation: joi_1.default.array().items(tweakSchema).required(),
    totalPrice: joi_1.default.number().integer().min(0).required(),
});
function AddToCart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error, value } = cartSchema.validate(req.body);
        if (error) {
            console.log("validation error", error);
            return res.status(400).json({ message: "validation error", success: false });
        }
        if (!req.userId) {
            console.log("no user_id provided", error);
            return res.status(400).json({ message: "no user_id provided", success: false });
        }
        const customisation = value.customisation;
        try {
            yield (0, mongoConnect_1.default)();
            const user = yield userShema_1.default.findById(req.userId);
            if (!user) {
                console.log("user not found", error);
                return res.status(400).json({ message: "user not found", success: false });
            }
            const totalPrice = value.totalPrice + customisation.reduce((sum, tweak) => sum + tweak.price, 0);
            const cart = yield cartShema_1.default.create(Object.assign(Object.assign({ userId: req.userId }, value), { totalPrice }));
            res.status(201).json({ message: "Added to cart", success: true, data: cart });
        }
        catch (error) {
            console.log("error adding to cart", error);
            res.status(500).json({ message: `error adding to cart: ${error instanceof Error ? error.message : ""}`, error, success: false });
        }
    });
}
