import express from 'express'
import {signup , login , viewUser} from './userController.js'

const router = express.Router()
//router
router.post('/post', signup);
router.post('/Login', login);
router.get('/view/user', viewUser )

export default router