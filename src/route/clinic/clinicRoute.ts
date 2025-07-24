import express, { Router } from "express";
import clinicController from "../../controller/clinic/clinicController";
import Middleware from "../../middleware/middleware";
import HandleError from "../../services/asyncErrorHnadler";
// import { multer, storage } from "./../../middleware/multerMiddleware";
import multer from "multer";
import { cloudinary,storage } from "../../services/cloudinaryConfig";
const uplaod = multer({ storage: storage });

const router: Router = express.Router();
console.log("institute route loaded");
router
  .route("/clinic")
  .post(
    HandleError(Middleware.isLoggedIn),
    uplaod.single("clinicImage"),
    HandleError(clinicController.createclinic),
    HandleError(clinicController.createDoctor),
    HandleError(clinicController.createPatient),
    HandleError(clinicController.createAppointment),
    HandleError(clinicController.createReport),
    HandleError(clinicController.createInventory),
    HandleError(clinicController.createBilling),
    HandleError(clinicController.createBillItems)
  );
console.log("institute route hit");

export default router;
