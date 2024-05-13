import express from "express";
import { uploadUserImageController } from "src/controllers/upload.controller";
import { uploadPath } from "src/utils/constants";
import multer from "multer";

const uploadRoute = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

uploadRoute.post(uploadPath.uploadUserImage, upload.single("file"), uploadUserImageController);

export { uploadRoute };
