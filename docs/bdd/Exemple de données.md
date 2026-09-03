# Exemples de données — objets réels (sources Wikipédia et sites d'astronomie)

Sept objets choisis pour couvrir toute la diversité de `Classification_astronomique` : une étoile, deux planètes, une planète naine, une géante gazeuse, et deux galaxies. Sert d'exemple de remplissage pour `Objet`, `Designation` et `Caracteristique_objet`.

## Tableau récapitulatif

| Objet | Classification | Désignations | Magnitude apparente | Distance | Taille apparente | Constellation |
|---|---|---|---|---|---|---|
| Soleil | Étoile | — | −26,7 | 1 UA (~150 M km) | 32' (diamètre angulaire) | — |
| Mercure | Planète | — | −2,3 à 5,7 | 0,39 UA en moyenne | 4,5" à 13" | variable (planète) |
| Vénus | Planète | — | −3,7 à −4,6 | variable | 9,7" à 66" | variable (planète) |
| Cérès | Planète naine | MPC (1) | 6,7 à 9,3 | 2,77 UA en moyenne | ~0,84" (disque) | variable (planète naine) |
| Jupiter | Planète | — | −2,94 à −2,7 | 588,5 à 968,1 M km | 29,8" à 50,1" | variable (planète) |
| Galaxie d'Andromède | Galaxie | Messier 31, NGC 224 | 3,4 | ~2,5 millions al | ~178' × 63' (3,18° × 1°) | Andromède |
| Galaxie du Moulinet | Galaxie | Messier 101, NGC 5457 | 7,9 | ~21,7 millions al | 28,8' × 26,9' | Grande Ourse |

Les planètes/étoile/planète naine n'ont pas de désignation de catalogue au sens `Designation` (Messier/NGC/IC) — ce sont des objets du système solaire, identifiés par leur nom usuel. Seule Cérès a une désignation formelle (numéro de planète mineure du Minor Planet Center).

## Descriptions et histoires (rédigées, pas copiées des sources)

**Soleil** — Étoile de type naine jaune (G2V) au centre du Système solaire, composée majoritairement d'hydrogène et d'hélium. *Histoire* : connu et observé depuis la préhistoire dans toutes les cultures humaines ; son statut de centre du système (héliocentrisme) n'est établi scientifiquement qu'au XVIe siècle avec Copernic.

**Mercure** — La plus petite et la plus proche planète du Soleil, une planète tellurique rocheuse sans atmosphère significative. *Histoire* : connue depuis l'Antiquité, mais son observation reste difficile car elle ne s'écarte jamais beaucoup du Soleil dans le ciel.

**Vénus** — Planète tellurique à l'atmosphère dense de CO₂, souvent surnommée « étoile du berger » ou « étoile du matin ». *Histoire* : objet céleste le plus brillant après le Soleil et la Lune, elle a été l'un des premiers astres dont les civilisations anciennes ont suivi les déplacements.

**Cérès** — Planète naine et plus gros objet de la ceinture d'astéroïdes, composée d'un mélange de roche et de glace. *Histoire* : découverte le 1er janvier 1801 par Giuseppe Piazzi — le tout premier objet de la ceinture d'astéroïdes jamais identifié, initialement pris pour une comète.

**Jupiter** — La plus grande planète du Système solaire, une géante gazeuse dont on peut voir les bandes nuageuses et les quatre lunes galiléennes dès une petite lunette. *Histoire* : ses satellites ont été observés pour la première fois par Galilée en 1610, une découverte qui a pesé lourd dans le débat héliocentrisme/géocentrisme.

**Galaxie d'Andromède (M31)** — Galaxie spirale la plus proche de la Voie lactée, visible à l'œil nu comme une tache floue même sous un ciel modeste. *Histoire* : sa première observation connue remonte à l'astronome persan Al-Sufi en 964 ; elle entrera en collision avec la Voie lactée dans environ 3 à 4,5 milliards d'années.

**Galaxie du Moulinet (M101)** — Vaste galaxie spirale vue de face, dans la Grande Ourse, environ 1,7 fois plus large que la Voie lactée. *Histoire* : découverte par l'astronome français Pierre Méchain en 1781 ; plusieurs supernovas y ont été observées, la plus récente (SN 2011fe) en 2011.

## Script de seed optionnel (données de démonstration, pas des données de référence)

À la différence de `seed.js` (tables de référence obligatoires), ce script peuple des exemples d'`Objet` — utile en développement pour tester le planétarium sans tout saisir à la main. Ne pas lancer en production telle quelle sans adapter (ex. les UUID générés automatiquement).

