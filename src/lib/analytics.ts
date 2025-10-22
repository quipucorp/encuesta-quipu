// Analytics instrumentation using window.dataLayer

declare global {
  interface Window {
    dataLayer: Array<Record<string, any>>;
  }
}

// Initialize dataLayer if it doesn't exist
if (typeof window !== 'undefined' && !window.dataLayer) {
  window.dataLayer = [];
}

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  const event = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...properties,
  };

  window.dataLayer.push(event);
  console.log('[Analytics]', event);
};

export const trackSurveyStarted = () => {
  trackEvent('survey_started');
};

export const trackStepCompleted = (step: number) => {
  trackEvent('step_completed', { step });
};

export const trackSurveySubmitted = (data: {
  city: string;
  docType: string;
  used_gotagota: boolean;
}) => {
  // Don't include document number for privacy
  trackEvent('survey_submitted', {
    city: data.city,
    docType: data.docType,
    used_gotagota: data.used_gotagota,
  });
};

export const trackFormFieldInteraction = (fieldName: string) => {
  trackEvent('field_interaction', { fieldName });
};

export const trackValidationError = (step: number, errors: string[]) => {
  trackEvent('validation_error', { step, errors });
};
