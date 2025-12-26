import express from "express";
import mongoose from "mongoose";
import routes from "./routes/commonRouter.js"
import { connectDB } from "./db.js";

const app = express();

connectDB();

app.use(express.json());

app.use("/api", routes);

export default app;

