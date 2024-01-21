import express from "express";
import morgan from "morgan";

import employeeRoutes from "./routes/employee.routes.js";
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json("welcome");
});

app.use("/api/employee", employeeRoutes);
export default app;
