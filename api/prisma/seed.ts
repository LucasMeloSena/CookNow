import { prisma } from "../src/infra/database/database";

async function seed() {
  await prisma.categoria.create({
    data: {
      nome: "Salgado"
    }
  })

  await prisma.receita.create({
    data: {
      nome: "Spaghetti Ao Molho Vermelho",
      url_image: "https://firebasestorage.googleapis.com/v0/b/cooknow-cdaf5.appspot.com/o/recipes%2Fmacarrao.jpg?alt=media&token=92f9d9ef-6d4c-47d2-a7bb-ebe08e905008",
      categoriaId: 1,
      tempo_medio: 30,
      custo: 1,
      dificuldade: 1,
      localizacao: "Brasil",
      avaliacao: 4.2,
      dt_cadastro: new Date().toISOString(),
      dt_atualizacao: new Date().toISOString(),
    },
  });

  await prisma.ingrediente.createMany({
    data: [
      {
        nome: "500g de Macarrão",
      },
      {
        nome: "1 Colher de Sal",
      },
      {
        nome: "2 Litros de água",
      },
      {
        nome: "1 Colher de Óleo",
      },
    ],
  });

  await prisma.modo_preparo.createMany({
    data: [
      { nome: "Em uma panela, coloque aproximadamente 2 litros e meio de água para cozinhar o macarrão e acrescente sal a gosto. Deixe ferver.", receitaId: 1 },
      { nome: "Adicione meio pacote do macarrão de sua preferência e cozinhe até ficar al dente. Escorra e reserve.", receitaId: 1 },
      { nome: "Em seguida, adicione 4 colheres de sopa de óleo e meia cebola em cubos em uma panela. Refogue.", receitaId: 1 },
      { nome: "Em seguida, adicione 4 colheres de sopa de óleo e meia cebola em cubos em uma panela. Refogue.", receitaId: 1 },
      { nome: "Acrescente meia xícara do molho de sua preferência e deixe ferver.", receitaId: 1 },
      { nome: "Depois, transfira o macarrão para a panela e misture. Sirva em seguida.", receitaId: 1 },
    ],
  });

  await prisma.receita_ingrediente.createMany({
    data: [
      { ingredienteId: 1, receitaId: 1 },
      { ingredienteId: 2, receitaId: 1 },
      { ingredienteId: 3, receitaId: 1 },
      { ingredienteId: 4, receitaId: 1 },
    ],
  });
}

seed().then(() => {
  console.log("Database seeded!");
  prisma.$disconnect();
});
