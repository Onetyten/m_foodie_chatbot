import express from 'express'
import { getFoodCustomisations } from '../../controller/getCustomisations.controller'
const router = express.Router()

router.post('/custom/fetch',getFoodCustomisations)

export default router