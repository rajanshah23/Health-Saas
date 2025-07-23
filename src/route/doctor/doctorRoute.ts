import express, { Router } from "express";
import Middleware from "../../middleware/middleware";
import HandleError from "../../services/asyncErrorHnadler";
import doctorController from "../../controller/doctor/doctorController";
const router: Router = express.Router();

router
  .route("/doctor")
  .post(Middleware.isLoggedIn, HandleError(doctorController.createDoctor))
  .get(HandleError(doctorController.getAllDoctor));

router
  .route("/doctor/:id")
  .get(Middleware.isLoggedIn, HandleError(doctorController.getSingleDoctor))
  .delete(Middleware.isLoggedIn, HandleError(doctorController.deleteDoctor))
  .patch(Middleware.isLoggedIn, HandleError(doctorController.updateDoctor));

export default router;
