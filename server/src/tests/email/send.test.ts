import { Request, Response, NextFunction } from "express";
import { authCodeController } from "../../controllers/user.controller";
import { prisma } from "../../infra/database/database";
import { returnMessage } from "../../utils/constants";

jest.mock("nodemailer", () => {
  const sendMailMock = jest.fn().mockResolvedValue("Email sent");
  return {
    createTransport: jest.fn().mockReturnValue({
      sendMail: sendMailMock,
    }),
  };
});

describe("Send Email To Get Auth Code Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {
        email: "test@example.com",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("POST to /auth/pass should return 200", async () => {
    prisma.user.findUnique = jest.fn().mockResolvedValue({
      id: "1",
      nome: "Test User",
      email: "test@example.com",
      celular: "(31) 9 0000-0000",
      img_profile: "http://imagemvalida.com.br",
      senha: "$2a$10$zvid7iUWMLnzJgvXIePPjOSp/9ed1BlwdiR9LLIG0i/JfaiM/.1Da",
      dt_cadastro: new Date().toISOString(),
      dt_atualizacao: new Date().toISOString(),
    });

    await authCodeController(req as Request, res as Response, next);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'test@example.com' },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: returnMessage.email,
      code: expect.any(String),
      id: expect.any(String),
    });
  });

  it("POST to auth/pass should not be able to send an email with invalid user", async () => {
    prisma.user.findUnique = jest.fn().mockResolvedValue(null);

    await authCodeController(req as Request, res as Response, next);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'test@example.com' },
    });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Nenhuma conta com este email foi encontrada!",
    });
  })
});
