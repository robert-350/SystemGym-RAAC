# Dominio: GymFlow

Especificación de lo que hay que construir. Cada módulo vive en `apps/api/src/modules/<nombre>/` con capas `domain` / `application` / `infrastructure` / `presentation` (ver `LEARNING.md`).

## Módulos

| # | Módulo | Qué resuelve | Reglas clave |
| --- | --- | --- | --- |
| 1 | `auth` | Login del personal, roles `ADMIN`, `RECEPTIONIST`, `TRAINER` | Mensaje de error único para credenciales inválidas; contraseñas con hash; access token corto |
| 2 | `members` | Alta, edición y baja lógica de socios | Email único; un socio dado de baja conserva su historial |
| 3 | `plans` | Catálogo de planes (mensual, trimestral, anual) | Precio y duración en días; un plan archivado no se puede vender |
| 4 | `memberships` | Contratación de un plan por un socio | Un socio no tiene dos membresías activas que se traslapen; `endsAt = startsAt + duración` |
| 5 | `payments` | Pagos de membresías | Importe como entero en centavos, nunca `float`; un pago no se edita, se reembolsa |
| 6 | `classes` | Clases con horario, cupo y entrenador | No se puede reservar sobre el cupo; no se reserva sin membresía activa |
| 7 | `attendance` | Check-in en recepción | Check-in solo con membresía vigente; un check-in por día y socio |
| 8 | `reports` | Ingresos del mes, socios por vencer, ocupación de clases | Solo lectura; agregación en SQL |

## Contrato de API (convenciones)

- Prefijo `/v1`, JSON `camelCase`, recursos en plural (`/v1/members`).
- Fechas ISO 8601; dinero en centavos (`priceCents`).
- Errores con el código HTTP real y cuerpo RFC 7807 (`application/problem+json`); nunca `200` con un flag de error.
- Listas: `{ items, total, page, pageSize }`.
- Todo protegido por defecto; las rutas públicas se marcan con `@Public()`.

## Orden de construcción sugerido

`health` → `config` → `shared/kernel` → filtro de errores → `auth` → `members` → `plans` → `memberships` → `payments` → `classes` → `attendance` → `reports`.

Cada módulo se cierra con: tests de dominio y de casos de uso (con fakes), repositorio sobre MySQL, controlador con validación, e2e, y la pantalla correspondiente en `apps/web`.
