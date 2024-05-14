import { Request, Response, NextFunction } from "express";
import { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { File, Upload, createFileSchema } from "src/interfaces/upload.interface";
import { validarUploadArquivo } from "src/utils/validator";
import { z } from "zod";
import { auth } from "src/utils/constants";
import { FirebaseError } from "firebase/app";
const dotenv = require("dotenv");
dotenv.config();

export const uploadUserImageController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const storage = getStorage();
    const upload: Upload = {
      file: req.file,
      fileName: req.file?.originalname,
      metadata: {
        contentType: req.file?.mimetype,
      },
      buffer: req.file?.buffer,
    };
    validarUploadArquivo(upload);

    const authFields = {
      email: process.env.FIREBASE_EMAIL,
      senha: process.env.FIREBASE_SENHA,
    };
    await signInWithEmailAndPassword(auth, authFields.email!, authFields.senha!);

    const storageRef = ref(storage, `users/${upload.fileName}`);
    await uploadBytesResumable(storageRef, upload.buffer!, upload.metadata);
    const image: string = await getDownloadURL(storageRef);

    res.status(201).json({ image: image });
  } catch (err) {
    const errMessage: string = (err as Error).message ?? "Ocorreu um erro ao tentar cadastrar o usuário! Por favor, tente novamente mais tarde!";

    if (err instanceof z.ZodError) {
      res.status(500).json({ message: err.issues[0].message });
      return;
    }

    res.status(500).json({
      message: errMessage,
    });
  }
};

export const removeUserImageController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file: File = createFileSchema.parse(req.body);

    const storage = getStorage();
    const storageRef = ref(storage, `users/${file.fileName}`);
    const authFields = {
      email: process.env.FIREBASE_EMAIL,
      senha: process.env.FIREBASE_SENHA,
    };
    await signInWithEmailAndPassword(auth, authFields.email!, authFields.senha!);

    await deleteObject(storageRef);
    res.status(200).json({ message: "Imagem excluída com sucesso!" });
  }
  catch (err) {
    const errMessage: string = (err as Error).message ?? "Ocorreu um erro ao tentar cadastrar o usuário! Por favor, tente novamente mais tarde!";

    if (err instanceof z.ZodError) {
      res.status(500).json({ message: err.issues[0].message });
      return;
    }
    if (err instanceof FirebaseError) {
      res.status(500).json({ message: "Arquivo não encontrado!" });
      return;
    }

    res.status(500).json({
      message: errMessage,
    });
  }
}