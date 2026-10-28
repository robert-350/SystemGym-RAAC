# GymFlow

Proyecto full stack de **gestión de gimnasio** para aprender NestJS. Usa como referencia de arquitectura el proyecto MV-V2 (módulos hexagonales), pero con un dominio distinto.

| Capa | Tecnología |
| --- | --- |
| API | NestJS 12 (ESM) + TypeScript, Vitest + supertest, oxlint |
| Web | React 19 + Vite + TypeScript, Vitest + Testing Library |
| Base de datos | MySQL 8.4 (Docker) |
| Monorepo | pnpm workspaces (`apps/api`, `apps/web`) |
| CI | GitHub Actions (lint, typecheck, tests, e2e, build, imágenes Docker) |

## Estructura

```
apps/
  api/          # NestJS: src/, test/ (e2e)
  web/          # React + Vite
docs/           # especificación del dominio (qué construir)
infra/db/init/  # scripts SQL que MySQL ejecuta al crear el volumen
docker-compose.yml
LEARNING.md     # ruta de aprendizaje y reglas de la tutoría
```

## Requisitos

- Node.js 24 (`.nvmrc`)
- pnpm 12 (`corepack enable` y listo; la versión está fijada en `package.json`)
- Docker Desktop (para MySQL)

## Puesta en marcha

```bash
cp .env.example .env
pnpm install
pnpm db:up        # MySQL en localhost:3306
pnpm dev          # API en :3000 y web en :5173
```

La web llama a `/api/*`; Vite (dev) o nginx (Docker) lo reenvían a la API quitando el prefijo `/api`.

Todo en contenedores: `pnpm docker:up` (web en `http://localhost:8080`).

## Scripts

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | API y web con recarga |
| `pnpm lint` / `pnpm typecheck` | Calidad estática en ambos proyectos |
| `pnpm test` / `pnpm test:e2e` | Tests unitarios / end-to-end del API |
| `pnpm build` | Compila ambos proyectos |
| `pnpm verify` | Todo lo anterior, como en CI |
| `pnpm db:up` / `db:down` / `db:reset` | Ciclo de vida de MySQL (`db:reset` borra los datos) |

## Nota técnica: tests con decoradores

Vitest usa esbuild, que no emite metadata de decoradores, y sin ella Nest no puede inyectar por tipo en el constructor. Por eso `apps/api/vitest*.ts` usan `unplugin-swc`. Si quitas ese plugin, los tests fallan con `Cannot read properties of undefined`.
