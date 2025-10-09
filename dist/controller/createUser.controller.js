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
exports.createNewUser = createNewUser;
const mongoConnect_1 = __importDefault(require("../config/mongoConnect"));
const userShema_1 = __importDefault(require("../schema/userShema"));
function createNewUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, mongoConnect_1.default)();
        try {
            const newUser = yield userShema_1.default.create({});
            console.log("New user created");
            res.status(201).json({ message: "New user created", data: newUser._id, success: true });
        }
        catch (error) {
            console.log("error creating user", error);
            res.status(201).json({ message: "Error creating user", success: false });
        }
    });
}