```javascript
// backend/prisma/seed-exemples-objets.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getClassificationId(libelle) {
  const c = await prisma.classificationAstronomique.findFirstOrThrow({ where: { libelle } })
  return c.id
}
async function getTypeCaracteristiqueId(libelle) {
  const t = await prisma.typeCaracteristique.findFirstOrThrow({ where: { libelle } })
  return t.id
}

async function creerObjet({ nom, classification, description, histoire, designations = [], caracteristiques = [] }) {
  const objet = await prisma.objet.create({
    data: {
      nom,
      classificationId: await getClassificationId(classification),
      description,
      histoire,
    },
  })
  for (const d of designations) {
    await prisma.designation.create({ data: { objetId: objet.id, catalogue: d.catalogue, code: d.code } })
  }
  for (const c of caracteristiques) {
    await prisma.caracteristiqueObjet.create({
      data: {
        objetId: objet.id,
        typeId: await getTypeCaracteristiqueId(c.type),
        valeur: c.valeur,
        unite: c.unite ?? null,
      },
    })
  }
  return objet
}

async function main() {
  await creerObjet({
    nom: 'Soleil',
    classification: 'Étoile',
    description: "L'étoile du Système solaire, une naine jaune de type spectral G2V.",
    histoire: "Connu depuis la préhistoire ; son statut de centre du système (héliocentrisme) n'est établi qu'au XVIe siècle avec Copernic.",
    caracteristiques: [
      { type: 'Magnitude apparente', valeur: '-26.7' },
      { type: 'Distance', valeur: '1', unite: 'UA' },
      { type: 'Type spectral', valeur: 'G2V' },
    ],
  })

  await creerObjet({
    nom: 'Mercure',
    classification: 'Planète',
    description: 'La plus petite et la plus proche planète du Soleil, tellurique et sans atmosphère significative.',
    histoire: 'Connue depuis l\'Antiquité ; observation difficile car elle ne s\'écarte jamais beaucoup du Soleil.',
    caracteristiques: [
      { type: 'Magnitude apparente', valeur: '-2.3 à 5.7' },
      { type: 'Distance', valeur: '0.39', unite: 'UA' },
      { type: 'Taille apparente', valeur: '4.5 à 13', unite: 'arcsec' },
      { type: 'Période orbitale', valeur: '88' },
    ],
  })

  await creerObjet({
    nom: 'Vénus',
    classification: 'Planète',
    description: "Planète tellurique à l'atmosphère dense de CO2, surnommée étoile du berger.",
    histoire: 'Objet le plus brillant après le Soleil et la Lune, suivie depuis les civilisations antiques.',
    caracteristiques: [
      { type: 'Magnitude apparente', valeur: '-3.7 à -4.6' },
      { type: 'Taille apparente', valeur: '9.7 à 66', unite: 'arcsec' },
    ],
  })

  await creerObjet({
    nom: 'Cérès',
    classification: 'Planète naine',
    description: "Plus gros objet de la ceinture d'astéroïdes, composé de roche et de glace.",
    histoire: 'Découverte le 1er janvier 1801 par Giuseppe Piazzi — premier objet de la ceinture identifié.',
    designations: [{ catalogue: 'MPC', code: '1' }],
    caracteristiques: [
      { type: 'Magnitude apparente', valeur: '6.7 à 9.3' },
      { type: 'Distance', valeur: '2.77', unite: 'UA' },
      { type: 'Période orbitale', valeur: '4.6', unite: 'années' },
    ],
  })

  await creerObjet({
    nom: 'Jupiter',
    classification: 'Planète',
    description: 'La plus grande planète du Système solaire, géante gazeuse aux bandes nuageuses visibles.',
    histoire: 'Ses quatre lunes galiléennes observées par Galilée en 1610, argument clé du débat héliocentrisme/géocentrisme.',
    caracteristiques: [
      { type: 'Magnitude apparente', valeur: '-2.94 à -2.7' },
      { type: 'Taille apparente', valeur: '29.8 à 50.1', unite: 'arcsec' },
    ],
  })

  await creerObjet({
    nom: "Galaxie d'Andromède",
    classification: 'Galaxie',
    description: 'Galaxie spirale la plus proche de la Voie lactée, visible à l\'œil nu.',
    histoire: 'Première observation connue par Al-Sufi en 964 ; entrera en collision avec la Voie lactée dans 3 à 4,5 milliards d\'années.',
    designations: [
      { catalogue: 'Messier', code: '31' },
      { catalogue: 'NGC', code: '224' },
    ],
    caracteristiques: [
      { type: 'Magnitude apparente', valeur: '3.4' },
      { type: 'Distance', valeur: '2.5', unite: 'millions al' },
      { type: 'Taille apparente', valeur: '178 x 63', unite: 'arcmin' },
      { type: 'Constellation', valeur: 'Andromède' },
    ],
  })

  await creerObjet({
    nom: 'Galaxie du Moulinet',
    classification: 'Galaxie',
    description: 'Vaste galaxie spirale vue de face, environ 1,7 fois plus large que la Voie lactée.',
    histoire: 'Découverte par Pierre Méchain en 1781 ; plusieurs supernovas y ont été observées, dont SN 2011fe.',
    designations: [
      { catalogue: 'Messier', code: '101' },
      { catalogue: 'NGC', code: '5457' },
    ],
    caracteristiques: [
      { type: 'Magnitude apparente', valeur: '7.9' },
      { type: 'Distance', valeur: '21.7', unite: 'millions al' },
      { type: 'Taille apparente', valeur: '28.8 x 26.9', unite: 'arcmin' },
      { type: 'Constellation', valeur: 'Grande Ourse' },
    ],
  })

  console.log('7 objets de démonstration créés.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
```

## Sources consultées
- fr.wikipedia.org : Soleil, Mercure (planète), Vénus (planète), (1) Cérès, Jupiter (planète), Galaxie d'Andromède, Galaxie du Moulinet, Magnitude apparente
- go-astronomy.com, millenniumphoton.com, nightbase.app (données de synthèse M31/M101/Cérès)