// LocalStorage utilities for autosave/restore

const STORAGE_KEY = 'quipu_survey_data';
const STORAGE_VERSION = '1.0';

export interface StoredSurveyData {
  version: string;
  currentStep: number;
  data: Record<string, any>;
  lastSaved: string;
}

export const saveSurveyData = (step: number, data: Record<string, any>) => {
  try {
    const storedData: StoredSurveyData = {
      version: STORAGE_VERSION,
      currentStep: step,
      data,
      lastSaved: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
    console.log('[Storage] Survey data saved', { step, dataKeys: Object.keys(data) });
  } catch (error) {
    console.error('[Storage] Failed to save survey data:', error);
  }
};

export const loadSurveyData = (): StoredSurveyData | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed: StoredSurveyData = JSON.parse(stored);

    // Check version compatibility
    if (parsed.version !== STORAGE_VERSION) {
      console.warn('[Storage] Version mismatch, clearing old data');
      clearSurveyData();
      return null;
    }

    console.log('[Storage] Survey data loaded', {
      step: parsed.currentStep,
      lastSaved: parsed.lastSaved,
    });

    return parsed;
  } catch (error) {
    console.error('[Storage] Failed to load survey data:', error);
    return null;
  }
};

export const clearSurveyData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('[Storage] Survey data cleared');
  } catch (error) {
    console.error('[Storage] Failed to clear survey data:', error);
  }
};

export const hasSavedData = (): boolean => {
  return localStorage.getItem(STORAGE_KEY) !== null;
};
