import express from "express";
const app = express();
import authRoute from "./route/globals/auth/authRoute";
import clinicRoute from "./route/clinic/clinicRoute";



app.use(express.json());
app.use("/api", authRoute);
app.use("/api", clinicRoute);

export default app;
