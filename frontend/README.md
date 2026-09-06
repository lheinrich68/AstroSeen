# AstroSeen

Application web d'observation du ciel nocturne => sessions partagées, notes d'observation, astrophoto, planétarium, calendrier d'événements astronomiques.

## Structure du dépôt (monorepo)

```
astroseen/
├── frontend/    React (Vite) — interface utilisateur
├── backend/     Express — API REST
├── docs/        Cahier des charges, modèle de données, découpage Linear
└── docker-compose.yml   Instance PostgreSQL de développement
```

> **Décision de structure** : monorepo avec deux dossiers indépendants (`frontend/`, `backend/`), chacun avec son propre `package.json` — plutôt que deux dépôts séparés ou un setup avec workspaces npm. Choix pragmatique pour une équipe qui commence, plus simple à cloner et à faire tourner d'un coup ; à revoir si les deux parties doivent un jour être déployées/versionnées totalement indépendamment.

## Démarrage rapide

### Tout en un, avec logs combinés (recommandé pour voir précisément ce qui se passe)
```bash
docker compose up --build
```
Démarre PostgreSQL, le backend et le frontend ensemble. Les logs des 3 conteneurs s'affichent dans le même terminal, préfixés par nom de service et par couleur. `Ctrl+C` arrête tout proprement.

- Backend : `http://localhost:3000`
- Frontend : `http://localhost:5173`
- PostgreSQL : `localhost:5432`

Pour relancer en tâche de fond après le premier build : `docker compose up -d`, puis `docker compose logs -f` pour rebasculer sur les logs combinés à tout moment.

### En local, sans Docker pour le frontend/backend (alternative)
```bash
docker compose up -d postgres   # uniquement la base
cd backend && cp .env.example .env && npm install && npm run dev
cd frontend && npm install && npm run dev   # dans un autre terminal
```

## Tests

Jest est configuré côté frontend et backend :
```bash
cd frontend && npm test
cd backend && npm test
```

⚠️ Point d'attention (cf. ticket AST-10) : Vite fonctionne en ESM natif, Jest historiquement en CommonJS. Les deux `package.json` sont en `"type": "module"` et Jest est configuré via Babel (`babel.config.cjs`) pour transformer le code à la volée — évite les erreurs `SyntaxError: Cannot use import statement outside a module`.

## Documentation du projet

Voir `docs/` :
- `cahier-des-charges_observation-ciel.md` — périmètre fonctionnel complet, stack, RGPD
- `modele-donnees-observations-ciel_v2.md` — modèle conceptuel de données (MCD)
- `tickets-linear_astroseen.md` — découpage epics/tickets (répliqué dans Linear)