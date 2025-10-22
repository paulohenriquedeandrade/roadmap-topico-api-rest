-- CreateEnum
CREATE TYPE "EnumPosicao" AS ENUM ('GOLEIRO', 'ZAGUEIRO', 'LATERAL', 'VOLANTE', 'MEIA', 'ATACANTE');

-- CreateTable
CREATE TABLE "Selecao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "grupo" TEXT NOT NULL,
    "titulos" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Selecao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jogador" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "posicao" "EnumPosicao" NOT NULL,
    "numeroCamisa" INTEGER NOT NULL,
    "selecaoId" INTEGER NOT NULL,

    CONSTRAINT "Jogador_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Selecao_nome_key" ON "Selecao"("nome");

-- AddForeignKey
ALTER TABLE "Jogador" ADD CONSTRAINT "Jogador_selecaoId_fkey" FOREIGN KEY ("selecaoId") REFERENCES "Selecao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
