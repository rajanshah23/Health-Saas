import express from "express";
const app = express();
import authRoute from "./route/globals/auth/authRoute";
import clinicRoute from "./route/clinic/clinicRoute";
import doctorRoute from "./route/doctor/doctorRoute"
import patientRoute from './route/patient/patientRoute'
import appointmentRoute from './route/appointment/appointmentRoute'
import reportRoute from  './route/report/reportRoute'
import smsRoute from "./route/SMS/smsRoute";
import doctorLoginRoute from './route/doctors/doctorLoginRoute'
import patientLoginRoute from './route/patients/patientLoginRoute'
import billingRoute from './route/billing/billingRoute'
import inventoryRoute from './route/inventory/inventoryRoute'
app.use(express.json());

//Global Route
app.use("/api", authRoute);

//Clinic Route
app.use("/api", clinicRoute);
app.use("/api",doctorRoute)
app.use('/api',patientRoute)
app.use('/api',appointmentRoute)
app.use('/api',reportRoute)
app.use('/api',billingRoute)
app.use('/api',inventoryRoute)

//SMS Route
app.use('/api', smsRoute);


//Doctor Login
app.use('/api',doctorLoginRoute)

//patient Login
app.use('/api',patientLoginRoute)


export default app;
