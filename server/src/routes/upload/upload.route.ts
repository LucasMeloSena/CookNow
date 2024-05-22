import express from "express";
import { removeUserImageController, updateUserImageController, uploadUserImageController } from "../../controllers/upload.controller";
import { uploadPath } from "../../utils/constants";
import multer from "multer";

const uploadRoute = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

uploadRoute.post(uploadPath.uploadUserImage, upload.single("file"), uploadUserImageController);
uploadRoute.delete(uploadPath.removeUserImage, removeUserImageController);
uploadRoute.post(uploadPath.updateUserImage, upload.single("file"), updateUserImageController)

export { uploadRoute };
