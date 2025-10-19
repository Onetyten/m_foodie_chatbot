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
exports.fetchOrderController = fetchOrderController;
const mongoConnect_1 = __importDefault(require("../config/mongoConnect"));
const orderSchema_1 = __importDefault(require("../schema/orderSchema"));
function fetchOrderController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("fetching orders");
        const userId = req.userId;
        const { references } = req.body;
        try {
            yield (0, mongoConnect_1.default)();
            const fetchedOrders = yield orderSchema_1.default.find({ userId, reference: { $in: references } }).populate({
                path: "items", populate: { path: "foodId", model: "Food", select: "name price imageUrl calories", },
            });
            return res.status(200).json({ message: 'orders fetched', success: true, data: fetchedOrders });
        }
        catch (error) {
            console.log("error getting orders", error);
            res.status(500).json({ message: `Internal server error`, error, success: false });
        }
    });
}
