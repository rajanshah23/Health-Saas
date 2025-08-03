import express, { Router } from 'express'
import HandleError from '../../services/asyncErrorHnadler'
import patientAuthController from '../../controller/patient/patientuthController'
 
const router:Router=express.Router()

router.route('/patient-login').post(HandleError(patientAuthController.patientLogin))

export default router