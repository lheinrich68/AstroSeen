-- MPD // AstroSeen
-- Modèle physique de données, PostgreSQL. Dérivé du MLD (mld_astroseen.md).
-- Toutes les dates/heures en TIMESTAMPTZ (pas TIMESTAMP) : une session peut
-- traverser minuit ou s'étaler sur plusieurs nuits, le fuseau horaire compte.
--
-- Stratégie de clés primaires :
--   UUID      -> entités adressables directement (URL publique/partageable) :
--                utilisateur, session, note, photo, objet, evenement_astro
--   SERIAL    -> tables internes/techniques, jamais consultées via leur
--                propre URL : toutes les autres
--
-- Aucun type ENUM PostgreSQL : toutes les classifications (statuts, types,
-- visibilités...) sont des tables de référence (id + libelle), plus simples
-- à manipuler côté code qu'un enum figé dans le schéma.

CREATE EXTENSION IF NOT EXISTS pgcrypto; -- pour gen_random_uuid()

-- Fonction de trigger générique : met à jour updated_at à chaque UPDATE.
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ---------------------------------------------------------------------------
-- Tables de référence -> toutes SERIAL, internes, id + libelle uniquement
-- ---------------------------------------------------------------------------

CREATE TABLE statut_utilisateur (
    id_statut_utilisateur  SERIAL PRIMARY KEY,
    libelle                TEXT NOT NULL
);

CREATE TABLE niveau_experience (
    id_niveau_experience  SERIAL PRIMARY KEY,
    libelle               TEXT NOT NULL
);

CREATE TABLE role_plateforme (
    id_role_plateforme  SERIAL PRIMARY KEY,
    libelle             TEXT NOT NULL
);

CREATE TABLE etat_compte (
    id_etat_compte  SERIAL PRIMARY KEY,
    libelle         TEXT NOT NULL
);

CREATE TABLE visibilite_participation (
    id_visibilite_participation  SERIAL PRIMARY KEY,
    libelle                      TEXT NOT NULL
);

CREATE TABLE type_session (
    id_type_session  SERIAL PRIMARY KEY,
    libelle          TEXT NOT NULL
);

CREATE TABLE statut_session (
    id_statut_session  SERIAL PRIMARY KEY,
    libelle            TEXT NOT NULL
);

CREATE TABLE statut_participation (
    id_statut_participation  SERIAL PRIMARY KEY,
    libelle                  TEXT NOT NULL
);

CREATE TABLE categorie_ensemble (
    id_categorie_ensemble  SERIAL PRIMARY KEY,
    libelle                TEXT NOT NULL
);

CREATE TABLE type_materiel (
    id_type_materiel  SERIAL PRIMARY KEY,
    libelle           TEXT NOT NULL
);

-- Classification d'un objet du ciel (ex-"type_objet") : renommé pour plus de
-- précision astronomique.
CREATE TABLE classification_astronomique (
    id_classification_astronomique  SERIAL PRIMARY KEY,
    libelle                         TEXT NOT NULL,
    icone_vectorielle               TEXT -- icône SVG générique (fallback quand le filtre "Mes photos" est vide)
);

-- Nom d'une caractéristique observable/cataloguée d'un objet (magnitude,
-- distance, type spectral...) -> table de référence, pas de texte libre.
CREATE TABLE type_caracteristique (
    id_type_caracteristique  SERIAL PRIMARY KEY,
    libelle                  TEXT NOT NULL,
    unite_par_defaut         TEXT -- ex: "mag", "al", "arcmin" -> indicative, peut être surchargée par ligne
);

CREATE TABLE statut_publication_note (
    id_statut_publication_note  SERIAL PRIMARY KEY,
    libelle                     TEXT NOT NULL
);

CREATE TABLE meteo (
    id_meteo  SERIAL PRIMARY KEY,
    libelle   TEXT NOT NULL
);

INSERT INTO meteo (libelle)
VALUES
    ('Dégagé'),
    ('Partiellement nuageux'),
    ('Nuageux'),
    ('Couvert'),
    ('Brumeux'),
    ('Pluie'),
    ('Vent fort'),
    ('Orageux');

