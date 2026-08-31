-- CreateTable
CREATE TABLE "status_user" (
    "id_status_user" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "status_user_pkey" PRIMARY KEY ("id_status_user")
);

-- CreateTable
CREATE TABLE "niveau_experience" (
    "id_niveau_experience" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "niveau_experience_pkey" PRIMARY KEY ("id_niveau_experience")
);

-- CreateTable
CREATE TABLE "role" (
    "id_role" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id_role")
);

-- CreateTable
CREATE TABLE "etat_compte" (
    "id_etat_compte" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "etat_compte_pkey" PRIMARY KEY ("id_etat_compte")
);

-- CreateTable
CREATE TABLE "visibilite_participation" (
    "id_visibilite_participation" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "visibilite_participation_pkey" PRIMARY KEY ("id_visibilite_participation")
);

-- CreateTable
CREATE TABLE "type_session" (
    "id_type_session" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "type_session_pkey" PRIMARY KEY ("id_type_session")
);

-- CreateTable
CREATE TABLE "statut_session" (
    "id_statut_session" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "statut_session_pkey" PRIMARY KEY ("id_statut_session")
);

-- CreateTable
CREATE TABLE "statut_participation" (
    "id_statut_participation" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "statut_participation_pkey" PRIMARY KEY ("id_statut_participation")
);

-- CreateTable
CREATE TABLE "categorie_ensemble" (
    "id_categorie_ensemble" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "categorie_ensemble_pkey" PRIMARY KEY ("id_categorie_ensemble")
);

-- CreateTable
CREATE TABLE "type_materiel" (
    "id_type_materiel" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "type_materiel_pkey" PRIMARY KEY ("id_type_materiel")
);

-- CreateTable
CREATE TABLE "classification_astronomique" (
    "id_classification_astronomique" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,
    "icone_vectorielle" TEXT,

    CONSTRAINT "classification_astronomique_pkey" PRIMARY KEY ("id_classification_astronomique")
);

-- CreateTable
CREATE TABLE "type_caracteristique" (
    "id_type_caracteristique" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,
    "unite_par_defaut" TEXT,

    CONSTRAINT "type_caracteristique_pkey" PRIMARY KEY ("id_type_caracteristique")
);

-- CreateTable
CREATE TABLE "statut_publication" (
    "id_statut_publication" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "statut_publication_pkey" PRIMARY KEY ("id_statut_publication")
);

-- CreateTable
CREATE TABLE "meteo" (
    "id_meteo" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "meteo_pkey" PRIMARY KEY ("id_meteo")
);

-- CreateTable
CREATE TABLE "source_croquis" (
    "id_source_croquis" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "source_croquis_pkey" PRIMARY KEY ("id_source_croquis")
);

-- CreateTable
CREATE TABLE "type_contenu" (
    "id_type_contenu" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "type_contenu_pkey" PRIMARY KEY ("id_type_contenu")
);

-- CreateTable
CREATE TABLE "visibilite_contenu" (
    "id_visibilite_contenu" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "visibilite_contenu_pkey" PRIMARY KEY ("id_visibilite_contenu")
);

-- CreateTable
CREATE TABLE "type_evenement_astro" (
    "id_type_evenement_astro" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "type_evenement_astro_pkey" PRIMARY KEY ("id_type_evenement_astro")
);

-- CreateTable
CREATE TABLE "niveau_importance_evenement" (
    "id_niveau_importance_evenement" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "niveau_importance_evenement_pkey" PRIMARY KEY ("id_niveau_importance_evenement")
);

