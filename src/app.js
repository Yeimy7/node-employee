import cors from "cors";
import express from "express";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import userRoutes from "./routes/user.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import { verifyTables } from "./utils/initialSetup.js";

const app = express();

app.disable("x-powered-by");
app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/user", userRoutes);
app.use("/api/department", departmentRoutes);

verifyTables();

export default app;
