import { Request, Response } from "express";
import { updateUserImageController, uploadUserImageController } from "../../controllers/upload.controller";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import orchestrator from "../orchestrator";
import { auth, uploadReturnMessage } from "../../utils/constants";

jest.mock("firebase/storage");
jest.mock("firebase/auth");

describe("Update File", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  const email = process.env.FIREBASE_EMAIL;
  const pass = process.env.FIREBASE_SENHA;
  const mockStorage = getStorage as jest.Mock;
  const mockRef = ref as jest.Mock;
  const mockUpload = uploadBytesResumable as jest.Mock;
  const mockImage = getDownloadURL as jest.Mock;
  const mockSignIn = signInWithEmailAndPassword as jest.Mock;
  const mockDelete = deleteObject as jest.Mock;

  beforeEach(() => {
    req = {
      body: { email: email, oldFileName: "test.png" },
      file: {
        originalname: "test.png",
        mimetype: "image/png",
        buffer: Buffer.from("test"),
        fieldname: "test",
        filename: "file",
        encoding: "7bit",
        size: 1234,
        stream: jest.fn() as never,
        destination: "test",
        path: "./test.png",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockStorage.mockReturnValue({});
    mockRef.mockReturnValue({});
    mockUpload.mockResolvedValue({});
    mockImage.mockReturnValue("https://imagemvalida.com.br");
    mockSignIn.mockResolvedValue({});
    mockDelete.mockReturnValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(async () => {
    await orchestrator.waitForAllServices();
  });

  it("POST to upload/update/user/image should return 200", async () => {
    await updateUserImageController(req as Request, res as Response);

    expect(mockRef).toHaveBeenCalledWith(expect.any(Object), expect.any(String));
    expect(mockSignIn).toHaveBeenCalledWith(auth, email, pass);
    expect(mockDelete).toHaveBeenCalledWith(expect.any(Object));
    expect(mockUpload).toHaveBeenCalledWith(expect.any(Object), expect.any(Buffer), expect.any(Object));
    expect(mockImage).toHaveBeenCalledWith(expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ image: "https://imagemvalida.com.br", message: uploadReturnMessage.update });
  });

  it("POST to upload/update/user/image should not be able to upload file with wrong login data", async () => {
    req.body.email = "wrongemail@email.com";

    await uploadUserImageController(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Dados de autenticação inválidos!" });
  });
});
