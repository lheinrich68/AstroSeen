/*
  Warnings:

  - You are about to drop the column `azimuth` on the `note` table. All the data in the column will be lost.
  - You are about to drop the column `id_statut_publication` on the `note` table. All the data in the column will be lost.
  - You are about to drop the column `transpatence` on the `note` table. All the data in the column will be lost.
  - You are about to drop the `status_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `statut_publication` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "note" DROP CONSTRAINT "note_id_statut_publication_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_id_status_user_fkey";

-- AlterTable
ALTER TABLE "note" DROP COLUMN "azimuth",
DROP COLUMN "id_statut_publication",
DROP COLUMN "transpatence",
ADD COLUMN     "azimut" DOUBLE PRECISION,
ADD COLUMN     "transparence" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "date_demande_suppression" TIMESTAMP(3);

-- DropTable
DROP TABLE "status_user";

-- DropTable
DROP TABLE "statut_publication";

-- CreateTable
CREATE TABLE "statut_user" (
    "id_status_user" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "statut_user_pkey" PRIMARY KEY ("id_status_user")
);

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_id_status_user_fkey" FOREIGN KEY ("id_status_user") REFERENCES "statut_user"("id_status_user") ON DELETE RESTRICT ON UPDATE CASCADE;
