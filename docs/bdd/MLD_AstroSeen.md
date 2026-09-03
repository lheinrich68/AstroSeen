# MLD // AstroSeen

Modèle logique de données, dérivé du MEA/MCD (`modele-donnees-observations-ciel_v2.md`).
Notation standard : clé primaire **soulignée** (représentée ici en gras), clé étrangère préfixée `#`.

Aucun enum : chaque classification est une table de référence (id + libelle).

```
UTILISATEUR (id_utilisateur, pseudo, email, mot_de_passe_hash, nom_affiche, bio,
             #id_statut_utilisateur, #id_niveau_experience, #id_role_plateforme,
             astronome_certifie, #id_certificateur, date_certification,
             consentement_cgu_date, date_derniere_connexion, #id_etat_compte,
             photo_profil, email_verifie, token_verification_email,
             date_expiration_token, date_verification_email,
             token_reinitialisation_mdp, date_expiration_token_reset,
             date_demande_suppression,
             created_at, updated_at)

STATUT_UTILISATEUR (id_statut_utilisateur, libelle)

NIVEAU_EXPERIENCE (id_niveau_experience, libelle)

ROLE_PLATEFORME (id_role_plateforme, libelle)

ETAT_COMPTE (id_etat_compte, libelle)

SESSION (id_session, titre, description, date_debut, heure_debut, date_fin,
         #id_statut_session, #id_visibilite_participation, #id_type_session,
         #id_createur, #id_lieu_par_defaut, #id_contenu, created_at, updated_at)

VISIBILITE_PARTICIPATION (id_visibilite_participation, libelle)

TYPE_SESSION (id_type_session, libelle)

STATUT_SESSION (id_statut_session, libelle)

PARTICIPATION (id_participation, #id_statut_participation, #id_utilisateur, #id_session)

STATUT_PARTICIPATION (id_statut_participation, libelle)

LIEU (id_lieu, nom, latitude, longitude, bortle, #id_proprietaire)

ENSEMBLE (id_ensemble, nom, #id_categorie_ensemble, #id_proprietaire)

CATEGORIE_ENSEMBLE (id_categorie_ensemble, libelle)

MATERIEL (id_materiel, marque, modele, caracteristiques, #id_type_materiel)

TYPE_MATERIEL (id_type_materiel, libelle)

ENSEMBLE_MATERIEL (id_ensemble_materiel, #id_ensemble, #id_materiel)

OBJET (id_objet, nom, #id_classification_astronomique, description, histoire, image_reference)

CLASSIFICATION_ASTRONOMIQUE (id_classification_astronomique, libelle, icone_vectorielle)

DESIGNATION (id_designation, catalogue, code, #id_objet)

CARACTERISTIQUE_OBJET (id_caracteristique_objet, #id_objet, #id_type_caracteristique, valeur, unite)

TYPE_CARACTERISTIQUE (id_type_caracteristique, libelle, unite_par_defaut)

NOTE (id_note, date_note, seeing_pickering, transparence, temperature, humidite, pression,
      #id_meteo, evenements_imprevus, recit, #id_statut_publication_note, ascension_droite, declinaison,
      azimut, hauteur, heure_debut, heure_fin,
      #id_session, #id_redacteur, #id_lieu, #id_ensemble, #id_objet, #id_contenu,
      created_at, updated_at)

METEO (id_meteo, libelle)

STATUT_PUBLICATION_NOTE (id_statut_publication_note, libelle)

CROQUIS (id_croquis, image, #id_source_croquis, date_creation, #id_note)

SOURCE_CROQUIS (id_source_croquis, libelle)

PHOTO (id_photo, date_prise, #id_session, #id_note, #id_ensemble, #id_objet,
       #id_publicateur, #id_contenu, created_at, updated_at)

DETAILS_ASTROPHOTO (id_details_astrophoto, gain_iso, ouverture, focale_effective,
                     nombre_darks, nombre_bias, logiciel_acquisition,
                     logiciel_traitement, methode_empilement, #id_photo)

ACQUISITION_FILTRE (id_acquisition_filtre, filtre, temps_pose, nombre_poses,
                     nombre_flats, #id_details_astrophoto)

CONTENU (id_contenu, #id_type_contenu, #id_visibilite_contenu, date_publication)

TYPE_CONTENU (id_type_contenu, libelle)

VISIBILITE_CONTENU (id_visibilite_contenu, libelle)

COMMENTAIRE (id_commentaire, texte, date, #id_auteur, #id_contenu)

MENTION_JAIME (id_mention_jaime, date, #id_utilisateur, #id_contenu)

TAG (id_tag, nom)

ASSOCIATION_TAG (id_association_tag, #id_tag, #id_contenu)

EVENEMENT_ASTRO (id_evenement_astro, titre, description, date_debut, date_fin,
                  #id_type_evenement_astro, #id_niveau_importance_evenement,
                  #id_objet, #id_createur)

TYPE_EVENEMENT_ASTRO (id_type_evenement_astro, libelle)

NIVEAU_IMPORTANCE_EVENEMENT (id_niveau_importance_evenement, libelle)
```

## Contraintes d'unicité (au-delà des clés primaires/étrangères)

| Table | Contrainte | Raison |
|---|---|---|
| UTILISATEUR | `pseudo` unique, `email` unique | identification |
| PARTICIPATION | (`id_utilisateur`, `id_session`) unique | un utilisateur ne participe qu'une fois à une session — relevé dès la relecture v1 |
| DESIGNATION | (`catalogue`, `code`) unique | pas deux fois la même désignation |
| ENSEMBLE_MATERIEL | (`id_ensemble`, `id_materiel`) unique | pas de doublon d'association |
| MATERIEL | (`id_type_materiel`, `marque`, `modele`) unique | dédoublonnage — deux utilisateurs avec le même modèle pointent vers la même fiche |
| CARACTERISTIQUE_OBJET | (`id_objet`, `id_type_caracteristique`) unique | pas deux fois la même caractéristique sur un objet |
| SESSION / NOTE / PHOTO | `id_contenu` unique | relation 1-1 stricte avec CONTENU |
| DETAILS_ASTROPHOTO | `id_photo` unique | relation 1-1 stricte avec PHOTO |
| MENTION_JAIME | (`id_utilisateur`, `id_contenu`) unique | un like par personne et par contenu |
| ASSOCIATION_TAG | (`id_tag`, `id_contenu`) unique | pas de doublon d'étiquetage |
| TAG | `nom` unique | pas deux tags identiques |

## Nullabilité des clés étrangères

| FK | Nullable ? | Raison |
|---|---|---|
| `UTILISATEUR.#id_certificateur` | oui | tous les utilisateurs ne sont pas certifiés |
| `SESSION.#id_lieu_par_defaut` | oui | lieu par défaut optionnel |
| `SESSION.#id_type_session` | oui | type de session optionnel |
| `NOTE.#id_lieu`, `#id_ensemble`, `#id_objet` | oui | observation à l'œil nu possible, objet pas toujours catalogué |
| `NOTE.#id_meteo` | oui | pas toujours renseignée |
| `PHOTO.#id_session`, `#id_note`, `#id_ensemble`, `#id_objet` | oui | une photo peut être liée à une session OU une note, pas les deux forcément |
| `EVENEMENT_ASTRO.#id_objet` | oui | un événement ne porte pas toujours sur un objet précis |
| Toutes les FK vers les tables de référence (statut, type, visibilité...) | non, sauf `#id_type_session` | classification toujours connue à la création |
| Toutes les autres FK | non | relations obligatoires |