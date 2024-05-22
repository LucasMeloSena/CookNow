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
  fileName: z.string().min(4, "O arquivo é inválido!"),
});
export type File = z.infer<typeof createFileSchema>;

export const createAuthSchema = z.object({
  email: z.string().min(20, "Email de autenticação inválido!"),
});
export type Auth = z.infer<typeof createAuthSchema>;

export const createFileUpdateSchema = z.object({
  oldFileName: z.string().min(4, "O arquivo é inválido!"),
  fileName: z.string().min(4, "O arquivo é inválido!"),
  email: z.string().min(20, "Email de autenticação inválido!"),
})
export type UpdateFile = z.infer<typeof createFileUpdateSchema>;