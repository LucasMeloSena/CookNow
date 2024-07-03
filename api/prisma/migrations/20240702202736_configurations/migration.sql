/*
  Warnings:

  - You are about to drop the column `receitaId` on the `categoria` table. All the data in the column will be lost.
  - Added the required column `categoriaId` to the `receita` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "categoria" DROP CONSTRAINT "categoria_receitaId_fkey";

-- DropIndex
DROP INDEX "categoria_receitaId_key";

-- AlterTable
ALTER TABLE "categoria" DROP COLUMN "receitaId";

-- AlterTable
ALTER TABLE "receita" ADD COLUMN     "categoriaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "receita" ADD CONSTRAINT "receita_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