-- CreateTable
CREATE TABLE "user" (
    "id_user" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashed_pswd" TEXT NOT NULL,
    "nom_affiche" TEXT,
    "bio" TEXT,
    "id_status_user" INTEGER NOT NULL,
    "id_niveau_experience" INTEGER NOT NULL,
    "id_role" INTEGER NOT NULL,
    "astronome_certifie" BOOLEAN NOT NULL,
    "certifie_par" TEXT,
    "date_certification" TIMESTAMP(3),
    "date_consentement_cgu" TIMESTAMP(3),
    "date_derniere_connexion" TIMESTAMP(3),
    "id_etat_compte" INTEGER NOT NULL,
    "photo_profil" TEXT,
    "email_verifie" BOOLEAN NOT NULL DEFAULT false,
    "token_verif_email" TEXT,
    "date_expiration_token" TIMESTAMP(3),
    "date_verif_email" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "session" (
    "id_session" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "date_debut" DATE NOT NULL,
    "heure_debut" TIME,
    "date_fin" DATE,
    "id_statut_session" INTEGER NOT NULL,
    "id_visibilite_participation" INTEGER NOT NULL,
    "id_type_session" INTEGER,
    "id_createur" TEXT NOT NULL,
    "id_lieu_par_defaut" INTEGER,
    "id_contenu" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id_session")
);

-- CreateTable
CREATE TABLE "note" (
    "id_note" TEXT NOT NULL,
    "date_note" DATE NOT NULL,
    "seeing_picker" INTEGER,
    "transpatence" DOUBLE PRECISION,
    "temperature" DOUBLE PRECISION,
    "humidite" DOUBLE PRECISION,
    "pression" DOUBLE PRECISION,
    "id_meteo" INTEGER,
    "evenement_imprevus" TEXT,
    "id_statut_publication" INTEGER NOT NULL,
    "ascension_droite" DOUBLE PRECISION,
    "declinaison" DOUBLE PRECISION,
    "azimuth" DOUBLE PRECISION,
    "hauteur" DOUBLE PRECISION,
    "heure_debut" TIME,
    "heure_fin" TIME,
    "id_session" TEXT NOT NULL,
    "id_redacteur" TEXT NOT NULL,
    "id_lieu" INTEGER,
    "id_ensemble" INTEGER,
    "id_objet" TEXT,
    "id_contenu" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "note_pkey" PRIMARY KEY ("id_note")
);

-- CreateTable
CREATE TABLE "photo" (
    "id_photo" TEXT NOT NULL,
    "date_prise" TIMESTAMP(3) NOT NULL,
    "id_session" TEXT,
    "id_note" TEXT,
    "id_ensemble" INTEGER,
    "id_objet" TEXT,
    "id_user" TEXT NOT NULL,
    "id_contenu" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "photo_pkey" PRIMARY KEY ("id_photo")
);

-- CreateTable
CREATE TABLE "objet" (
    "id_objet" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "id_classification_astronomique" INTEGER NOT NULL,
    "description" TEXT,
    "histoire" TEXT,
    "image_reference" TEXT,

    CONSTRAINT "objet_pkey" PRIMARY KEY ("id_objet")
);

-- CreateTable
CREATE TABLE "evenement_astro" (
    "id_evenement_astro" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "date_debut" TIMESTAMP(3) NOT NULL,
    "date_fin" TIMESTAMP(3),
    "id_type_evenement_astro" INTEGER NOT NULL,
    "id_niveau_importance_evenement" INTEGER NOT NULL,
    "id_objet" TEXT,
    "id_createur" TEXT NOT NULL,

    CONSTRAINT "evenement_astro_pkey" PRIMARY KEY ("id_evenement_astro")
);

-- CreateTable
CREATE TABLE "participation" (
    "id_participation" SERIAL NOT NULL,
    "id_statut_participation" INTEGER NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_session" TEXT NOT NULL,

    CONSTRAINT "participation_pkey" PRIMARY KEY ("id_participation")
);

-- CreateTable
CREATE TABLE "lieu" (
    "id_lieu" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "bortle" INTEGER,
    "id_proprietaire" TEXT NOT NULL,

    CONSTRAINT "lieu_pkey" PRIMARY KEY ("id_lieu")
);

-- CreateTable
CREATE TABLE "ensemble" (
    "id_ensemble" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "id_categorie_ensemble" INTEGER NOT NULL,
    "id_proprietaire" TEXT NOT NULL,

    CONSTRAINT "ensemble_pkey" PRIMARY KEY ("id_ensemble")
);

-- CreateTable
CREATE TABLE "materiel" (
    "id_materiel" SERIAL NOT NULL,
    "marque" TEXT,
    "modele" TEXT,
    "caracteristiques" TEXT,
    "id_type_materiel" INTEGER NOT NULL,

    CONSTRAINT "materiel_pkey" PRIMARY KEY ("id_materiel")
);

-- CreateTable
CREATE TABLE "ensemble_materiel" (
    "id_ensemble_materiel" SERIAL NOT NULL,
    "id_ensemble" INTEGER NOT NULL,
    "id_materiel" INTEGER NOT NULL,

    CONSTRAINT "ensemble_materiel_pkey" PRIMARY KEY ("id_ensemble_materiel")
);

-- CreateTable
CREATE TABLE "croquis" (
    "id_croquis" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "id_source_croquis" INTEGER NOT NULL,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_note" TEXT NOT NULL,

    CONSTRAINT "croquis_pkey" PRIMARY KEY ("id_croquis")
);

-- CreateTable
CREATE TABLE "details_astrophoto" (
    "id_details_astrophoto" SERIAL NOT NULL,
    "gain_iso" TEXT,
    "ouverture" DOUBLE PRECISION,
    "focale_effective" DOUBLE PRECISION,
    "nombre_darks" INTEGER,
    "nombre_bias" INTEGER,
    "logiciel_acquisition" TEXT,
    "logiciel_traitement" TEXT,
    "methode_empilement" TEXT,
    "id_photo" TEXT NOT NULL,

    CONSTRAINT "details_astrophoto_pkey" PRIMARY KEY ("id_details_astrophoto")
);

-- CreateTable
CREATE TABLE "acquisition_filtre" (
    "id_acquisition_filtre" SERIAL NOT NULL,
    "filtre" TEXT NOT NULL,
    "temps_pose" DOUBLE PRECISION,
    "nombre_poses" INTEGER,
    "nombre_flats" INTEGER,
    "id_details_astrophoto" INTEGER NOT NULL,

    CONSTRAINT "acquisition_filtre_pkey" PRIMARY KEY ("id_acquisition_filtre")
);

-- CreateTable
CREATE TABLE "designation" (
    "id_designation" SERIAL NOT NULL,
    "catalogue" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "id_objet" TEXT NOT NULL,

    CONSTRAINT "designation_pkey" PRIMARY KEY ("id_designation")
);

-- CreateTable
CREATE TABLE "caracteristique_objet" (
    "id_caracteristique_objet" SERIAL NOT NULL,
    "id_objet" TEXT NOT NULL,
    "id_type_caracteristique" INTEGER NOT NULL,
    "valeur" TEXT NOT NULL,
    "unite" TEXT,

    CONSTRAINT "caracteristique_objet_pkey" PRIMARY KEY ("id_caracteristique_objet")
);

-- CreateTable
CREATE TABLE "contenu" (
    "id_contenu" SERIAL NOT NULL,
    "id_type_contenu" INTEGER NOT NULL,
    "id_visibilite_contenu" INTEGER NOT NULL,
    "date_publication" TIMESTAMP(3),

    CONSTRAINT "contenu_pkey" PRIMARY KEY ("id_contenu")
);

-- CreateTable
CREATE TABLE "commentaire" (
    "id_commentaire" SERIAL NOT NULL,
    "texte" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_auteur" TEXT NOT NULL,
    "id_contenu" INTEGER NOT NULL,

    CONSTRAINT "commentaire_pkey" PRIMARY KEY ("id_commentaire")
);

-- CreateTable
CREATE TABLE "mention_jaime" (
    "id_mention_jaime" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user" TEXT NOT NULL,
    "id_contenu" INTEGER NOT NULL,

    CONSTRAINT "mention_jaime_pkey" PRIMARY KEY ("id_mention_jaime")
);

-- CreateTable
CREATE TABLE "tag" (
    "id_tag" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id_tag")
);

-- CreateTable
CREATE TABLE "association_tag" (
    "id_association_tag" SERIAL NOT NULL,
    "id_tag" INTEGER NOT NULL,
    "id_contenu" INTEGER NOT NULL,

    CONSTRAINT "association_tag_pkey" PRIMARY KEY ("id_association_tag")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_pseudo_key" ON "user"("pseudo");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_id_contenu_key" ON "session"("id_contenu");

-- CreateIndex
CREATE UNIQUE INDEX "note_id_contenu_key" ON "note"("id_contenu");

-- CreateIndex
CREATE UNIQUE INDEX "photo_id_contenu_key" ON "photo"("id_contenu");

-- CreateIndex
CREATE UNIQUE INDEX "participation_id_user_id_session_key" ON "participation"("id_user", "id_session");

-- CreateIndex
CREATE UNIQUE INDEX "materiel_id_type_materiel_marque_modele_key" ON "materiel"("id_type_materiel", "marque", "modele");

-- CreateIndex
CREATE UNIQUE INDEX "ensemble_materiel_id_ensemble_id_materiel_key" ON "ensemble_materiel"("id_ensemble", "id_materiel");

-- CreateIndex
CREATE UNIQUE INDEX "details_astrophoto_id_photo_key" ON "details_astrophoto"("id_photo");

-- CreateIndex
CREATE UNIQUE INDEX "designation_catalogue_code_key" ON "designation"("catalogue", "code");

-- CreateIndex
CREATE UNIQUE INDEX "caracteristique_objet_id_objet_id_type_caracteristique_key" ON "caracteristique_objet"("id_objet", "id_type_caracteristique");

-- CreateIndex
CREATE UNIQUE INDEX "mention_jaime_id_user_id_contenu_key" ON "mention_jaime"("id_user", "id_contenu");

-- CreateIndex
CREATE UNIQUE INDEX "tag_nom_key" ON "tag"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "association_tag_id_tag_id_contenu_key" ON "association_tag"("id_tag", "id_contenu");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_id_status_user_fkey" FOREIGN KEY ("id_status_user") REFERENCES "status_user"("id_status_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_id_niveau_experience_fkey" FOREIGN KEY ("id_niveau_experience") REFERENCES "niveau_experience"("id_niveau_experience") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "role"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_certifie_par_fkey" FOREIGN KEY ("certifie_par") REFERENCES "user"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_id_etat_compte_fkey" FOREIGN KEY ("id_etat_compte") REFERENCES "etat_compte"("id_etat_compte") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_id_statut_session_fkey" FOREIGN KEY ("id_statut_session") REFERENCES "statut_session"("id_statut_session") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_id_visibilite_participation_fkey" FOREIGN KEY ("id_visibilite_participation") REFERENCES "visibilite_participation"("id_visibilite_participation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_id_type_session_fkey" FOREIGN KEY ("id_type_session") REFERENCES "type_session"("id_type_session") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_id_createur_fkey" FOREIGN KEY ("id_createur") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_id_lieu_par_defaut_fkey" FOREIGN KEY ("id_lieu_par_defaut") REFERENCES "lieu"("id_lieu") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_id_contenu_fkey" FOREIGN KEY ("id_contenu") REFERENCES "contenu"("id_contenu") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_id_meteo_fkey" FOREIGN KEY ("id_meteo") REFERENCES "meteo"("id_meteo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_id_statut_publication_fkey" FOREIGN KEY ("id_statut_publication") REFERENCES "statut_publication"("id_statut_publication") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_id_session_fkey" FOREIGN KEY ("id_session") REFERENCES "session"("id_session") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_id_redacteur_fkey" FOREIGN KEY ("id_redacteur") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_id_lieu_fkey" FOREIGN KEY ("id_lieu") REFERENCES "lieu"("id_lieu") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_id_ensemble_fkey" FOREIGN KEY ("id_ensemble") REFERENCES "ensemble"("id_ensemble") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_id_objet_fkey" FOREIGN KEY ("id_objet") REFERENCES "objet"("id_objet") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_id_contenu_fkey" FOREIGN KEY ("id_contenu") REFERENCES "contenu"("id_contenu") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo" ADD CONSTRAINT "photo_id_session_fkey" FOREIGN KEY ("id_session") REFERENCES "session"("id_session") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo" ADD CONSTRAINT "photo_id_note_fkey" FOREIGN KEY ("id_note") REFERENCES "note"("id_note") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo" ADD CONSTRAINT "photo_id_ensemble_fkey" FOREIGN KEY ("id_ensemble") REFERENCES "ensemble"("id_ensemble") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo" ADD CONSTRAINT "photo_id_objet_fkey" FOREIGN KEY ("id_objet") REFERENCES "objet"("id_objet") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo" ADD CONSTRAINT "photo_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo" ADD CONSTRAINT "photo_id_contenu_fkey" FOREIGN KEY ("id_contenu") REFERENCES "contenu"("id_contenu") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "objet" ADD CONSTRAINT "objet_id_classification_astronomique_fkey" FOREIGN KEY ("id_classification_astronomique") REFERENCES "classification_astronomique"("id_classification_astronomique") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evenement_astro" ADD CONSTRAINT "evenement_astro_id_type_evenement_astro_fkey" FOREIGN KEY ("id_type_evenement_astro") REFERENCES "type_evenement_astro"("id_type_evenement_astro") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evenement_astro" ADD CONSTRAINT "evenement_astro_id_niveau_importance_evenement_fkey" FOREIGN KEY ("id_niveau_importance_evenement") REFERENCES "niveau_importance_evenement"("id_niveau_importance_evenement") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evenement_astro" ADD CONSTRAINT "evenement_astro_id_objet_fkey" FOREIGN KEY ("id_objet") REFERENCES "objet"("id_objet") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evenement_astro" ADD CONSTRAINT "evenement_astro_id_createur_fkey" FOREIGN KEY ("id_createur") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participation" ADD CONSTRAINT "participation_id_statut_participation_fkey" FOREIGN KEY ("id_statut_participation") REFERENCES "statut_participation"("id_statut_participation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participation" ADD CONSTRAINT "participation_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participation" ADD CONSTRAINT "participation_id_session_fkey" FOREIGN KEY ("id_session") REFERENCES "session"("id_session") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lieu" ADD CONSTRAINT "lieu_id_proprietaire_fkey" FOREIGN KEY ("id_proprietaire") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ensemble" ADD CONSTRAINT "ensemble_id_categorie_ensemble_fkey" FOREIGN KEY ("id_categorie_ensemble") REFERENCES "categorie_ensemble"("id_categorie_ensemble") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ensemble" ADD CONSTRAINT "ensemble_id_proprietaire_fkey" FOREIGN KEY ("id_proprietaire") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materiel" ADD CONSTRAINT "materiel_id_type_materiel_fkey" FOREIGN KEY ("id_type_materiel") REFERENCES "type_materiel"("id_type_materiel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ensemble_materiel" ADD CONSTRAINT "ensemble_materiel_id_ensemble_fkey" FOREIGN KEY ("id_ensemble") REFERENCES "ensemble"("id_ensemble") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ensemble_materiel" ADD CONSTRAINT "ensemble_materiel_id_materiel_fkey" FOREIGN KEY ("id_materiel") REFERENCES "materiel"("id_materiel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "croquis" ADD CONSTRAINT "croquis_id_source_croquis_fkey" FOREIGN KEY ("id_source_croquis") REFERENCES "source_croquis"("id_source_croquis") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "croquis" ADD CONSTRAINT "croquis_id_note_fkey" FOREIGN KEY ("id_note") REFERENCES "note"("id_note") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "details_astrophoto" ADD CONSTRAINT "details_astrophoto_id_photo_fkey" FOREIGN KEY ("id_photo") REFERENCES "photo"("id_photo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "acquisition_filtre" ADD CONSTRAINT "acquisition_filtre_id_details_astrophoto_fkey" FOREIGN KEY ("id_details_astrophoto") REFERENCES "details_astrophoto"("id_details_astrophoto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "designation" ADD CONSTRAINT "designation_id_objet_fkey" FOREIGN KEY ("id_objet") REFERENCES "objet"("id_objet") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caracteristique_objet" ADD CONSTRAINT "caracteristique_objet_id_objet_fkey" FOREIGN KEY ("id_objet") REFERENCES "objet"("id_objet") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caracteristique_objet" ADD CONSTRAINT "caracteristique_objet_id_type_caracteristique_fkey" FOREIGN KEY ("id_type_caracteristique") REFERENCES "type_caracteristique"("id_type_caracteristique") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contenu" ADD CONSTRAINT "contenu_id_type_contenu_fkey" FOREIGN KEY ("id_type_contenu") REFERENCES "type_contenu"("id_type_contenu") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contenu" ADD CONSTRAINT "contenu_id_visibilite_contenu_fkey" FOREIGN KEY ("id_visibilite_contenu") REFERENCES "visibilite_contenu"("id_visibilite_contenu") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentaire" ADD CONSTRAINT "commentaire_id_auteur_fkey" FOREIGN KEY ("id_auteur") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentaire" ADD CONSTRAINT "commentaire_id_contenu_fkey" FOREIGN KEY ("id_contenu") REFERENCES "contenu"("id_contenu") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mention_jaime" ADD CONSTRAINT "mention_jaime_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mention_jaime" ADD CONSTRAINT "mention_jaime_id_contenu_fkey" FOREIGN KEY ("id_contenu") REFERENCES "contenu"("id_contenu") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "association_tag" ADD CONSTRAINT "association_tag_id_tag_fkey" FOREIGN KEY ("id_tag") REFERENCES "tag"("id_tag") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "association_tag" ADD CONSTRAINT "association_tag_id_contenu_fkey" FOREIGN KEY ("id_contenu") REFERENCES "contenu"("id_contenu") ON DELETE RESTRICT ON UPDATE CASCADE;
