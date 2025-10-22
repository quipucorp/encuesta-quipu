/**
 * Google Apps Script para recibir datos del formulario Quipu
 *
 * INSTRUCCIONES DE INSTALACIÓN:
 * 1. Abre tu Google Sheet: https://docs.google.com/spreadsheets/d/1l9iWeJKH1EiD2DELLVGxBjbqxVnFsNo-T_OYgoYdp0M/edit
 * 2. Ve a Extensions → Apps Script
 * 3. Borra el código default y pega este script completo
 * 4. Guarda (Ctrl+S o Cmd+S)
 * 5. Haz clic en "Deploy" → "New deployment"
 * 6. Tipo: "Web app"
 * 7. Execute as: "Me"
 * 8. Who has access: "Anyone"
 * 9. Copia la URL que te da (la necesitarás para el .env del frontend)
 */

// Configuración
const SHEET_NAME = 'Sheet1'; // Cambia esto si tu hoja tiene otro nombre

// Nombres de las columnas (en orden)
const HEADERS = [
  'Fecha y Hora',
  'Género',
  'Edad',
  'Ciudad',
  'Tipo de Documento',
  'Número de Documento',
  'Negocios Activos',
  'Nombre del Negocio',
  'Cambio en Ingresos',
  'Empleados Actuales',
  'Cambio en Empleados',
  'Usó Gota a Gota',
  'Frecuencia Gota a Gota',
  'Razones Gota a Gota',
  'Razón Otra (Gota a Gota)',
  'Otros Financiamientos',
  'Otro Financiamiento (Especificar)',
  'Consentimiento Privacidad'
];

/**
 * Verifica si los encabezados existen, si no, los crea
 */
function ensureHeaders() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error(`Sheet "${SHEET_NAME}" no encontrado. Verifica el nombre.`);
  }

  // Verificar si la primera fila está vacía
  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const isEmpty = firstRow.every(cell => cell === '');

  if (isEmpty) {
    // Escribir encabezados
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);

    // Formatear encabezados (negrita, fondo gris)
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#f3f3f3');
    headerRange.setHorizontalAlignment('center');

    // Auto-ajustar columnas
    for (let i = 1; i <= HEADERS.length; i++) {
      sheet.autoResizeColumn(i);
    }

    Logger.log('Encabezados creados exitosamente');
  }

  return sheet;
}

/**
 * Procesa los datos del formulario y los guarda
 * (función helper usada por doGet y doPost)
 */
function processFormSubmission(data) {
  // Asegurar que los encabezados existen
  const sheet = ensureHeaders();

  // Formatear timestamp (Colombia timezone: GMT-5)
  const timestamp = Utilities.formatDate(
    new Date(),
    'America/Bogota',
    'yyyy-MM-dd HH:mm:ss'
  );

  // Construir la fila con los datos
  const row = [
    timestamp,                                          // A: Fecha y Hora
    data.step1?.gender || '',                          // B: Género
    data.step1?.age || '',                             // C: Edad
    data.step1?.city || '',                            // D: Ciudad
    data.step1?.documentType || '',                    // E: Tipo de Documento
    data.step1?.documentNumber || '',                  // F: Número de Documento
    data.step2?.activeBusinesses || '',                // G: Negocios Activos
    data.step2?.businessName || '',                    // H: Nombre del Negocio
    data.step3?.incomeChange || '',                    // I: Cambio en Ingresos
    data.step4?.currentEmployees || '',                // J: Empleados Actuales
    data.step4?.employeeChange || '',                  // K: Cambio en Empleados
    data.step5?.usedGotaGota || '',                    // L: Usó Gota a Gota
    data.step5?.gotaGotaFrequency || '',               // M: Frecuencia Gota a Gota
    formatArray(data.step5?.gotaGotaReasons),          // N: Razones Gota a Gota
    data.step5?.gotaGotaReasonOther || '',             // O: Razón Otra
    formatArray(data.step5?.otherFinancing),           // P: Otros Financiamientos
    data.step5?.otherFinancingOther || '',             // Q: Otro Financiamiento
    data.step6?.privacyConsent ? 'TRUE' : 'FALSE'      // R: Consentimiento
  ];

  // Agregar la fila al final del sheet
  sheet.appendRow(row);

  return timestamp;
}

/**
 * Maneja las peticiones POST del formulario
 */
function doPost(e) {
  try {
    // Parsear el cuerpo JSON
    const data = JSON.parse(e.postData.contents);
    Logger.log('POST - Datos recibidos:', JSON.stringify(data, null, 2));

    const timestamp = processFormSubmission(data);

    Logger.log('Fila agregada exitosamente (POST)');

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Datos guardados correctamente',
        timestamp: timestamp
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error en POST:', error.toString());

    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Maneja las peticiones GET
 * IMPORTANTE: También procesa envíos de formulario via GET para evitar CORS
 */
function doGet(e) {
  try {
    // Si hay parámetro 'data', es un envío de formulario
    if (e.parameter && e.parameter.data) {
      Logger.log('GET con data - Request recibido');

      const data = JSON.parse(decodeURIComponent(e.parameter.data));
      Logger.log('GET - Datos parseados:', JSON.stringify(data, null, 2));

      const timestamp = processFormSubmission(data);

      Logger.log('Fila agregada exitosamente (GET)');

      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: 'Datos guardados correctamente',
          timestamp: timestamp
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Si no hay data, es una prueba de conexión
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'OK',
        message: 'Google Apps Script para Encuesta Quipu está funcionando',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error en GET:', error.toString());

    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Formatea un array como string separado por punto y coma
 */
function formatArray(arr) {
  if (!arr || !Array.isArray(arr) || arr.length === 0) {
    return '';
  }
  return arr.join('; ');
}

/**
 * Función de prueba (ejecuta esto desde el editor para verificar)
 */
function testScript() {
  // Datos de prueba
  const testData = {
    step1: {
      gender: 'Mujer',
      age: 35,
      city: 'Bogotá',
      documentType: 'Cédula de ciudadanía',
      documentNumber: '1234567890'
    },
    step2: {
      activeBusinesses: 'Uno',
      businessName: 'Tienda de Abarrotes La Esquina'
    },
    step3: {
      incomeChange: 'Han aumentado menos del 25 %'
    },
    step4: {
      currentEmployees: '2 personas',
      employeeChange: 'La misma cantidad'
    },
    step5: {
      usedGotaGota: 'No',
      otherFinancing: ['Familiares', 'Banco tradicional']
    },
    step6: {
      privacyConsent: true
    }
  };

  // Simular POST request
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(mockEvent);
  Logger.log('Test result:', result.getContent());
}
