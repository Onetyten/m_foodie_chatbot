import express from 'express'
import { AddToCart } from '../../controller/addToCart.controller'

const router = express.Router()

router.post('/cart/add',AddToCart)

export default router