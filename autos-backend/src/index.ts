import express, { Response } from "express";
import cors from "cors";
import signin from "./routes/signin.js";
import signupUser from "./routes/signupUser.js";
import inserateCar from "./routes/inserateCar.js";
import cookieParser from "cookie-parser";
import writeBrand from "./routes/dashboard/insertBrand.js";
import writeModel from "./routes/dashboard/insertModel.js";
import fetchBrand from "./routes/dashboard/fetchBrand.js";
import fetchModel from "./routes/dashboard/fetchModel.js";
import { URLs } from './constants/URLs.js';
import multer from "multer";
import path, { dirname } from "path";
import fetchStaticData from "./routes/fetchStaticData.js";
import dynamicSearchCount from "./routes/fetchDynamicSearchCount.js";
import fs from 'fs'
import fetchInserateForPublish from "./routes/dashboard/fetchInserateForPublish.js";
import fetchDetailSearch from "./routes/fetchDetailSearch.js";
import fetchImageNames from "./routes/fetchImageNames.js";
import fetchBuendeslaender from "./routes/fetchBuendeslaender.js";
import postPublish from "./routes/dashboard/postPublish.js";
import emailCheck from "./routes/emailCheck.js";
import logout from "./routes/logout.js";
import { fetchListCars } from "./routes/fetchListCars.js";
import { fileURLToPath } from 'url';
import passport, { authMiddelware } from "./routes/middleware/passport.middleware.js";
import authenticationUser from "./routes/middleware/authenticationUser.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import session from 'express-session'
//import session = require('express-session');
import fetchImageName from "./routes/fetchImageName.js";
import inserateFinish from "./routes/inserateFinish.js";
import sharp from "sharp";
import { fetchClickedCars } from "./routes/fetchClickedCars.js";
import { connectToDatabase } from "./dbConnect1.js";
const MySQLStore = require('express-mysql-session')(session);

import dotenv from 'dotenv'
import { fetchCountClickedCars } from "./routes/fetchCountClickedCars.js";
dotenv.config();
const sessionSecret = process.env.SESSION_SECRET || "default-secret";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

declare module 'express-session' {
  interface SessionData {
    isAuth?: boolean;
    // Add other custom properties if needed
  }
}

const app = express();

const options = {
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.DATABASE,

  clearExpired: true,
  checkExpirationInterval: 1_000 * 60 * 10, 
  expiration: 1_000 * 60 * 60 * 4
}

const sessionStore = new MySQLStore(options);
app.use(session({
  secret: sessionSecret,
  
  store: sessionStore,
  resave: false,
  saveUninitialized: false

}));

sessionStore.onReady().then(() => {
	// MySQL session store ready for use.
	console.log('MySQLStore ready');
}).catch((error: unknown) => {
	// Something went wrong.
	//console.error(error);
});

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  credentials: true,
  origin: URLs.ORIGIN_CLIENT,
  methods: ['GET', 'POST', 'DELETE']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.post(URLs.POST_SIGINUP, signupUser);
app.post(URLs.POST_SIGINUP_EMAILCHECK, emailCheck);
app.post(URLs.POST_SIGNIN, passport.authenticate('local'), signin);

app.post(URLs.POST_INSERATE_CAR, authMiddelware, inserateCar);
app.get(URLs.POST_INSERATE_CAR, authMiddelware, inserateCar);

app.post(URLs.POST_INSERATE_FINISH, authMiddelware, inserateFinish);

app.get(URLs.FETCH_INSERATE_PUBLISH, authMiddelware, fetchInserateForPublish);

app.post(URLs.POST_INSERT_BRAND, authMiddelware, writeBrand);
app.get(URLs.FETCH_BRAND, fetchBrand); 
app.post(URLs.FETCH_MODEL, fetchModel);
app.get(URLs.FETCH_COUNT, dynamicSearchCount);
app.post(URLs.POST_INSERT_MODEL, authMiddelware, writeModel);
app.post(URLs.POST_PUBLISH, authMiddelware, postPublish);
app.get(URLs.SEARCH_DATAS, fetchStaticData);
app.get(URLs.FETCH_DETAIL_SEARCH + "/:id", fetchDetailSearch);
app.get(URLs.FETCH_BUNDESLAENDER, fetchBuendeslaender);
app.get(URLs.FETCH_IMAGENAMES + "/:id", fetchImageNames);
app.get(URLs.FETCH_IMAGENAME + "/:id", fetchImageName);

