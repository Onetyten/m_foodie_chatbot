import express from "express"
import deleteOrderController from "../../controller/deleteOrder.controller"
const router = express.Router()

router.delete('/delete/:id',deleteOrderController)

export default router