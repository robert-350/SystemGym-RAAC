# Ruta de aprendizaje

Reglas de la tutoría (Claude hace de tutor):

- **Tú escribes el código de negocio.** El tutor explica el concepto, da un ejercicio y un criterio de "terminado".
- **Tú avisas cuando terminas** y el tutor revisa: errores con archivo y línea, el porqué y una sugerencia sin la solución completa.
- **TDD**: primero el test que falla, luego el código mínimo, luego refactor.
- **Dependencias**: `domain/` y `application/` nunca importan `@nestjs/*`, `mysql2` ni `kysely`. Los puertos se inyectan con tokens (`Symbol`), no con clases concretas.

## Lecciones

| # | Tema | Entregable |
| --- | --- | --- |
| 0 | TypeScript/Node: decoradores, ESM (`.js` en imports), `async/await` | Leer el scaffold de `apps/api/src` línea por línea |
| 1 | Módulos, controladores, providers, DI | Módulo `health` con `GET /health` (test primero) |
| 2 | DI con tokens: puertos y adaptadores | Primer puerto con adaptador en memoria |
| 3 | Configuración y arranque fail-fast | `config/` con validación zod |
| 4 | Pipes, filtros, validación | Filtro de errores RFC 7807 |
| 5 | Guards y decoradores propios | `JwtAuthGuard` global, `@Public()`, `@Roles()` |
| 6 | Kernel en TS puro | `Result<T,E>`, `DomainError`, `Clock` con unit tests |
| 7 | Hexagonal en la práctica | Módulo `auth`: caso de uso `Login` con fakes |
| 8 | Datos con MySQL | Repositorio parametrizado, migraciones en `infra/db/init` |
| 9 | Testing e2e | e2e de guards y filtro con supertest |
| 10 | Integración con el frontend | Pantalla de login y listado de socios en `apps/web` |

## Primera tarea (Lección 1)

1. Lee `apps/api/src/app.module.ts`, `app.controller.ts` y `app.service.ts` y responde con tus palabras:
   - ¿Quién crea la instancia de `AppService` que recibe `AppController`?
   - ¿Qué pasa si quitas `AppService` de `providers`?
   - ¿Por qué el constructor usa `private readonly`?
2. Ejecuta `pnpm dev` y abre `http://localhost:5173`: debe mostrar `API: Hello World!`.
3. Test primero: `GET /health` devuelve `{ "status": "ok" }`. Cuando pase, avisa al tutor.
