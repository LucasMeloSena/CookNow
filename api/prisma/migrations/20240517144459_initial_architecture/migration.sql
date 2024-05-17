-- CreateTable
CREATE TABLE "receita" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "url_image" TEXT NOT NULL,
    "tempo_medio" INTEGER NOT NULL,
    "custo" INTEGER NOT NULL,
    "dificuldade" INTEGER NOT NULL,
    "localizacao" TEXT NOT NULL,
    "avaliacao" DOUBLE PRECISION NOT NULL,
    "dt_cadastro" TIMESTAMP(3) NOT NULL,
    "dt_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "receita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modo_preparo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "receitaId" INTEGER NOT NULL,

    CONSTRAINT "modo_preparo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "receitaId" INTEGER NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receita_ingrediente" (
    "receitaId" INTEGER NOT NULL,
    "ingredienteId" INTEGER NOT NULL,

    CONSTRAINT "receita_ingrediente_pkey" PRIMARY KEY ("receitaId","ingredienteId")
);

-- CreateTable
CREATE TABLE "ingrediente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "ingrediente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categoria_receitaId_key" ON "categoria"("receitaId");

-- AddForeignKey
ALTER TABLE "modo_preparo" ADD CONSTRAINT "modo_preparo_receitaId_fkey" FOREIGN KEY ("receitaId") REFERENCES "receita"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categoria" ADD CONSTRAINT "categoria_receitaId_fkey" FOREIGN KEY ("receitaId") REFERENCES "receita"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receita_ingrediente" ADD CONSTRAINT "receita_ingrediente_receitaId_fkey" FOREIGN KEY ("receitaId") REFERENCES "receita"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receita_ingrediente" ADD CONSTRAINT "receita_ingrediente_ingredienteId_fkey" FOREIGN KEY ("ingredienteId") REFERENCES "ingrediente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
