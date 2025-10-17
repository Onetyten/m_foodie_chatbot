import express from 'express'
import { verifyPaymentController } from '../../../controller/webhooks/verify.controller'

const router = express.Router()

router.post('/webhook/verify',verifyPaymentController)

export default router