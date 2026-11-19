import { FileController } from "../controller/file.controller";

const fileController: FileController = new FileController();

export const container = {
  controller: {
    fileController,
  },
};
