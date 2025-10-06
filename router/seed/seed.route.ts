import express from 'express'
import { seedDataController } from '../../controller/seed.controller'

const router = express.Router()
router.post('/seed',seedDataController)

export default router