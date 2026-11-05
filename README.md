# Palmira Cruz — Consultoría y Palmira AI

## Requisitos

- Node.js 20.19 o posterior (requerido por Vite 8).
- npm.

## Desarrollo local

Desde la carpeta del proyecto, instala las dependencias e inicia el servidor:

```powershell
npm.cmd install
npm.cmd run dev
```

Abre [http://localhost:3000](http://localhost:3000).

La aplicación y el generador de propuestas funcionan sin credenciales usando
plantillas locales. Para habilitar la generación con Gemini, configura
`GEMINI_API_KEY` en un archivo `.env` local; esta clave es opcional.

## Producción

```powershell
npm.cmd run build
$env:NODE_ENV = "production"
npm.cmd start
```

El servidor de producción sirve el contenido generado en `dist`.
