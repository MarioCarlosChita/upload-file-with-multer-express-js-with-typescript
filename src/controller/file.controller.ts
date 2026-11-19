import { Request, Response } from "express";
export class FileController {
  public upload = async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    return res.status(201).json({
      message: "File uploaded successfully",
      file: {
        name: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimeType: req.file.mimetype,
        url: `${baseUrl}/uploads/${req.file.filename}`,
      },
    });
  };
}
