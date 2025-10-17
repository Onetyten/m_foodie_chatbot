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
exports.getCartList = getCartList;
const mongoConnect_1 = __importDefault(require("../config/mongoConnect"));
const cartShema_1 = __importDefault(require("../schema/cartShema"));
function getCartList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.userId;
        if (!userId) {
            console.log("No userId");
            return res.status(400).json({ message: "No userId", success: false });
        }
        try {
            yield (0, mongoConnect_1.default)();
            const cartList = yield cartShema_1.default.find({ userId }).select("_id quantity totalPrice").populate({ path: "foodId", select: ["name", "imageUrl"] });
            if (!cartList.length) {
                console.log("No item found in cart");
                return res.status(404).json({ message: "No item found in cart", success: false });
            }
            console.log("cart fetched");
            return res.status(200).json({ message: "cart fetched", data: cartList, success: true });
        }
        catch (error) {
            console.log("error getting cart", error);
            res.status(500).json({ message: `Internal server error`, error, success: false });
        }
    });
}
