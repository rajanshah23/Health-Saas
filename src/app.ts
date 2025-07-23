import express from "express";
const app = express();
import authRoute from "./route/globals/auth/authRoute";
import clinicRoute from "./route/clinic/clinicRoute";
import doctorRoute from "./route/doctor/doctorRoute"


app.use(express.json());
app.use("/api", authRoute);
app.use("/api", clinicRoute);
app.use("/api",doctorRoute)
export default app;
