## Acceso a datos

- Las tablas están **sin RLS** de forma intencionada mientras la app solo se usa en local.
- La clave publishable no es pública: `.env.local` no está en git y la app no está desplegada.
- **Antes de desplegar**: activar RLS en las tres tablas y definir políticas de acceso.