CREATE TABLE source_croquis (
    id_source_croquis SERIAL PRIMARY KEY,
    libelle           TEXT NOT NULL
);

CREATE TABLE type_contenu (
    id_type_contenu  SERIAL PRIMARY KEY,
    libelle          TEXT NOT NULL
);

CREATE TABLE visibilite_contenu (
    id_visibilite_contenu  SERIAL PRIMARY KEY,
    libelle                TEXT NOT NULL
);

CREATE TABLE type_evenement_astro (
    id_type_evenement_astro  SERIAL PRIMARY KEY,
    libelle                  TEXT NOT NULL,
    icone_vectorielle        TEXT -- icône propre à chaque type, identification visuelle rapide
);

CREATE TABLE niveau_importance_evenement (
                                             id_niveau_importance_evenement SERIAL PRIMARY KEY,
                                             libelle                        TEXT NOT NULL
);

-- Données de départ

INSERT INTO statut_utilisateur (libelle)
VALUES
    ('Amateur'),
    ('Professionnel');

INSERT INTO niveau_experience (libelle)
VALUES
    ('Débutant'),
    ('Confirmé'),
    ('Expert');

INSERT INTO role_plateforme (libelle)
VALUES
    ('Membre'),
    ('Modérateur'),
    ('Administrateur');

INSERT INTO etat_compte (libelle)
VALUES
    ('Actif'),
    ('Banni'),
    ('Supprimé');

INSERT INTO visibilite_participation (libelle)
VALUES
    ('Publique'),
    ('Privée'),
    ('Sur invitation');

INSERT INTO type_session (libelle)
VALUES
    ('Loisir'),
    ('Campagne'),
    ('Formation');

INSERT INTO statut_session (libelle)
VALUES
    ('Planifiée'),
    ('En cours'),
    ('Terminée'),
    ('Annulée');

INSERT INTO statut_participation (libelle)
VALUES
    ('Invitée'),
    ('Confirmée'),
    ('Refusée');

INSERT INTO categorie_ensemble (libelle)
VALUES
    ('Classique'),
    ('Astrophoto');

INSERT INTO type_materiel (libelle)
VALUES
    ('Télescope'),
    ('Monture'),
    ('Caméra'),
    ('Oculaire'),
    ('Filtre'),
    ('Réducteur de focale'),
    ('Barlow'),
    ('Autoguideur'),
    ('Trépied'),
    ('Autre');

INSERT INTO classification_astronomique (libelle)
VALUES
    ('Étoile'),
    ('Étoile variable'),
    ('Planète'),
    ('Planète naine'),
    ('Comète'),
    ('Astéroïde'),
    ('Galaxie'),
    ('Nébuleuse'),
    ('Amas ouvert'),
    ('Amas globulaire'),
    ('Étoile à neutrons'),
    ('Supernova'),
    ('Reste de supernova'),
    ('Satellite'),
    ('Autre');

INSERT INTO type_caracteristique (libelle, unite_par_defaut)
VALUES
    ('Magnitude apparente', 'mag'),
    ('Distance', 'al'),
    ('Taille apparente', 'arcmin'),
    ('Constellation', NULL),
    ('Type spectral', NULL),
    ('Type morphologique', NULL),
    ('Période orbitale', 'jours'),
    ('Redshift', NULL),
    ('Vitesse radiale', 'km/s'),
    ('Masse', NULL),
    ('Rayon', NULL),
    ('Température de surface', 'K'),
    ('Ascension droite (catalogue)', 'degrés'),
    ('Déclinaison (catalogue)', 'degrés'),
    ('Autre', NULL);

INSERT INTO source_croquis (libelle)
VALUES
    ('Importé'),
    ('Dessiné');

INSERT INTO type_contenu (libelle)
VALUES
    ('Session'),
    ('Note'),
    ('Photo');

INSERT INTO visibilite_contenu (libelle)
VALUES
    ('Privée'),
    ('Session'),
    ('Publique');

INSERT INTO type_evenement_astro (libelle)
VALUES
    ('Éclipse'),
    ('Pluie de météores'),
    ('Opposition'),
    ('Conjonction'),
    ('Transit'),
    ('Occultation'),
    ('Autre');

