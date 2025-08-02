import express, { application, Router } from 'express'
import Middleware from '../../middleware/middleware'
import HandleError from '../../services/asyncErrorHnadler'
import appointmentController from '../../controller/Health/appointment/appointmentController'
 
const router:Router=express.Router()

router.route('/appointment').post(Middleware.isLoggedIn,HandleError(appointmentController.createAppointment)).get(Middleware.isLoggedIn,HandleError(appointmentController.getAppointment))

router.route('/appointment/:id').patch(Middleware.isLoggedIn,HandleError(appointmentController.updateAppointment)).delete(Middleware.isLoggedIn,HandleError(appointmentController.deleteAppointment))

export default router