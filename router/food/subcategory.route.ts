import express from 'express'
import { getSubController } from '../../controller/getSubCategory.controller'


const router = express.Router()

router.get('/subcategory/:category',getSubController)

export default router