export type Upload = {
  file: Express.Multer.File | undefined;
  fileName: string | undefined;
  metadata: {
    contentType: string | undefined;
  };
  buffer: Buffer | undefined;
};
