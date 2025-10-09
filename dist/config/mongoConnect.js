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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
    throw new Error("No Mongodb connection string found, please add one to the env file");
}
let cachedConnnection = globalThis.mongoose;
if (!cachedConnnection) {
    cachedConnnection = globalThis.mongoose = { conn: null, promise: null };
}
function mongoConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (cachedConnnection.conn) {
            console.log("Found cached connection");
            return cachedConnnection.conn;
        }
        if (!cachedConnnection.promise) {
            const opts = {
                bufferCommands: false
            };
            cachedConnnection.promise = mongoose_1.default.connect(mongoUrl, opts).then((mongoose) => {
                return mongoose;
            });
        }
        cachedConnnection.conn = yield cachedConnnection.promise;
        return cachedConnnection.conn;
    });
}
exports.default = mongoConnect;
