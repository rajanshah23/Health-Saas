import express, { Router }  from "express";
import doctorController from "../../controller/doctor/doctorController";
import Middleware from "../../middleware/middleware";
const router:Router= express.Router()

router.route('/doctor').post(Middleware.isLoggedIn ,doctorController.createDoctor)




export default router