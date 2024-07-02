import { Request, Response, NextFunction } from "express";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import orchestrator from "../orchestrator";
import { auth, uploadReturnMessage } from "../../utils/constants";
import { removeUserImageController } from "../../controllers/upload.controller";

jest.mock("firebase/storage");
jest.mock("firebase/auth");

describe("Delete File", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  const email = process.env.FIREBASE_EMAIL;
  const pass = process.env.FIREBASE_SENHA;
  const mockStorage = getStorage as jest.Mock;
  const mockRef = ref as jest.Mock;
  const mockSignIn = signInWithEmailAndPassword as jest.Mock;
  const mockDelete = deleteObject as jest.Mock;

  beforeEach(() => {
    req = {
      body: { fileName: "test.png", email: email },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();

    mockStorage.mockReturnValue({});
    mockRef.mockReturnValue({});
    mockSignIn.mockResolvedValue({});
    mockDelete.mockReturnValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(async () => {
    await orchestrator.waitForAllServices();
  });

  it("DELETE to upload/user/image should return 200", async () => {
    await removeUserImageController(req as Request, res as Response, next);

    expect(mockRef).toHaveBeenCalledWith(expect.any(Object), expect.any(String));
    expect(mockSignIn).toHaveBeenCalledWith(auth, email, pass);
    expect(mockDelete).toHaveBeenCalledWith(expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: uploadReturnMessage.delete });
  });

  it("DELETE to upload/user/image should not be able to delete with wrong auth data", async () => {
    req.body.email = "wrongemail@email.com";

    await removeUserImageController(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Dados de autenticação inválidos!" });
  });
});
