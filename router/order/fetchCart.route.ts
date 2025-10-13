import express from 'express'
import { getCartList } from '../../controller/getCartList.controller'

const router = express.Router()

router.get('/cart/fetch',getCartList)

export default router