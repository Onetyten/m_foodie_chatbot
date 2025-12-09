import express from "express";
import { verifyPaymentController } from "../../controller/verifyPayment.controller";
const router = express.Router()

router.post('/verify',verifyPaymentController)

export default router