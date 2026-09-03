# Diagrammes UML // AstroSeen
Deux livrables : le diagramme de cas d'utilisation, et deux diagrammes de séquence pour les flux critiques (authentification, publication de contenu).

## 1. Diagramme de cas d'utilisation

> **Modérer un contenu signalé** (`UC15`) a désormais une conception détaillée — voir la section « Signalement et modération de contenu » dans `modele-donnees-observations-ciel_v2.md`. Implémentation reportée à la phase modération (nouvelle migration), pas encore dans `schema.prisma`.

Les acteurs suivent une hiérarchie par généralisation : un **Modérateur** hérite de tous les cas d'utilisation d'un **Membre**, un **Administrateur** hérite de ceux d'un **Modérateur**. Le statut *amateur/professionnel* et le badge *astronome certifié* ne sont volontairement pas des acteurs -> ce sont de simples attributs, sans permission associée (décision prise plus tôt dans le projet).
(cf. Diagramme de cas d'utilisation - AstroSeen.png)

## 2. Diagramme de séquence -> Authentification

Couvre inscription, vérification email (token à usage unique et expirant.
(cf. Diagramme de séquence - Authentification - AstroSeen.png)

## 3. Diagramme de séquence -> Publication de contenu

Exemple avec une `Note`, mais le flux est identique pour `Session` et `Photo` -> chacune passe par la même abstraction `Contenu`.
(cf:
(cf. Diagramme de séquence - Publication de contenu - AstroSeen.png)
```