import express from "express";
import cors from "cors";
import signin from "./routes/signin.js";
import signupUser from "./routes/signupUser.js";
import inserateCar from "./routes/inserateCar.js";
import cookieParser from "cookie-parser";
import fastSearchAllData from "./routes/fastSearchAllData.js";
import checkAuth from "./routes/chechAuth.js";
const app = express();
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.use(cookieParser());
app.use(express.json());
app.post("/signup", signupUser);
app.post("/signin", signin);
app.get('/inseratecar', inserateCar);
app.all('/fastsearchfirst', fastSearchAllData);
app.get('/api/checkauth', checkAuth);
app.listen(3001, () => {
    console.log("Server started!");
});
