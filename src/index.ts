import { json } from "body-parser";
import express, { Request, Response, NextFunction } from "express";
import fs from "fs";
import { FileUploadService } from "./services/file-upload.service";
import { container } from "./container/container";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(json());

fs.mkdirSync(FileUploadService.UPLOAD_DIR, { recursive: true });

app.use(
  "/uploads",
  (_req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static(FileUploadService.UPLOAD_DIR),
);

app.post(
  "/api/v1/upload",
  FileUploadService.upload().single("file"),
  container.controller.fileController.upload,
);

// Handles multer errors (must be registered after the routes)
app.use(errorMiddleware);

export default app;
