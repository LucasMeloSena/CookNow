import express from "express";
import { removeUserImageController, uploadUserImageController } from "../../controllers/upload.controller";
import { uploadPath } from "../../utils/constants";
import multer from "multer";

const uploadRoute = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

uploadRoute.post(uploadPath.uploadUserImage, upload.single("file"), uploadUserImageController);
uploadRoute.delete(uploadPath.removeUserImage, removeUserImageController);

export { uploadRoute };
