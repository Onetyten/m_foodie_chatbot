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
exports.OrderController = OrderController;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoConnect_1 = __importDefault(require("../config/mongoConnect"));
const orderItemShema_1 = __importDefault(require("../schema/orderItemShema"));
const cartShema_1 = __importDefault(require("../schema/cartShema"));
const orderValidation_1 = require("../validation/orderValidation");
const orderSchema_1 = __importDefault(require("../schema/orderSchema"));
const axios_1 = __importDefault(require("axios"));
function OrderController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const paystackKey = process.env.PAYSTACK_KEY;
        if (!paystackKey) {
            throw new Error("No PAYSTACK_KEY env variable found");
        }
        const { error, value } = orderValidation_1.OrderSchema.validate(req.body);
        if (error)
            return res.status(400).json({ message: `Validation error:${error.message}}`, success: false });
        const userId = req.userId;
        if (!userId) {
            console.log("No user id found");
            res.status(400).json({ message: `No user id found`, success: false });
        }
        try {
            yield (0, mongoConnect_1.default)();
            const cartItems = value.items;
            const createdOrderItemsId = [];
            for (const item of cartItems) {
                const originCart = yield cartShema_1.default.findById(item._id);
                const newCartItem = yield orderItemShema_1.default.create({
                    foodId: originCart === null || originCart === void 0 ? void 0 : originCart.foodId,
                    quantity: item.quantity,
                    priceAtPurchase: originCart === null || originCart === void 0 ? void 0 : originCart.totalPrice,
                    customisation: originCart === null || originCart === void 0 ? void 0 : originCart.customisation
                });
                createdOrderItemsId.push(newCartItem._id);
                console.log("new cart order created");
            }
            const email = value.email.toLowerCase();
            const callback_url = process.env.CALLBACK_URL;
            const total = cartItems.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0);
            const payParams = {
                email: email,
                amount: total * 100,
                callback_url
            };
            const paystack_response = yield axios_1.default.post('https://api.paystack.co/transaction/initialize', payParams, {
                headers: {
                    Authorization: `Bearer ${paystackKey}`,
                    'Content-Type': 'application/json'
                }
            });
            const result = paystack_response.data;
            const newOrder = yield orderSchema_1.default.create({
                userId,
                items: createdOrderItemsId,
                name: value.name,
                email,
                address: value.address,
                reference: result.data.reference,
                access_code: result.data.access_code,
                payment_url: result.data.authorization_url,
                phone_number: value.phone_number,
                total
            });
            console.log("order created");
            return res.status(201).json({ message: 'Order created successfully', success: true, data: { authorization_url: result.data.authorization_url, reference: result.data.reference }
            });
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                console.error((_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
                return res.status(500).json({ message: `Payment initialization failed`, error, success: false });
            }
            console.error("error creating order", error);
            return res.status(500).json({ message: `error creating order : ${error instanceof Error ? error.message : ""}`, error, success: false });
        }
    });
}
