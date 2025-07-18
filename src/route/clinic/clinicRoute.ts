import express, { Router }  from "express";
import clinicController from "../../controller/clinic/clinicController";
import Middleware from "../../middleware/middleware";
 
const router:Router= express.Router()
console.log("institute route loaded");
router.route('/clinic').post(Middleware.isLoggedIn ,clinicController.createclinic,clinicController.createDoctor,clinicController.createPatient,clinicController.createAppointment,clinicController.createReport,clinicController.createInventory,clinicController.createBilling,clinicController.createBillItems)
console.log("institute route hit");




export default router