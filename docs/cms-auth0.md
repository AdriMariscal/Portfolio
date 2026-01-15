# CMS con Auth0 (Netlify)

## Qué hace el cambio en el repo

- Sustituye el widget de Netlify Identity en `/admin/` por Auth0 (SPA SDK).
- Añade un fichero de configuración local (`public/admin/auth0-config.js`) para que puedas
  introducir el `domain`, `clientId` y (opcionalmente) `audience` sin recompilar.

## Pasos de configuración (Auth0)

1. **Crea o selecciona un tenant en Auth0.**
2. **Crea una aplicación SPA** (Single Page Application) para el CMS.
3. **Configura URLs permitidas en la app de Auth0**:
   - **Allowed Callback URLs**:
     - `https://adrianmariscal.es/admin/`
     - `https://staging.adrianmariscal.es/admin/`
     - `https://<tu-sitio>.netlify.app/admin/` (si usas deploy previews)
     - `http://localhost:4321/admin/` (desarrollo local con Astro)
   - **Allowed Logout URLs**:
     - mismas URLs que arriba
   - **Allowed Web Origins**:
     - `https://adrianmariscal.es`
     - `https://staging.adrianmariscal.es`
     - `https://<tu-sitio>.netlify.app`
     - `http://localhost:4321`
4. **(Opcional) Crea un API en Auth0** si necesitas `audience`.

## Pasos de configuración (Netlify)

1. Instala la **extensión Auth0** en el sitio desde **Site configuration → Integrations**.
2. Vincula el tenant y la aplicación que creaste en Auth0.
3. Aplica la configuración a los contextos necesarios (Production / Deploy Preview / Branch).
4. Verifica que el sitio queda con Auth0 activo en **Access & security**.

## Configurar el frontend del CMS

1. Edita `public/admin/auth0-config.js`:
   - `AUTH0_DOMAIN` → tu dominio de Auth0 (ej: `tu-tenant.eu.auth0.com`)
   - `AUTH0_CLIENT_ID` → el Client ID de la SPA
   - `AUTH0_AUDIENCE` → opcional (déjalo vacío si no lo usas)
2. Guarda los cambios y despliega.

### Opción recomendada (usar variables creadas por Netlify Auth0)

Si instalaste la integración de Auth0 en Netlify, ya tienes estas variables creadas:

- `AUTH0_DOMAIN`
- `AUTH0_CLIENT_ID`
- `AUTH0_ISSUER_BASE_URL`

El build usa automáticamente `AUTH0_DOMAIN` y `AUTH0_CLIENT_ID` para generar
`public/admin/auth0-config.js`.

Si al pulsar **Iniciar sesión** no ocurre nada y en la consola aparece un error
de **CSP** bloqueando `cdn.auth0.com`, revisa el header de `/admin/*` en
`netlify.toml` (debe incluir `script-src-elem` con `https://cdn.auth0.com`).
Si el error persiste, asegúrate de que también exista un header específico
para `/admin` (sin asterisco), ya que algunos navegadores reportan la política
del documento raíz en lugar de `/admin/`.

Para evitar que Netlify bloquee el build por “secrets scanning” (son valores públicos),
añade también `SECRETS_SCAN_OMIT_KEYS` con el valor:

- `AUTH0_DOMAIN,AUTH0_CLIENT_ID,AUTH0_ISSUER_BASE_URL`

### Alternativa (variables PUBLIC_AUTH0_*)

Si no usas la integración de Auth0 en Netlify, puedes crear manualmente:

- `PUBLIC_AUTH0_DOMAIN`
- `PUBLIC_AUTH0_CLIENT_ID`
- `PUBLIC_AUTH0_AUDIENCE` (opcional)

Y añadir `SECRETS_SCAN_OMIT_KEYS` con:

- `PUBLIC_AUTH0_DOMAIN,PUBLIC_AUTH0_CLIENT_ID,PUBLIC_AUTH0_AUDIENCE`

El build genera `public/admin/auth0-config.js` automáticamente en `npm run build:auth0-config`.

## Notas importantes

- Este flujo usa Auth0 para iniciar sesión en el CMS y carga Decap CMS después del login.
- Si usas Git Gateway, asegúrate de que el token emitido por Auth0 está permitido por Netlify
  (esto se gestiona en la extensión de Auth0). Si no, el CMS podrá entrar pero no escribir
  contenidos en el repo.
