import express from "express";
import routes from "./routes/index.js";
import connectDatabase from "./config/dbconnect.js";

await connectDatabase();

const app = express();
routes(app);

export default app;
