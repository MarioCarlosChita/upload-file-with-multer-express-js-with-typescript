import path from "path";
import fs from "fs";
import { StorageEngine } from "multer";
import multer, { MulterError } from "multer";
import { InvalidFileTypeError } from "../errors/invalid-file-type.error";

export class FileUploadService {
  static  UPLOAD_DIR: string = path.resolve("uploads");
  static  MAX_FILE_SIZE: number = 5 * 1024 * 1024;
  static  ALLOWED_TYPES: Array<string> = ["image/jpeg", "image/png"];

  

  static  upload(): multer.Multer {
    const storage = multer.diskStorage({
      destination: (_req, _file, cb) => cb(null, FileUploadService.UPLOAD_DIR),
      filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const random = Math.round(Math.random() * 1e6);
        cb(null, `${timestamp}-${random}${ext}`);
      },
    });

    return multer({
      storage,
      limits: { fileSize: FileUploadService.MAX_FILE_SIZE, files: 1 },
      fileFilter: (_req, file, cb) => {
        if (!FileUploadService.ALLOWED_TYPES.includes(file.mimetype)) {
          return cb(new InvalidFileTypeError());
        }
        cb(null, true);
      },
    });
  }
}
