import express from "express";
import { OrderController } from "../../controller/order.controller";

const router = express.Router()

router.post('/create',OrderController)

export default router