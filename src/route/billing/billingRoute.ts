 import express, { Router } from "express";
import Middleware from "../../middleware/middleware";
import HandleError from "../../services/asyncErrorHnadler";
import billingController from "../../controller/Health/billing/billingController";

const router: Router = express.Router()

router.route('/billing').post(Middleware.isLoggedIn, HandleError(billingController.createBill)).get(Middleware.isLoggedIn, HandleError(billingController.getAllBill))


router.route('/billing/:id').get(Middleware.isLoggedIn, HandleError(billingController.getSingleBill)).patch(Middleware.isLoggedIn, HandleError(billingController.updateBill)).delete(Middleware.isLoggedIn, HandleError(billingController.deleteBill))



export default router