import express from 'express'
import { foodListController } from '../../controller/foodList.controller'
const router = express.Router()

router.get('/list/:id',foodListController)

export default router