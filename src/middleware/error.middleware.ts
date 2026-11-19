import { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";
import { InvalidFileTypeError } from "../errors/invalid-file-type.error";

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(413)
        .json({ message: "File too large. Maximum size is 5MB" });
    }
    return res.status(400).json({ message: err.message });
  }

  if (err instanceof InvalidFileTypeError) {
    return res.status(415).json({
      message: "Unsupported file type. Allowed: JPEG, PNG",
    });
  }

  next(err);
};
