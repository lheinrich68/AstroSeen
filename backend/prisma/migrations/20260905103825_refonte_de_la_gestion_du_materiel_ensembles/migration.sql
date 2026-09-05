/*
  Warnings:

  - You are about to drop the column `id_materiel` on the `ensemble_materiel` table. All the data in the column will be lost.
  - You are about to drop the column `caracteristiques` on the `materiel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_ensemble,id_user_materiel]` on the table `ensemble_materiel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_user_materiel` to the `ensemble_materiel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ensemble_materiel" DROP CONSTRAINT "ensemble_materiel_id_materiel_fkey";

-- DropIndex
DROP INDEX "ensemble_materiel_id_ensemble_id_materiel_key";

-- AlterTable
ALTER TABLE "ensemble_materiel" DROP COLUMN "id_materiel",
ADD COLUMN     "id_user_materiel" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "materiel" DROP COLUMN "caracteristiques";

-- AlterTable
ALTER TABLE "type_materiel" ADD COLUMN     "icone_vectorielle" TEXT;

-- CreateTable
CREATE TABLE "user_materiel" (
    "id_user_materiel" SERIAL NOT NULL,
    "caracteristiques" TEXT,
    "photo" TEXT,
    "id_user" TEXT NOT NULL,
    "id_materiel" INTEGER NOT NULL,

    CONSTRAINT "user_materiel_pkey" PRIMARY KEY ("id_user_materiel")
);

-- CreateIndex
CREATE UNIQUE INDEX "ensemble_materiel_id_ensemble_id_user_materiel_key" ON "ensemble_materiel"("id_ensemble", "id_user_materiel");

-- AddForeignKey
ALTER TABLE "user_materiel" ADD CONSTRAINT "user_materiel_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_materiel" ADD CONSTRAINT "user_materiel_id_materiel_fkey" FOREIGN KEY ("id_materiel") REFERENCES "materiel"("id_materiel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ensemble_materiel" ADD CONSTRAINT "ensemble_materiel_id_user_materiel_fkey" FOREIGN KEY ("id_user_materiel") REFERENCES "user_materiel"("id_user_materiel") ON DELETE CASCADE ON UPDATE CASCADE;
