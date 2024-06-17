import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config({path:"./config.env"});
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
import createHttpError from "http-errors";
import routes from "./routes/index.js";


//morgan
  app.use(morgan("dev"));
  //cross-env was used to actually run you env.mode !=DEVLOPMENT isko set krke hr device me eun krne  k lie
  
  //helmet
  app.use(helmet());
  
  //parse json request url
  app.use(express.json());
  
  //parse json request body
  app.use(express.urlencoded({ extended: true }));
  
  //sanitize request data
  app.use(mongoSanitize());
  
  //enable cookie parser
  app.use(cookieParser());


  //gzip compression
app.use(compression());

//file upload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//cors
app.use(cors());



//accessing routes for version 1 used this version concept as its a good practice
app.use("/api/v1", routes);

// HTTP error handling
app.use(async (req, res, next) => {
    next(createHttpError.NotFound("This route does not exist."));
  });
  
  // it will show the status error status and message
  app.use(async (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message,
      },
    });
  });

export default app;