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
app.use(express.json());

//Global Route
app.use("/api", authRoute);

//Clinic Route
app.use("/api", clinicRoute);
app.use("/api",doctorRoute)
app.use('/api',patientRoute)
app.use('/api',appointmentRoute)
app.use('/api',reportRoute)

//SMS Route
app.use('/api', smsRoute);


//Doctor Login
app.use('/api',doctorLoginRoute)




export default app;
