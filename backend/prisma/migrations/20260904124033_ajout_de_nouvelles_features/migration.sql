/*
  Warnings:

  - You are about to drop the column `evenement_imprevus` on the `note` table. All the data in the column will be lost.
  - You are about to drop the column `seeing_picker` on the `note` table. All the data in the column will be lost.
  - The `heure_debut` column on the `note` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `heure_fin` column on the `note` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `id_user` on the `photo` table. All the data in the column will be lost.
  - You are about to drop the column `certifie_par` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `date_consentement_cgu` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `date_verif_email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `hashed_pswd` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `id_status_user` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `token_verif_email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `statut_user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_publicateur` to the `photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashed_password` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_statut_utilisateur` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "photo" DROP CONSTRAINT "photo_id_user_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_certifie_par_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_id_status_user_fkey";

-- AlterTable
ALTER TABLE "commentaire" ADD COLUMN     "id_commentaire_parent" INTEGER;

-- AlterTable
ALTER TABLE "note" DROP COLUMN "evenement_imprevus",
DROP COLUMN "seeing_picker",
ADD COLUMN     "evenements_imprevus" TEXT,
ADD COLUMN     "seeing_pickering" INTEGER,
DROP COLUMN "heure_debut",
ADD COLUMN     "heure_debut" TIMESTAMP(3),
DROP COLUMN "heure_fin",
ADD COLUMN     "heure_fin" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "photo" DROP COLUMN "id_user",
ADD COLUMN     "id_publicateur" TEXT NOT NULL,
ALTER COLUMN "date_prise" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "certifie_par",
DROP COLUMN "date_consentement_cgu",
DROP COLUMN "date_verif_email",
DROP COLUMN "hashed_pswd",
DROP COLUMN "id_status_user",
DROP COLUMN "token_verif_email",
ADD COLUMN     "consentement_cgu_date" TIMESTAMP(3),
ADD COLUMN     "date_verification_email" TIMESTAMP(3),
ADD COLUMN     "hashed_password" TEXT NOT NULL,
ADD COLUMN     "id_certificateur" TEXT,
ADD COLUMN     "id_statut_utilisateur" INTEGER NOT NULL,
ADD COLUMN     "token_verification_email" TEXT,
ALTER COLUMN "astronome_certifie" SET DEFAULT false;

-- DropTable
DROP TABLE "statut_user";

-- CreateTable
CREATE TABLE "statut_utilisateur" (
    "id_statut_utilisateur" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "statut_utilisateur_pkey" PRIMARY KEY ("id_statut_utilisateur")
);

-- CreateTable
CREATE TABLE "publication" (
    "id_publication" TEXT NOT NULL,
    "texte" TEXT,
    "id_auteur" TEXT NOT NULL,
    "id_photo" TEXT,
    "id_note" TEXT,
    "id_croquis" INTEGER,
    "id_contenu" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "publication_pkey" PRIMARY KEY ("id_publication")
);

-- CreateTable
CREATE TABLE "mention_utilisateur" (
    "id_mention_utilisateur" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_utilisateur_mentionne" TEXT NOT NULL,
    "id_commentaire" INTEGER,
    "id_publication" TEXT,

    CONSTRAINT "mention_utilisateur_pkey" PRIMARY KEY ("id_mention_utilisateur")
);

-- CreateIndex
CREATE UNIQUE INDEX "publication_id_contenu_key" ON "publication"("id_contenu");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_id_statut_utilisateur_fkey" FOREIGN KEY ("id_statut_utilisateur") REFERENCES "statut_utilisateur"("id_statut_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_id_certificateur_fkey" FOREIGN KEY ("id_certificateur") REFERENCES "user"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo" ADD CONSTRAINT "photo_id_publicateur_fkey" FOREIGN KEY ("id_publicateur") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publication" ADD CONSTRAINT "publication_id_auteur_fkey" FOREIGN KEY ("id_auteur") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publication" ADD CONSTRAINT "publication_id_photo_fkey" FOREIGN KEY ("id_photo") REFERENCES "photo"("id_photo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publication" ADD CONSTRAINT "publication_id_note_fkey" FOREIGN KEY ("id_note") REFERENCES "note"("id_note") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publication" ADD CONSTRAINT "publication_id_croquis_fkey" FOREIGN KEY ("id_croquis") REFERENCES "croquis"("id_croquis") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publication" ADD CONSTRAINT "publication_id_contenu_fkey" FOREIGN KEY ("id_contenu") REFERENCES "contenu"("id_contenu") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentaire" ADD CONSTRAINT "commentaire_id_commentaire_parent_fkey" FOREIGN KEY ("id_commentaire_parent") REFERENCES "commentaire"("id_commentaire") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mention_utilisateur" ADD CONSTRAINT "mention_utilisateur_id_utilisateur_mentionne_fkey" FOREIGN KEY ("id_utilisateur_mentionne") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mention_utilisateur" ADD CONSTRAINT "mention_utilisateur_id_commentaire_fkey" FOREIGN KEY ("id_commentaire") REFERENCES "commentaire"("id_commentaire") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mention_utilisateur" ADD CONSTRAINT "mention_utilisateur_id_publication_fkey" FOREIGN KEY ("id_publication") REFERENCES "publication"("id_publication") ON DELETE SET NULL ON UPDATE CASCADE;
