import express from "express";
import cors from "cors";
import signin from "./routes/signin.js";
import signupUser from "./routes/signupUser.js";
import inserateCar from "./routes/inserateCar.js";
import cookieParser from "cookie-parser";
import fastSearchAllData from "./routes/fastSearchAllData.js";
import checkAuth from "./routes/checkAuth.js";
import writeBrand from "./routes/dashboard/writeBrand.js";
import writeModel from "./routes/dashboard/writeModel.js";
import fetchBrand from "./routes/dashboard/fetchBrand.js";
import { URLs } from './enums/URLs.js';
import authenticate from "./jwt/authenticate.js";
const app = express();
app.use(cors({
    credentials: true,
    origin: URLs.ORIGIN_CLIENT,
    methods: ['GET', 'POST']
}));
app.use(express.json());
app.use(cookieParser());
app.post(URLs.POST_SIGINUP, signupUser);
app.post(URLs.POST_SIGNIN, signin);
app.get(URLs.POST_INSERATE_CAR, authenticate, inserateCar);
app.all(URLs.ALL_FAST_SEARCH_FIRST, fastSearchAllData);
app.get(URLs.GET_CHECK_AUTH, checkAuth);
app.post(URLs.POST_WRITE_BRAND, authenticate, writeBrand);
app.get(URLs.FETCH_BRAND, authenticate, fetchBrand);
app.post('/write/model', authenticate, writeModel);
app.listen(3001, () => {
    console.log("Server started!");
});
