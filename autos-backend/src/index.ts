import express from "express";
import cors from "cors";

import registerAdmin from './routes/registerAdmin.js';
import registerUser from "./routes/registerUser.js";

const app = express();
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true
}));

app.use(express.json());

/**
 * Register process.
 */
app.post("/dashboard-register", registerAdmin);

app.post("/register", registerUser);


app.listen(3001, () => {
  console.log("Server started!");
});