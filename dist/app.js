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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const mongoConnect_1 = __importDefault(require("./config/mongoConnect"));
const seed_route_1 = __importDefault(require("./router/seed/seed.route"));
const createUser_route_1 = __importDefault(require("./router/createUser.route"));
const subcategory_route_1 = __importDefault(require("./router/food/subcategory.route"));
const list_route_1 = __importDefault(require("./router/food/list.route"));
const getCustomisation_route_1 = __importDefault(require("./router/food/getCustomisation.route"));
const addCart_route_1 = __importDefault(require("./router/order/addCart.route"));
const fetchCart_route_1 = __importDefault(require("./router/order/fetchCart.route"));
const deleteCart_route_1 = __importDefault(require("./router/order/deleteCart.route"));
const createorder_route_1 = __importDefault(require("./router/order/createorder.route"));
const verify_route_1 = __importDefault(require("./router/order/webhook/verify.route"));
const fetchOrder_route_1 = __importDefault(require("./router/order/fetchOrder.route"));
const authorization_1 = require("./middleware/authorization");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const environment = process.env.ENVIRONMENT;
const rootDir = environment != "dev" ? path_1.default.join(__dirname, "..") : __dirname;
app.use(express_1.default.static(path_1.default.join(rootDir, "client", "dist")));
const port = process.env.PORT;
if (!port)
    throw new Error('add a PORT variable to the env file');
app.get('/hello', (req, res) => {
    res.json({ message: "hello" });
});
app.use('/data', seed_route_1.default);
app.use('/user', createUser_route_1.default);
app.use('/food', subcategory_route_1.default);
app.use('/food', list_route_1.default);
app.use('/food', getCustomisation_route_1.default);
app.use('/order', authorization_1.Authorization);
app.use('/order', addCart_route_1.default);
app.use('/order', fetchCart_route_1.default);
app.use('/order', deleteCart_route_1.default);
app.use('/order', createorder_route_1.default);
app.use('/order', verify_route_1.default);
app.use('/order', fetchOrder_route_1.default);
app.get(/.*/, (req, res) => {
    res.sendFile(path_1.default.join(rootDir, "client", "dist", "index.html"));
});
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Connecting to db");
            yield (0, mongoConnect_1.default)();
            console.log("Connected to db");
            app.listen(port, (error) => {
                if (!error) {
                    console.log(`MoriCafe running on port ${port}`);
                }
                else {
                    console.log(`MoriCafe has run into an error: ${error}`);
                }
            });
        }
        catch (error) {
            console.log(`Failed to connect to server: ${error}`);
        }
    });
}
startServer();
