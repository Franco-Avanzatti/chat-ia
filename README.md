# 💬 MiChat – AI Chat App

Aplicación web de chat desarrollada con **Next.js 16**, **React 19** y **TypeScript**, enfocada en una **arquitectura moderna**, estado persistente en el cliente y una interfaz limpia construida con **Tailwind CSS v4**.

El proyecto utiliza el **App Router**, componentes cliente (`use client`) y buenas prácticas actuales de React (lazy state initialization, efectos mínimos).

---

## 🚀 Tech Stack

- **Next.js 16 (App Router)**
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **AI SDK**
  - `ai`
  - `@ai-sdk/openai`
  - `@ai-sdk/groq`
- **ESLint**

---

## ✨ Características

- 💬 Interfaz de chat moderna
- 💾 Persistencia de mensajes en `localStorage`
- ♻️ Restauración automática de conversaciones
- 🧠 Manejo de estado optimizado (sin efectos innecesarios)
- 🧼 Código tipado y limpio
- 🎨 Estilos con variables CSS y Tailwind

---

## ▶️ Cómo ejecutar el proyecto

### 1️⃣ Instalar dependencias
```bash
npm install
```

### 2️⃣ Ejecutar en desarrollo
```bash
npm run dev
```

📍 App disponible en:  
http://localhost:3000

---

## 🧠 Detalles técnicos

- Estado inicial cargado mediante **lazy initialization** (`useState(() => ...)`)
- Persistencia sincronizada con `localStorage`
- Evita renders innecesarios y warnings de React moderno
- Preparado para despliegue en plataformas como **Railway** o **Vercel**

---

## 📦 Scripts disponibles

```bash
npm run dev      # Desarrollo
npm run build    # Build de producción
npm run start    # Ejecutar build
npm run lint     # Linter
```

---

## 📄 Licencia


