-- AlterTable
ALTER TABLE "user" ADD COLUMN     "date_expiration_token_reset" TIMESTAMP(3),
ADD COLUMN     "token_reinitialisation_mdp" TEXT;
