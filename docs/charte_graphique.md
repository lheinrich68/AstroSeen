# Charte graphique // AstroSeen

## Direction

**Sombre et immersif**, avec un accent technique bleu/cyan. L'identité s'appuie sur le vocabulaire réel des instruments d'observation (réticule de chercheur, graduations de coordonnées (ascension droite / déclinaison), lecture de données précises (seeing, Bortle)) plutôt que sur un simple thème "dark mode" générique. L'idée : que l'interface donne la sensation de consulter un instrument de précision autant qu'une application grand public.

## Palette

| Nom | Hex | Usage |
|---|---|---|
| Fond nuit | `#06070c` | Fond de page — bleu-noir profond, jamais un noir pur |
| Surface | `#10131f` | Cartes, panneaux, zones en léger relief |
| Surface haute | `#171b2c` | Éléments survolés / actifs |
| Signal (accent primaire) | `#4fd8e0` | Actions principales, liens, données techniques (seeing, coordonnées) |
| Starlight (accent secondaire) | `#f2b872` | Badges, mise en avant chaleureuse (ex. badge astronome certifié), alertes douces |
| Texte principal | `#e7e9f0` | Corps de texte — blanc cassé légèrement bleuté, pas de blanc pur (fatigue visuelle en usage nocturne) |
| Texte atténué | `#8b93a7` | Légendes, métadonnées, texte secondaire |

**Pourquoi pas un simple noir + cyan générique ?** Le fond est délibérément bleu-nuit (`#06070c`) plutôt que noir pur, et le cyan est associé à un second accent chaud (starlight) pour éviter l'écueil "fond quasi-noir + un seul accent vif", qui est un des trois looks par défaut les plus vus actuellement en design généré. Ici, les deux accents ont chacun un rôle distinct et justifié (signal = données/technique, starlight = reconnaissance/chaleur), pas juste une déclinaison de la même couleur.

## Typographie

Trois rôles, une seule famille cohérente (IBM Plex) complétée d'un display distinctif :

| Rôle | Police | Usage |
|---|---|---|
| Titre / display | **Orbitron** | Titres de page, logo, moments d'accroche — utilisé avec retenue |
| Corps de texte | **Inter** | Tout le texte courant, labels, boutons |
| Données techniques | **JetBrains Mono** | Coordonnées, magnitudes, temps de pose, échelles Pickering/Bortle, timestamps |

Le mono n'est pas cosmétique : dès qu'une valeur numérique précise s'affiche (seeing, magnitude, focale, temps de pose), elle passe en `JetBrains Mono` — ça signale visuellement "donnée mesurée" et aligne les chiffres en colonnes de façon lisible, important pour le public expert/professionnel.

Toutes trois disponibles gratuitement via Google Fonts, sans restriction d'usage web (contrairement à Nasalization, envisagée un temps pour les titres : gratuite seulement en usage desktop/print, licence webfont payante requise pour l'intégrer à un site — Orbitron évite ce problème tout en gardant un esprit géométrique futuriste proche).

## Signature : le motif réticule

L'élément récurrent et reconnaissable de l'identité : de fines graduations en tirets, façon réticule de chercheur d'étoiles ou règle graduée d'ascension droite/déclinaison, utilisées comme séparateurs de section ou comme fond discret d'en-tête — plutôt qu'un simple trait plein ou un dégradé. Voir `charte-graphique-preview.html` pour un exemple visuel.

## Principes d'usage

- Un fond sombre partout, jamais de section en fond clair (casserait l'immersion "ciel nocturne").
- Le starlight (`#f2b872`) reste rare et signifiant -> badges, reconnaissance, jamais une couleur de bouton par défaut.
- Le signal (`#4fd8e0`) porte les actions et les données techniques, pas la décoration.
- Pas de dégradés, pas d'effets de lueur/neon -> la profondeur vient des surfaces (`#10131f`, `#171b2c`), pas d'effets lumineux artificiels.