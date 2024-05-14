import { fileTypes } from "src/utils/constants";
import { z } from "zod";

export type Upload = {
  file: Express.Multer.File | undefined;
  fileName: string | undefined;
  metadata: {
    contentType: string | undefined;
  };
  buffer: Buffer | undefined;
};

export const createFileSchema = z.object({
  'fileName': z.string().min(4, "O arquivo é inválido!")
})

export type File = z.infer<typeof createFileSchema>