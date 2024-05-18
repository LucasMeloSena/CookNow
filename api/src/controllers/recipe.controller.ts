import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response, NextFunction } from "express";
import { prisma } from "src/infra/database";

export const getRecipesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const receitas = await prisma.receita.findMany({
      include: {
        modo_preparo: {
          select: {
            nome: true,
          },
        },
        categoria: {
          select: {
            nome: true,
          },
        },
        ingredientes: {
          include: {
            ingrediente: {
              select: {
                nome: true,
              },
            },
          },
        },
      },
    });

    const formattedReceitas = receitas?.map((receita) => ({
      ...receita,
      categoria: receita.categoria?.nome,
      modo_preparo: receita.modo_preparo.map((m) => m.nome),
      ingredientes: receita.ingredientes.map((i) => i.ingrediente.nome),
    }));

    return res.status(200).json({ recipes: formattedReceitas });
  } catch (err) {
    res.status(500).json({ message: "Ocorreu um erro ao buscar as receitas! Por favor, tente novamente mais tarde!" });
  } finally {
    prisma.$disconnect;
  }
};

export const getRecipeByIdController = async (req: Request, res: Response, next: NextFunction) => {};

export const createRecipeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.receita.create({
      data: {
        nome: "Torta de Limão",
        url_image: "https://firebasestorage.googleapis.com/v0/b/cooknow-cdaf5.appspot.com/o/recipes%2Ftorta_limao.webp?alt=media&token=ceeb842c-2597-49ab-bfbb-eb4279f5221d",
        tempo_medio: 25,
        custo: 2,
        dificuldade: 1,
        localizacao: "Estados Unidos",
        avaliacao: 4.6,
        dt_cadastro: new Date().toISOString(),
        dt_atualizacao: new Date().toISOString(),
      },
    });

    await prisma.categoria.create({
      data: {
        nome: "Doce",
        receitaId: 4,
      },
    });

    await prisma.ingrediente.createMany({
      data: [
        {
          nome: "200 g de biscoito de maisena",
        },
        {
          nome: "150g de margarina",
        },
        {
          nome: "1 lata de leite condensado (395 g)",
        },
        {
          nome: "1 caixa de creme de leite (200 g)",
        },
        {
          nome: "Suco de 4 limões",
        },
        {
          nome: "Raspas de 2 limões",
        },
        {
          nome: "3 ou 4 claras de ovo",
        },
        {
          nome: "3 colheres (sopa) de açúcar",
        },
      ],
    });

    await prisma.receita_ingrediente.createMany({
      data: [
        { ingredienteId: 13, receitaId: 4 },
        { ingredienteId: 14, receitaId: 4 },
        { ingredienteId: 15, receitaId: 4 },
        { ingredienteId: 16, receitaId: 4 },
        { ingredienteId: 17, receitaId: 4 },
        { ingredienteId: 18, receitaId: 4 },
        { ingredienteId: 19, receitaId: 4 },
        { ingredienteId: 20, receitaId: 4 },
      ],
    });

    await prisma.modo_preparo.createMany({
      data: [
        { nome: "Triture o biscoito de maisena em um liquidificador ou processador.", receitaId: 4 },
        { nome: "Junte a margarina e bata mais um pouco.", receitaId: 4 },
        { nome: "Despeje a massa em uma forma de fundo removível (27 cm de diâmetro).", receitaId: 4 },
        { nome: "Com as mãos, espalhe os biscoitos triturados no fundo e nas laterais da forma, cobrindo toda área de maneira uniforme.", receitaId: 4 },
        { nome: "Leve ao forno médio (180° C), preaquecido, por aproximadamente 10 minutos.", receitaId: 4 },
        { nome: "Bata todos os ingredientes no liquidificador (exceto as raspas de limão) até obter um creme liso e firme.", receitaId: 4 },
        { nome: "Recheie a massa já assada e leve à geladeira por 30 minutos.", receitaId: 4 },
        { nome: "Bata as claras em neve e acrescente o açúcar.", receitaId: 4 },
        { nome: "Misture até obter um ponto de suspiro e leve ao forno até dourar.", receitaId: 4 },
        { nome: "Desenforme a torta (sem retirar o fundo falso), despeje a cobertura e acrescente as raspas de limão.", receitaId: 4 },
      ],
    });

    res.status(201).json({ message: "Receita criada com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Ocorreu um erro ao cadastrar a receita! Por favor, tente novamente mais tarde!" });
  } finally {
    prisma.$disconnect;
  }
};
