import express from 'express'
import { fetchOrderController } from '../../controller/fetchOrders.controller'

const router = express.Router()

router.post('/fetch',fetchOrderController)

export default router