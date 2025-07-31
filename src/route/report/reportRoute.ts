import express, { Router } from 'express'
import Middleware from '../../middleware/middleware'
import HandleError from '../../services/asyncErrorHnadler'
import reportController from '../../controller/report/reportController'
import upload from '../../middleware/multerUpload'

const router: Router = express.Router()

router.route('/reports').post(Middleware.isLoggedIn,upload.single("reportFile"),HandleError(reportController.createReport)).get(Middleware.isLoggedIn, HandleError(reportController.getAllReports))

router.route('/reports/:id').get(Middleware.isLoggedIn, HandleError(reportController.getSingleReport)).patch(Middleware.isLoggedIn, HandleError(reportController.updateReport)).delete(Middleware.isLoggedIn, HandleError(reportController.deleteReport))
export default router