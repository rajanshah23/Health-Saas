import express from "express";
const app = express();
import authRoute from "./route/globals/auth/authRoute";
import clinicRoute from "./route/clinic/clinicRoute";
import doctorRoute from "./route/doctor/doctorRoute"
import patientRoute from './route/patient/patientRoute'
import appointmentRoute from './route/appointment/appointmentRoute'
import reportRoute from  './route/report/reportRoute'

app.use(express.json());
app.use("/api", authRoute);
app.use("/api", clinicRoute);
app.use("/api",doctorRoute)
app.use('/api',patientRoute)
app.use('/api',appointmentRoute)
app.use('/api',reportRoute)
export default app;
