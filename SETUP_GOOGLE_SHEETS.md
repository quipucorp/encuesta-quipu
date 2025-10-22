# 🚀 Guía Rápida: Configurar Google Sheets

Esta guía te llevará paso a paso para conectar el formulario con tu Google Sheet.

## ✅ Paso 1: Preparar el Google Apps Script

### 1.1 Abrir el Editor de Scripts

1. Ve a tu Google Sheet: [https://docs.google.com/spreadsheets/d/1l9iWeJKH1EiD2DELLVGxBjbqxVnFsNo-T_OYgoYdp0M/edit](https://docs.google.com/spreadsheets/d/1l9iWeJKH1EiD2DELLVGxBjbqxVnFsNo-T_OYgoYdp0M/edit)

2. Haz clic en **Extensions** → **Apps Script**

3. Se abrirá una nueva pestaña con el editor de código

### 1.2 Copiar el Script

1. En el editor, borra todo el código que aparece por defecto

2. Abre el archivo `google-apps-script.js` en el proyecto

3. **Copia TODO el contenido** del archivo

4. **Pega** el código en el editor de Apps Script

5. **IMPORTANTE:** Si tu hoja de Google Sheets NO se llama "Sheet1":
   - Busca la línea 11 en el código: `const SHEET_NAME = 'Sheet1';`
   - Cámbiala por el nombre real de tu hoja

6. Haz clic en el icono de **guardar** (💾) o presiona `Ctrl+S` (Windows) / `Cmd+S` (Mac)

### 1.3 Autorizar el Script (Primera Vez)

1. En el editor, arriba del código, hay un dropdown que dice `Code.gs`

2. Cámbialo a **`testScript`**

3. Haz clic en el botón **Run** (▶️)

4. Aparecerá un diálogo: **"Authorization required"**
   - Haz clic en **"Review Permissions"**
   - Selecciona tu cuenta de Google
   - Verás una advertencia: **"Google hasn't verified this app"**
   - Haz clic en **"Advanced"** (abajo a la izquierda)
   - Haz clic en **"Go to [nombre del proyecto] (unsafe)"**
   - Haz clic en **"Allow"**

5. El script se ejecutará y debería completarse sin errores

6. **¡Revisa tu Google Sheet!** Deberías ver ahora la primera fila con los encabezados:
   ```
   Fecha y Hora | Género | Edad | Ciudad | ... (18 columnas en total)
   ```

---

## ✅ Paso 2: Publicar como Web App

### 2.1 Crear Deployment

1. En el editor de Apps Script, haz clic en **Deploy** → **New deployment**

2. Haz clic en el icono de **engranaje** ⚙️ junto a "Select type"

3. Selecciona **Web app**

4. Llena los campos:
   - **Description:** "Quipu Survey API" (o el nombre que prefieras)
   - **Execute as:** **Me** (tu correo)
   - **Who has access:** **Anyone** ⚠️ (importante para que el formulario público funcione)

5. Haz clic en **Deploy**

6. Aparecerá un diálogo con una URL larga que empieza con:
   ```
   https://script.google.com/macros/s/AKfycby...../exec
   ```

7. **¡COPIA ESTA URL!** La necesitarás en el siguiente paso

---

## ✅ Paso 3: Configurar el Frontend

### 3.1 Actualizar .env

1. En el proyecto, abre el archivo `.env`

2. Pega la URL que copiaste en el paso anterior:
   ```bash
   VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/TU_URL_AQUI/exec
   ```

3. Guarda el archivo

### 3.2 Reiniciar el Servidor de Desarrollo

Si el servidor ya estaba corriendo:

```bash
# Detén el servidor (Ctrl+C)
# Inícialo de nuevo
npm run dev
```

---

## ✅ Paso 4: ¡Probar!

### 4.1 Hacer una Prueba Completa

1. Abre el formulario en tu navegador: `http://localhost:5173`

2. Haz clic en **"Iniciar encuesta"**

3. Llena todos los pasos del formulario

4. Envía el formulario

5. Deberías ver el mensaje: **"¡Encuesta completada!"**

### 4.2 Verificar en Google Sheets

1. Ve a tu Google Sheet

2. Deberías ver una **nueva fila** con todos los datos que acabas de enviar

3. La columna A (Fecha y Hora) debe mostrar la fecha/hora actual en formato Colombia (GMT-5)

### 4.3 Revisar la Consola del Navegador

1. Abre las Herramientas de Desarrollo (F12)

2. Ve a la pestaña **Console**

3. Busca logs que empiecen con `[API]`:
   ```
   [API] Enviando datos a Google Sheets...
   [API] Respuesta de Google Sheets: {success: true, ...}
   ```

---

## 🐛 Solución de Problemas

### Error: "VITE_GOOGLE_SHEETS_URL no está configurada"

**Causa:** El archivo `.env` no tiene la URL o no se cargó correctamente

**Solución:**
1. Verifica que el archivo `.env` existe en la raíz del proyecto
2. Verifica que la línea `VITE_GOOGLE_SHEETS_URL=...` tiene una URL válida
3. Reinicia el servidor (`npm run dev`)

---

### Error: "Failed to fetch" o CORS error

**Causa:** El script no está publicado correctamente o no tiene permisos de "Anyone"

**Solución:**
1. Ve a Apps Script → **Deploy** → **Manage deployments**
2. Haz clic en el icono de lápiz ✏️
3. Verifica que "Who has access" está en **"Anyone"**
4. Haz clic en **Deploy** nuevamente
5. Copia la **nueva URL** y actualízala en `.env`

---

### Los datos no aparecen en el Sheet

**Causa:** El nombre de la hoja no coincide con el del script

**Solución:**
1. Verifica el nombre de tu hoja en Google Sheets (pestaña inferior)
2. Si no es "Sheet1", actualiza el script:
   - Línea 11: `const SHEET_NAME = 'TuNombreDeHoja';`
3. Guarda y vuelve a hacer **Deploy** → **Manage deployments** → **Edit** → **Deploy**

---

### Los encabezados se crearon dos veces

**Causa:** Ejecutaste `testScript` varias veces o había encabezados previos

**Solución:**
1. Borra las filas duplicadas manualmente en Google Sheets
2. El script solo crea encabezados si la primera fila está completamente vacía

---

## 📞 ¿Necesitas Ayuda?

Si algo no funciona:

1. **Verifica los logs del navegador** (Consola de Desarrollador)
2. **Verifica los logs de Apps Script:**
   - En el editor, ve a **Executions** (menú lateral izquierdo)
   - Busca el log de la última ejecución
   - Revisa si hay errores en rojo
3. **Revisa el README.md** para instrucciones más detalladas

---

## ✅ ¡Listo!

Una vez que todo funcione:

1. Puedes hacer **deploy a producción** (Netlify/Vercel)
2. Recuerda configurar la variable `VITE_GOOGLE_SHEETS_URL` en el panel de tu hosting
3. ¡El formulario estará listo para recibir respuestas reales!

**Nota de Seguridad:** El Google Apps Script con acceso "Anyone" solo permite escribir datos al Sheet. Nadie puede leer ni modificar el contenido existente sin permisos de tu cuenta de Google.