INSERT INTO niveau_importance_evenement (libelle)
VALUES
    ('Basse'),
    ('Modéré'),
    ('Haute');

-- ---------------------------------------------------------------------------
-- Utilisateur (UUID => profil consultable directement)
-- ---------------------------------------------------------------------------

CREATE TABLE utilisateur (
    id_utilisateur               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pseudo                       TEXT NOT NULL UNIQUE,
    email                        TEXT NOT NULL UNIQUE,
    mot_de_passe_hash            TEXT NOT NULL,
    nom_affiche                  TEXT,
    bio                          TEXT,
    id_statut_utilisateur        BIGINT NOT NULL REFERENCES statut_utilisateur(id_statut_utilisateur),
    id_niveau_experience         BIGINT NOT NULL REFERENCES niveau_experience(id_niveau_experience),
    id_role_plateforme           BIGINT NOT NULL REFERENCES role_plateforme(id_role_plateforme),
    astronome_certifie           BOOLEAN NOT NULL DEFAULT FALSE,
    id_certificateur             UUID REFERENCES utilisateur(id_utilisateur),
    date_certification           TIMESTAMPTZ,
    consentement_cgu_date        TIMESTAMPTZ,
    date_derniere_connexion      TIMESTAMPTZ,
    id_etat_compte               BIGINT NOT NULL REFERENCES etat_compte(id_etat_compte),
    photo_profil                 TEXT,
    email_verifie                BOOLEAN NOT NULL DEFAULT FALSE,
    token_verification_email     TEXT,
    date_expiration_token        TIMESTAMPTZ,
    date_verification_email      TIMESTAMPTZ,
    token_reinitialisation_mdp   TEXT, -- distinct du token de vérification email, volontairement
    date_expiration_token_reset  TIMESTAMPTZ,
    date_demande_suppression     TIMESTAMPTZ, -- file d'attente admin : renseignée tant que etat_compte reste 'actif'
    created_at                   TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at                   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_utilisateur_statut ON utilisateur(id_statut_utilisateur);
CREATE INDEX idx_utilisateur_niveau ON utilisateur(id_niveau_experience);
CREATE INDEX idx_utilisateur_role ON utilisateur(id_role_plateforme);
CREATE INDEX idx_utilisateur_etat ON utilisateur(id_etat_compte);

CREATE TRIGGER trg_utilisateur_updated_at
    BEFORE UPDATE ON utilisateur
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ---------------------------------------------------------------------------
-- Contenu (SERIAL => technique, jamais consulté via sa propre URL)
-- créé avant Session/Note/Photo car référencé par elles
-- ---------------------------------------------------------------------------

CREATE TABLE contenu (
    id_contenu             SERIAL PRIMARY KEY,
    id_type_contenu        BIGINT NOT NULL REFERENCES type_contenu(id_type_contenu),
    id_visibilite_contenu  BIGINT NOT NULL REFERENCES visibilite_contenu(id_visibilite_contenu),
    date_publication       TIMESTAMPTZ
);

CREATE INDEX idx_contenu_type ON contenu(id_type_contenu);
CREATE INDEX idx_contenu_visibilite ON contenu(id_visibilite_contenu);

-- ---------------------------------------------------------------------------
-- Lieu (SERIAL => interne, jamais sa propre page publique)
-- ---------------------------------------------------------------------------

CREATE TABLE lieu (
    id_lieu          SERIAL PRIMARY KEY,
    nom              TEXT NOT NULL,
    latitude         DOUBLE PRECISION NOT NULL,
    longitude        DOUBLE PRECISION NOT NULL,
    bortle           INTEGER,
    id_proprietaire  UUID NOT NULL REFERENCES utilisateur(id_utilisateur)
);

CREATE INDEX idx_lieu_proprietaire ON lieu(id_proprietaire);

CREATE INDEX idx_lieu_coordonnees_arrondies
    ON lieu (ROUND(latitude::numeric, 3), ROUND(longitude::numeric, 3));

-- ---------------------------------------------------------------------------
-- Session (UUID => page de session partageable) / Participation (SERIAL)
-- ---------------------------------------------------------------------------

CREATE TABLE session (
    id_session                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titre                        TEXT NOT NULL,
    description                  TEXT,
    date_debut                   DATE NOT NULL,
    heure_debut                  TIME,
    date_fin                     DATE,
    id_statut_session            BIGINT NOT NULL REFERENCES statut_session(id_statut_session),
    id_visibilite_participation  BIGINT NOT NULL REFERENCES visibilite_participation(id_visibilite_participation),
    id_type_session              BIGINT REFERENCES type_session(id_type_session),
    id_createur                  UUID NOT NULL REFERENCES utilisateur(id_utilisateur),
    id_lieu_par_defaut           BIGINT REFERENCES lieu(id_lieu),
    id_contenu                   BIGINT NOT NULL UNIQUE REFERENCES contenu(id_contenu),
    created_at                   TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at                   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_session_updated_at
    BEFORE UPDATE ON session
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_session_createur ON session(id_createur);
CREATE INDEX idx_session_lieu ON session(id_lieu_par_defaut);
CREATE INDEX idx_session_statut ON session(id_statut_session);

CREATE TABLE participation (
    id_participation         SERIAL PRIMARY KEY,
    id_statut_participation  BIGINT NOT NULL REFERENCES statut_participation(id_statut_participation),
    id_utilisateur           UUID NOT NULL REFERENCES utilisateur(id_utilisateur),
    id_session               UUID NOT NULL REFERENCES session(id_session),

    UNIQUE (id_utilisateur, id_session)
);

-- ---------------------------------------------------------------------------
-- Ensemble / Matériel (SERIAL -> internes)
-- ---------------------------------------------------------------------------

CREATE TABLE ensemble (
    id_ensemble            SERIAL PRIMARY KEY,
    nom                    TEXT NOT NULL,
    id_categorie_ensemble  BIGINT NOT NULL REFERENCES categorie_ensemble(id_categorie_ensemble),
    id_proprietaire        UUID NOT NULL REFERENCES utilisateur(id_utilisateur)
);

CREATE INDEX idx_ensemble_proprietaire ON ensemble(id_proprietaire);
CREATE INDEX idx_ensemble_categorie ON ensemble(id_categorie_ensemble);

CREATE TABLE materiel (
    id_materiel       SERIAL PRIMARY KEY,
    id_type_materiel  BIGINT NOT NULL REFERENCES type_materiel(id_type_materiel),
    marque            TEXT,
    modele            TEXT,
    caracteristiques  TEXT,

    UNIQUE (id_type_materiel, marque, modele)
);

CREATE INDEX idx_materiel_type ON materiel(id_type_materiel);

CREATE TABLE ensemble_materiel (
    id_ensemble_materiel  SERIAL PRIMARY KEY,
    id_ensemble           BIGINT NOT NULL REFERENCES ensemble(id_ensemble),
    id_materiel           BIGINT NOT NULL REFERENCES materiel(id_materiel),

    UNIQUE (id_ensemble, id_materiel)
);

CREATE INDEX idx_ensemble_materiel_ensemble ON ensemble_materiel(id_ensemble);
CREATE INDEX idx_ensemble_materiel_materiel ON ensemble_materiel(id_materiel);

CREATE OR REPLACE FUNCTION cleanup_materiel_orphelin()
RETURNS TRIGGER AS $$
BEGIN
DELETE FROM materiel
WHERE id_materiel = OLD.id_materiel
  AND NOT EXISTS (
    SELECT 1 FROM ensemble_materiel WHERE id_materiel = OLD.id_materiel
);
RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_cleanup_materiel_orphelin
    AFTER DELETE ON ensemble_materiel
    FOR EACH ROW EXECUTE FUNCTION cleanup_materiel_orphelin();

-- ---------------------------------------------------------------------------
-- Objet du ciel (UUID -> fiche planétarium publique, ex-"Cible")
-- Désignation / Caractéristique_Objet (SERIAL)
-- ---------------------------------------------------------------------------

CREATE TABLE objet (
    id_objet                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom                             TEXT NOT NULL,
    id_classification_astronomique  BIGINT NOT NULL REFERENCES classification_astronomique(id_classification_astronomique),
    description                     TEXT,
    histoire                        TEXT,
    image_reference                 TEXT -- image de couverture officielle/admin, distincte des Photo communautaires
);

CREATE INDEX idx_objet_classification ON objet(id_classification_astronomique);

CREATE TABLE designation (
    id_designation  SERIAL PRIMARY KEY,
    catalogue       TEXT NOT NULL,
    code            TEXT NOT NULL,
    id_objet        UUID NOT NULL REFERENCES objet(id_objet),

    UNIQUE (catalogue, code)
);

CREATE INDEX idx_designation_objet ON designation(id_objet);

-- Remplace l'ancien champ unique "caracteristiques" (texte libre) : une ligne
-- par caractéristique, nombre illimité et variable selon le type d'objet
-- (une planète et une galaxie n'ont pas les mêmes caractéristiques pertinentes).
CREATE TABLE caracteristique_objet (
    id_caracteristique_objet  SERIAL PRIMARY KEY,
    id_objet                  UUID NOT NULL REFERENCES objet(id_objet),
    id_type_caracteristique   BIGINT NOT NULL REFERENCES type_caracteristique(id_type_caracteristique),
    valeur                    TEXT NOT NULL,
    unite                     TEXT, -- surcharge unite_par_defaut si besoin (ex: valeur en parsecs plutôt qu'années-lumière)

    UNIQUE (id_objet, id_type_caracteristique)
);

CREATE INDEX idx_caracteristique_objet_objet ON caracteristique_objet(id_objet);

-- ---------------------------------------------------------------------------
-- Note d'observation (UUID -> publiable/partageable) / Croquis (SERIAL)
-- ---------------------------------------------------------------------------

CREATE TABLE note (
    id_note                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date_note                   DATE NOT NULL, -- nuit précise, pré-remplie depuis session.date_debut, modifiable si session multi-nuits
    seeing_pickering            INTEGER,
    transparence                DOUBLE PRECISION,
    temperature                 DOUBLE PRECISION,
    humidite                    DOUBLE PRECISION,
    pression                    DOUBLE PRECISION,
    id_meteo                    BIGINT REFERENCES meteo(id_meteo),
    evenements_imprevus         TEXT,
    recit                       TEXT, -- rédaction longue façon Notion (Markdown), rendu riche géré côté frontend
    ascension_droite            DOUBLE PRECISION,
    declinaison                 DOUBLE PRECISION,
    azimut                      DOUBLE PRECISION,
    hauteur                     DOUBLE PRECISION,
    heure_debut                 TIMESTAMPTZ,
    heure_fin                   TIMESTAMPTZ,
    id_session                  UUID NOT NULL REFERENCES session(id_session),
    id_redacteur                UUID NOT NULL REFERENCES utilisateur(id_utilisateur),
    id_lieu                     BIGINT REFERENCES lieu(id_lieu),
    id_ensemble                 BIGINT REFERENCES ensemble(id_ensemble),
    id_objet                    UUID REFERENCES objet(id_objet),
    id_contenu                  BIGINT NOT NULL UNIQUE REFERENCES contenu(id_contenu),
    created_at                  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at                  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_note_session ON note(id_session);
CREATE INDEX idx_note_redacteur ON note(id_redacteur);
CREATE INDEX idx_note_objet ON note(id_objet);
CREATE INDEX idx_note_meteo ON note(id_meteo);

CREATE TRIGGER trg_note_updated_at
    BEFORE UPDATE ON note
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE croquis (
    id_croquis         SERIAL PRIMARY KEY,
    image              TEXT NOT NULL,
    id_source_croquis  BIGINT NOT NULL REFERENCES source_croquis(id_source_croquis),
    date_creation      TIMESTAMPTZ NOT NULL DEFAULT now(),
    id_note            UUID NOT NULL REFERENCES note(id_note)
);

CREATE INDEX idx_croquis_note ON croquis(id_note);

-- ---------------------------------------------------------------------------
-- Photo (UUID -> publiable/partageable) / Astrophoto (SERIAL)
-- ---------------------------------------------------------------------------

CREATE TABLE photo (
    id_photo        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date_prise      TIMESTAMPTZ,
    id_session      UUID REFERENCES session(id_session),
    id_note         UUID REFERENCES note(id_note),
    id_ensemble     BIGINT REFERENCES ensemble(id_ensemble),
    id_objet        UUID REFERENCES objet(id_objet),
    id_publicateur  UUID NOT NULL REFERENCES utilisateur(id_utilisateur),
    id_contenu      BIGINT NOT NULL UNIQUE REFERENCES contenu(id_contenu),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_photo_session ON photo(id_session);
CREATE INDEX idx_photo_note ON photo(id_note);
CREATE INDEX idx_photo_objet ON photo(id_objet);

CREATE TRIGGER trg_photo_updated_at
    BEFORE UPDATE ON photo
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE details_astrophoto (
    id_details_astrophoto  SERIAL PRIMARY KEY,
    gain_iso               TEXT,
    ouverture              DOUBLE PRECISION,
    focale_effective       DOUBLE PRECISION,
    nombre_darks           INTEGER,
    nombre_bias            INTEGER,
    logiciel_acquisition   TEXT,
    logiciel_traitement    TEXT,
    methode_empilement     TEXT,
    id_photo               UUID NOT NULL UNIQUE REFERENCES photo(id_photo)
);

CREATE TABLE acquisition_filtre (
    id_acquisition_filtre  SERIAL PRIMARY KEY,
    filtre                 TEXT NOT NULL,
    temps_pose             DOUBLE PRECISION,
    nombre_poses           INTEGER,
    nombre_flats           INTEGER,
    id_details_astrophoto  BIGINT NOT NULL REFERENCES details_astrophoto(id_details_astrophoto)
);

CREATE INDEX idx_acquisition_filtre_details ON acquisition_filtre(id_details_astrophoto);

-- ---------------------------------------------------------------------------
-- Interactions communautaires (SERIAL -> internes, jamais leur propre URL)
-- ---------------------------------------------------------------------------

CREATE TABLE commentaire (
    id_commentaire  SERIAL PRIMARY KEY,
    texte           TEXT NOT NULL,
    date            TIMESTAMPTZ NOT NULL DEFAULT now(),
    id_auteur       UUID NOT NULL REFERENCES utilisateur(id_utilisateur),
    id_contenu      BIGINT NOT NULL REFERENCES contenu(id_contenu)
);

CREATE INDEX idx_commentaire_contenu ON commentaire(id_contenu);

CREATE TABLE mention_jaime (
    id_mention_jaime  SERIAL PRIMARY KEY,
    date              TIMESTAMPTZ NOT NULL DEFAULT now(),
    id_utilisateur    UUID NOT NULL REFERENCES utilisateur(id_utilisateur),
    id_contenu        BIGINT NOT NULL REFERENCES contenu(id_contenu),

    UNIQUE (id_utilisateur, id_contenu)
);

CREATE TABLE tag (
    id_tag  SERIAL PRIMARY KEY,
    nom     TEXT NOT NULL UNIQUE
);

CREATE TABLE association_tag (
    id_association_tag  SERIAL PRIMARY KEY,
    id_tag              BIGINT NOT NULL REFERENCES tag(id_tag),
    id_contenu          BIGINT NOT NULL REFERENCES contenu(id_contenu),

    UNIQUE (id_tag, id_contenu)
);

CREATE INDEX idx_association_tag_contenu ON association_tag(id_contenu);

-- ---------------------------------------------------------------------------
-- Calendrier => événements astronomiques (UUID -> page calendrier publique)
-- ---------------------------------------------------------------------------

CREATE TABLE evenement_astro (
    id_evenement_astro              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titre                           TEXT NOT NULL,
    description                     TEXT,
    date_debut                      TIMESTAMPTZ NOT NULL,
    date_fin                        TIMESTAMPTZ,
    id_type_evenement_astro         BIGINT NOT NULL REFERENCES type_evenement_astro(id_type_evenement_astro),
    id_niveau_importance_evenement  BIGINT NOT NULL REFERENCES niveau_importance_evenement(id_niveau_importance_evenement),
    id_objet                        UUID REFERENCES objet(id_objet),
    id_createur                     UUID NOT NULL REFERENCES utilisateur(id_utilisateur)
);

CREATE INDEX idx_evenement_astro_objet ON evenement_astro(id_objet);
CREATE INDEX idx_evenement_astro_type ON evenement_astro(id_type_evenement_astro);