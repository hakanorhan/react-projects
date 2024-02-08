import express from "express";
import cors from "cors";
import signin from "./routes/signin.js";
import signupUser from "./routes/signupUser.js";
const app = express();

app.use(cors({
  origin:"http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.post("/signup", signupUser);

app.post("/signin", signin);

app.listen(3001, () => {
  console.log("Server started!");
});