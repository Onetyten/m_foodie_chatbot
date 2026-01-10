import express from 'express'
import { validateUser } from '../controller/validateUser.controller'

const router = express.Router()

router.post('/validate',validateUser)

export default router