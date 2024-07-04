import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config({path:"./.env"});
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
import createHttpError from "http-errors";
import routes from "./routes/index.js";


  app.use(morgan("dev"));
  //cross-env was used to actually run you env.mode !=DEVLOPMENT isko set krke hr device me eun krne  k lie
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(mongoSanitize());
  app.use(cookieParser());
app.use(compression());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(cors());



//accessing routes for version 1 used this version concept as its a good practice
app.use("/api/v1", routes);

// HTTP error handling
app.use(async (req, res, next) => {
    next(createHttpError.NotFound("This route does not exist."));
  });
  
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