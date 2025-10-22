# 🚀 Instrucciones de Deploy - Quipu Survey

## ✅ Paso 2: Crear Repositorio en GitHub

### Opción A: Desde la Web (Más fácil)

1. **Ve a GitHub**: [https://github.com/new](https://github.com/new)

2. **Llena los campos:**
   - **Repository name:** `encuesta-quipu` (o el nombre que prefieras)
   - **Description:** "Formulario interactivo multi-step para encuesta Quipu"
   - **Public/Private:** Tu elección (Public recomendado para Vercel gratis)
   - **NO** marques "Add a README file"
   - **NO** marques "Add .gitignore"
   - **NO** marques "Choose a license"

3. **Click "Create repository"**

4. **Copia el comando que GitHub te muestra** (será algo como):
   ```bash
   git remote add origin https://github.com/TU_USUARIO/encuesta-quipu.git
   git branch -M main
   git push -u origin main
   ```

5. **Ejecuta esos comandos en tu terminal** (desde la carpeta del proyecto)

---

### Opción B: Desde la Terminal (Más rápido)

**Requisito:** Tener instalado GitHub CLI (`gh`)

Si no lo tienes:
```bash
brew install gh  # En Mac
# o descarga desde: https://cli.github.com/
```

Luego:
```bash
# Autenticarse (solo primera vez)
gh auth login

# Crear el repo y hacer push automáticamente
gh repo create encuesta-quipu --public --source=. --push
```

¡Eso es todo! Ya estará en GitHub.

---

## ✅ Paso 3: Conectar GitHub a Vercel

1. **Ve a Vercel**: [https://vercel.com/login](https://vercel.com/login)

2. **Inicia sesión** con tu cuenta de GitHub (o crea una)

3. **Click en "Add New..." → "Project"**

4. **Import Git Repository:**
   - Verás una lista de tus repos de GitHub
   - Busca `encuesta-quipu` (o el nombre que usaste)
   - Click en **"Import"**

5. **Configure Project:**
   - **Framework Preset:** Vite (debería detectarlo automáticamente)
   - **Root Directory:** `./` (dejar por defecto)
   - **Build Command:** `npm run build` (ya está)
   - **Output Directory:** `dist` (ya está)

6. **Environment Variables** (⚠️ IMPORTANTE):
   - Click en **"Environment Variables"** (o el dropdown que dice "Add")
   - Agrega la variable:
     - **Name:** `VITE_GOOGLE_SHEETS_URL`
     - **Value:** `https://script.google.com/macros/s/AKfycby9uTwKogHrzqkx8suZ4FYzMKK6A7vPE7Xwd-FJdOMO1BUsfiTwUFL8Ge3cLhN4lzWGIw/exec`
     - **Environment:** All (Production, Preview, Development)
   - Click **"Add"**

7. **Click "Deploy"**

8. **¡Espera 1-2 minutos!** 🎉

---

## ✅ Paso 4: Probar la Aplicación Deployed

1. Vercel te dará una URL como:
   ```
   https://encuesta-quipu.vercel.app
   ```

2. **Abre la URL** en tu navegador

3. **Completa y envía el formulario**

4. **Verifica en Google Sheets** que aparezca la nueva fila

5. **¡Listo!** ✨ Ya no habrá error de CORS

---

## 🔧 Troubleshooting

### Si el deploy falla:

1. **Revisa los logs** en Vercel (hay un botón "View Build Logs")

2. **Errores comunes:**
   - Variable de entorno mal configurada → Revisa que el nombre sea exactamente `VITE_GOOGLE_SHEETS_URL`
   - Build fallido → Corre `npm run build` localmente para ver el error

### Si el formulario no envía:

1. **Abre la consola del navegador** (F12)

2. **Busca errores** en la pestaña Console

3. **Verifica que la variable de entorno se cargó:**
   ```javascript
   // Corre esto en la consola del navegador (en la app deployed)
   console.log('URL configurada:', import.meta.env.VITE_GOOGLE_SHEETS_URL)
   ```

4. Si sale `undefined`, la variable no se configuró bien en Vercel

---

## 🎯 Próximos Pasos (Opcional)

### Configurar un Dominio Custom

1. En Vercel, ve a **Settings → Domains**
2. Agrega tu dominio (ej: `encuesta.quipu.com.co`)
3. Sigue las instrucciones de DNS

### Configurar Automatic Deployments

Vercel ya lo hace automáticamente! Cada vez que hagas `git push` a `main`, se redeploya.

Para hacer cambios:
```bash
# Hacer cambios en el código
git add .
git commit -m "Mensaje del cambio"
git push

# Vercel automáticamente detecta el push y redeploya
```

---

## 📞 ¿Necesitas Ayuda?

- **Vercel Docs:** https://vercel.com/docs
- **GitHub Docs:** https://docs.github.com
- **Revisa los logs** en Vercel si algo falla

---

**¡Éxito con el deploy!** 🚀
