import express from "express";
import cors from "cors";
import signin from "./routes/signin.js";
import signupUser from "./routes/signupUser.js";
import dashboardAdmin from "./routes/dashboardAdmin.js";
import inserateCar from "./routes/inserateCar.js";
import cookieParser from "cookie-parser";
import authenticate from "./jwt/authenticate.js";
const app = express();
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.use(cookieParser());
app.use(express.json());
app.post("/signup", signupUser);
app.post("/signin", signin);
app.post('/admin/create', authenticate, dashboardAdmin);
app.get('/inseratecar', authenticate, inserateCar);
app.listen(3001, () => {
    console.log("Server started!");
});
