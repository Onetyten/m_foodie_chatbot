import express from 'express'
import { createNewUser } from '../controller/createUser.controller'

const router = express.Router()

router.get('/create',createNewUser)

export default router