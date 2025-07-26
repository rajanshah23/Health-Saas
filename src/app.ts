import express from "express";
const app = express();
import authRoute from "./route/globals/auth/authRoute";
import clinicRoute from "./route/clinic/clinicRoute";
import doctorRoute from "./route/doctor/doctorRoute"
import patientRoute from './route/patient/patientRoute'

app.use(express.json());
app.use("/api", authRoute);
app.use("/api", clinicRoute);
app.use("/api",doctorRoute)
app.use('/api',patientRoute)
export default app;
