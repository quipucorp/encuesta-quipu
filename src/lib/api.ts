// API service for submitting survey data to Google Sheets

export interface SurveySubmissionResponse {
  success: boolean;
  message?: string;
  error?: string;
  timestamp?: string;
}

/**
 * Submit survey data to Google Sheets via Google Apps Script
 */
export async function submitSurveyToSheets(
  data: any
): Promise<SurveySubmissionResponse> {
  const apiUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;

  if (!apiUrl) {
    throw new Error(
      'VITE_GOOGLE_SHEETS_URL no está configurada. Revisa tu archivo .env'
    );
  }

  try {
    console.log('[API] Enviando datos a Google Sheets...', {
      url: apiUrl,
      dataKeys: Object.keys(data),
    });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      redirect: 'follow',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: SurveySubmissionResponse = await response.json();

    console.log('[API] Respuesta de Google Sheets:', result);

    if (!result.success) {
      throw new Error(result.error || 'Error desconocido al guardar datos');
    }

    return result;
  } catch (error) {
    console.error('[API] Error al enviar datos:', error);

    // Crear respuesta de error estructurada
    const errorMessage =
      error instanceof Error ? error.message : 'Error desconocido';

    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Test the Google Sheets API endpoint (GET request)
 */
export async function testGoogleSheetsConnection(): Promise<boolean> {
  const apiUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;

  if (!apiUrl) {
    console.error('[API] VITE_GOOGLE_SHEETS_URL no está configurada');
    return false;
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
    });

    if (!response.ok) {
      console.error('[API] Test failed:', response.status);
      return false;
    }

    const result = await response.json();
    console.log('[API] Test successful:', result);
    return true;
  } catch (error) {
    console.error('[API] Test error:', error);
    return false;
  }
}
