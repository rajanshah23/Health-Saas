import express, { Router } from 'express'
import Middleware from '../../middleware/middleware';
import HandleError from '../../services/asyncErrorHnadler';
import patientController from '../../controller/Health/patient/patientController';
// import { multer, storage } from "./../../middleware/multerMiddleware";
import multer from "multer";
import { cloudinary,storage } from "../../services/cloudinaryConfig";
const uplaod = multer({ storage: storage });
const router:Router=express.Router()


router
  .route("/patient")
  .post(Middleware.isLoggedIn, uplaod.single("patientImage"), HandleError(patientController.createPatient))
  .get(HandleError(patientController.getAllPatient));

router
  .route("/patient/:id")
  .get(Middleware.isLoggedIn, HandleError(patientController.getSinglePatient))
  .delete(Middleware.isLoggedIn, HandleError(patientController.deletePatient))
  .patch(Middleware.isLoggedIn, HandleError(patientController.updatePatient));




export default  router