import express from 'express'
import { deleteCart } from '../../controller/deleteCart.controller'

const router = express.Router()

router.delete('/cart/delete/:id',deleteCart)

export default router