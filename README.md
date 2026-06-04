# 🌍 Country Quiz App

Aplicación de quiz de geografía mundial construida con React + TypeScript + Tailwind CSS.

## Stack tecnológico

- **React 18** con TypeScript
- **React Router v6** para el enrutamiento
- **Tailwind CSS** para los estilos
- **Vitest** + Testing Library para pruebas unitarias
- **ESLint** para calidad de código
- **Vite** como bundler

## Características

- 🌐 10 preguntas aleatorias de capitales y banderas del mundo
- ⏱️ Contrarreloj de 15 segundos por pregunta
- 🏆 Racha máxima guardada en `localStorage`
- 🌙 Modo oscuro / claro con clases `dark:` de Tailwind
- 🔊 Efectos de sonido con Web Audio API (sin archivos externos)
- ✅ 4 pruebas unitarias

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Pantalla de inicio |
| `/quiz` | Juego activo |
| `/results` | Pantalla de resultados |

## Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Ejecutar pruebas
npm run test

# Build para producción
npm run build

# Verificar linting
npm run lint
```

## Estructura del proyecto

```
src/
  components/     # DarkModeToggle, QuizCard, Timer, ScoreBar
  pages/          # Home, Quiz, Results
  hooks/          # useDarkMode, useHighScore, useTimer, useSound
  services/       # countriesApi.ts
  __tests__/      # quiz.test.tsx (4 pruebas unitarias)
```

## Despliegue

La aplicación está desplegada en Netlify con CI/CD automático.
Cualquier push a `main` dispara un nuevo despliegue.
