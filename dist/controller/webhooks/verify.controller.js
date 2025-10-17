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
exports.verifyPaymentController = verifyPaymentController;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const crypto_1 = __importDefault(require("crypto"));
const orderSchema_1 = __importDefault(require("../../schema/orderSchema"));
function verifyPaymentController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const paystackKey = process.env.PAYSTACK_KEY;
        if (!paystackKey)
            throw new Error("PAYSTACK_KEY variable not found, add it to the .env");
        const signature = req.headers["x-paystack-signature"];
        const hash = crypto_1.default.createHmac("sha512", paystackKey).update(JSON.stringify(req.body)).digest("hex");
        if (hash !== signature) {
            console.log("invalid signature");
            return res.sendStatus(400);
        }
        const event = req.body;
        console.log("webhook event received: ", event.event);
        if (event.event === "charge.success") {
            const reference = event.data.reference;
            const email = event.data.email;
            const paidOrder = yield orderSchema_1.default.findByIdAndUpdate({ email, reference, status: "pending" }, { status: "completed", paidAt: new Date() }, { new: true });
            console.log(paidOrder);
        }
        res.sendStatus(200);
    });
}
