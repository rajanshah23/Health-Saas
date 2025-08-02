import express, { Router } from 'express'
import HandleError from '../../services/asyncErrorHnadler'
import doctorAuthController from '../../controller/doctor/doctorAuthController'
const router:Router=express.Router()

router.route('/doctor-login').post(HandleError(doctorAuthController.doctorLogin))

export default router
