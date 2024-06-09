import { Request, Response, NextFunction } from "express";
import { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth, File, UpdateFile, Upload, createAuthSchema, createFileSchema, createFileUpdateSchema } from "../interfaces/upload.interface";
import { validarUploadArquivo } from "../utils/validator";
import { z } from "zod";
import { auth } from "../utils/constants";
import { FirebaseError } from "firebase/app";
const dotenv = require("dotenv");
dotenv.config();

export const uploadUserImageController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authInfo: Auth = createAuthSchema.parse(req.body);

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
      email: authInfo.email,
      senha: process.env.FIREBASE_SENHA,
    };
    await signInWithEmailAndPassword(auth, authFields.email, authFields.senha!);

    const storageRef = ref(storage, `users/${upload.fileName}`);
    await uploadBytesResumable(storageRef, upload.buffer!, upload.metadata);
    const image: string = await getDownloadURL(storageRef);

    res.status(201).json({ image: image });
  } catch (err) {
    const errMessage: string = (err as Error).message ?? "Ocorreu um erro ao tentar fazer o upload da imagem! Por favor, tente novamente mais tarde!";

    if (err instanceof z.ZodError) {
      let errMsg: string = err.issues[0].message;
      if (errMsg == "Required") {
        errMsg = "Dados ausentes ou inválidos!";
      }
      return res.status(500).json({ message: errMsg });
    }
    if (err instanceof FirebaseError) {
      return res.status(500).json({ message: "Dados de autenticação inválidos!" });
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
  } catch (err) {
    const errMessage: string = (err as Error).message ?? "Ocorreu um erro ao tentar remover a imagem! Por favor, tente novamente mais tarde!";

    if (err instanceof z.ZodError) {
      let errMsg: string = err.issues[0].message;
      if (errMsg == "Required") {
        errMsg = "Dados ausentes ou inválidos!";
      }
      return res.status(500).json({ message: errMsg });
    }
    if (err instanceof FirebaseError) {
      return res.status(500).json({ message: "Arquivo não encontrado!" });
    }

    res.status(500).json({
      message: errMessage,
    });
  }
};

export const updateUserImageController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authInfo: Auth = createAuthSchema.parse(req.body);
    const oldFile: UpdateFile = createFileUpdateSchema.parse(req.body);

    const storage = getStorage();
    const storageRef = ref(storage, oldFile.oldFileName);

    const authFields = {
      email: authInfo.email,
      senha: process.env.FIREBASE_SENHA,
    };
    await signInWithEmailAndPassword(auth, authFields.email!, authFields.senha!);
    await deleteObject(storageRef);

    const upload: Upload = {
      file: req.file,
      fileName: req.file?.originalname,
      metadata: {
        contentType: req.file?.mimetype,
      },
      buffer: req.file?.buffer,
    };
    validarUploadArquivo(upload);

    const newStorageRef = ref(storage, `users/${upload.fileName}`);
    await uploadBytesResumable(newStorageRef, upload.buffer!, upload.metadata);
    const image: string = await getDownloadURL(newStorageRef);

    res.status(200).json({ message: "Imagem atualizada com sucesso!", image: image });
  } catch (err) {
    const errMessage: string = (err as Error).message ?? "Ocorreu um erro ao tentar atualizar a imagem! Por favor, tente novamente mais tarde!";

    if (err instanceof z.ZodError) {
      let errMsg: string = err.issues[0].message;
      if (errMsg == "Required") {
        errMsg = "Dados ausentes ou inválidos!";
      }
      return res.status(500).json({ message: errMsg });
    }
    if (err instanceof FirebaseError) {
      return res.status(500).json({ message: "Arquivo não encontrado!" });
    }

    res.status(500).json({
      message: errMessage,
    });
  }
};