app.get(URLs.FETCH_LIST_CARS, fetchListCars);
app.post(URLs.FETCH_CLICKED_CARS, fetchClickedCars);
app.post(URLs.FETCH_CLICKED_CARS_COUNT, fetchCountClickedCars);

app.delete(URLs.LOGOUT, logout);
app.get(URLs.AUTHENTICATION_USER, authenticationUser);

const storage = multer.diskStorage({
  destination: function (req: express.Request, file, cb) {
    const carId = req.body.carId;
    const newUploadPath = `./uploads/${carId}`;
    
        fs.mkdir(newUploadPath, { recursive: true}, function(err) {
          if(err) {
            // TODO: 
            //console.log("Error", err);
          } else {
            cb(null, newUploadPath);
          }
        })
  },
  filename: function (req: express.Request, file, cb) {
    const insertId = req.body.carId;
    const imageName = file.originalname;
    
    
    cb(null, imageName);
  }
});
const upload = multer({ storage: storage });

app.post('/upload', upload.array('images', 20), (req, res) => {

  const files = req.files as Express.Multer.File[]
  const insertId = req.body.carId;
  

  if (!req.files || req.files.length === 0) {

    return res.status(400).json({ message: 'Keine Bilder gesendet.' });
  }

  async function processUpload(){

    const insertInto: string = "INSERT INTO imagename(imagename, inserate_id) VALUES(?, ?)"

    let connection = await connectToDatabase();

    try {
      connection.beginTransaction();

      const processedFiles = await Promise.all(files.map(async (file) => {
        const imageName = 'resized' + file.filename;
        const outputFilePath = path.join(file.destination, imageName);
  
        // Resize the image using sharp
        await sharp(file.path)
        // width height
          .resize(1920, 1080, { fit: 'cover' })
          .toFile(outputFilePath);
        
        await connection.execute(insertInto, [imageName, insertId]);
        fs.unlinkSync(file.path);
        return outputFilePath;
      }));

      connection.commit();
      connection.end();
      
      res.status(200).json({
        message: fileURLToPath.length > 1 ? "Bilder" : "Bild" + ' erfolgreich hochgeladen.',
        files: processedFiles
      });
    } catch (error) {
      connection.rollback();
      connection.end();
      res.status(500).json( { message: 'Biite versuchen Sie es erneut.'} );
    }
  };

  processUpload();

});

// send image 
app.get('/uploads/:id/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const encodedFileName = encodeURI(imageName);
  const id = req.params.id;
  res.sendFile(encodedFileName, { root: `./uploads/${id}` });
}); 

async function deleteImageDBAndFile(inserateId: string, imageName: string, res: Response) {
  
  const deleteQuery: string = "DELETE FROM imagename WHERE inserate_id = ? AND imagename = ?";
  const encodedFileName = encodeURI(imageName);
  const filePath = path.join(__dirname, `../uploads/${inserateId}`, encodedFileName);
  
  let message = 'Erfolgreich gelöscht';
  let status: number = 200;
  const connection = await connectToDatabase();
  try {
    // delete from database
    await connection.execute(deleteQuery, [inserateId, encodedFileName]);

    // delete from folder
  try {
    fs.unlinkSync(filePath);
    connection.commit();
  } catch(error) {
    message = 'Fehler beim Löschen.';
    status = 500;
    connection.rollback();
  }
  

  } catch(error: any) {
    connection.rollback();
    message = 'Fehler beim Löschen.';
    status = 500;
  } finally {
    connection.end();
    return res.status(status).json({ message });
  } 
}

// delete image
app.delete(URLs.DELETE_IMAGE+"/:inserateid/:imagename", authMiddelware, (req, res) => {
  const inserateId = req.params.inserateid;
  const imageName = 'resized' + req.params.imagename;
  
  deleteImageDBAndFile(inserateId, imageName, res);
})


app.listen(3001, () => {
  console.log("Server started!");
});