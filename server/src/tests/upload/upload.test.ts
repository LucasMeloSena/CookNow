import { Request, Response } from "express";
import { uploadUserImageController } from "../../controllers/upload.controller";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import orchestrator from "../orchestrator";
import { auth, uploadReturnMessage } from "../../utils/constants";

jest.mock("firebase/storage");
jest.mock("firebase/auth");

describe("Upload File", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  const email = process.env.FIREBASE_EMAIL;
  const pass = process.env.FIREBASE_SENHA;
  const mockStorage = getStorage as jest.Mock;
  const mockRef = ref as jest.Mock;
  const mockUpload = uploadBytesResumable as jest.Mock;
  const mockImage = getDownloadURL as jest.Mock;
  const mockSignIn = signInWithEmailAndPassword as jest.Mock;

  beforeEach(() => {
    req = {
      body: { email: email },
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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(async () => {
    await orchestrator.waitForAllServices();
  });

  it("POST to upload/user/image should return 201", async () => {
    await uploadUserImageController(req as Request, res as Response);

    // toHaveBeenCalledWith -> Asserção jest para verificar se a função mock realmente recebeu os parâmetros desejados!
    expect(mockRef).toHaveBeenCalledWith(expect.any(Object), expect.any(String));
    expect(mockSignIn).toHaveBeenCalledWith(auth, email, pass);
    expect(mockUpload).toHaveBeenCalledWith(expect.any(Object), expect.any(Buffer), expect.any(Object));
    expect(mockImage).toHaveBeenCalledWith(expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ image: "https://imagemvalida.com.br", message: uploadReturnMessage.upload });
  });

  it("POST to upload/user/image should not be able to upload file with wrong login data", async () => {
    req.body.email = "wrongemail@email.com";

    await uploadUserImageController(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Dados de autenticação inválidos!" });
  });
});
