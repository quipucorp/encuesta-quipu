import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Hero } from './components/Hero';
import { IntroModal } from './components/IntroModal';
import { ProgressBar } from './components/ProgressBar';
import { StickyActions } from './components/StickyActions';
import { FAQ } from './components/FAQ';
import { SuccessScreen } from './components/SuccessScreen';
import { Step1 } from './components/steps/Step1';
import { Step2 } from './components/steps/Step2';
import { Step3 } from './components/steps/Step3';
import { Step4 } from './components/steps/Step4';
import { Step5 } from './components/steps/Step5';
import { Step6 } from './components/steps/Step6';
import {
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  Step5Data,
  Step6Data,
} from './lib/validation';
import {
  saveSurveyData,
  loadSurveyData,
  clearSurveyData,
  hasSavedData,
} from './lib/storage';
import {
  trackSurveyStarted,
  trackStepCompleted,
  trackSurveySubmitted,
} from './lib/analytics';
import { submitSurveyToSheets } from './lib/api';
import { Button } from './components/ui/button';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { Info, AlertCircle, Loader2 } from 'lucide-react';

type FormData = {
  step1?: Step1Data;
  step2?: Step2Data;
  step3?: Step3Data;
  step4?: Step4Data;
  step5?: Step5Data;
  step6?: Step6Data;
};

type ViewMode = 'landing' | 'form' | 'success';

const TOTAL_STEPS = 6;

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [showRestorePrompt, setShowRestorePrompt] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const currentStepRef = useRef<HTMLDivElement>(null);

  // Check for saved data on mount
  useEffect(() => {
    if (hasSavedData()) {
      setShowRestorePrompt(true);
    }
  }, []);

  const handleRestoreSavedData = () => {
    const saved = loadSurveyData();
    if (saved) {
      setFormData(saved.data);
      setCurrentStep(saved.currentStep);
      setViewMode('form');
      setShowRestorePrompt(false);
      setShowIntroModal(true);
    }
  };

  const handleStartFresh = () => {
    clearSurveyData();
    setShowRestorePrompt(false);
  };

  const handleStartSurvey = () => {
    setViewMode('form');
    setShowIntroModal(true);
    trackSurveyStarted();
  };

  const handleCloseIntroModal = () => {
    setShowIntroModal(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStepSubmit = (stepNumber: number, data: any) => {
    const updatedFormData = {
      ...formData,
      [`step${stepNumber}`]: data,
    };

    setFormData(updatedFormData);
    trackStepCompleted(stepNumber);

    // Save to localStorage
    saveSurveyData(stepNumber, updatedFormData);

    if (stepNumber < TOTAL_STEPS) {
      setCurrentStep(stepNumber + 1);
      scrollToTop();
    } else {
      // Final submission
      handleFinalSubmit(updatedFormData);
    }
  };

  const handleFinalSubmit = async (finalData: FormData) => {
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      // Track analytics (before submission)
      trackSurveySubmitted({
        city: finalData.step1?.city || '',
        docType: finalData.step1?.documentType || '',
        used_gotagota: finalData.step5?.usedGotaGota === 'Sí',
      });

      // Log data for debugging (with privacy protection)
      console.log('[API] Submitting survey data:', {
        ...finalData,
        step1: {
          ...finalData.step1,
          documentNumber: '[REDACTED FOR CONSOLE]',
        },
      });

      // Submit to Google Sheets
      const result = await submitSurveyToSheets(finalData);

      if (!result.success) {
        throw new Error(result.error || 'Error al guardar los datos');
      }

      console.log('[API] Submission successful:', result);

      // Clear localStorage after successful submission
      clearSurveyData();

      // Show success screen
      setViewMode('success');
      scrollToTop();
    } catch (error) {
      console.error('[API] Submission failed:', error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Error desconocido al enviar el formulario';

      setSubmissionError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetrySubmission = () => {
    if (formData) {
      handleFinalSubmit(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      scrollToTop();
    }
  };

  const handleNext = () => {
    // Trigger form submission on current step
    if (currentStepRef.current) {
      // Find the form element within the current step
      const form = currentStepRef.current.querySelector('form');
      if (form) {
        form.dispatchEvent(
          new Event('submit', { cancelable: true, bubbles: true })
        );
      }
    }
  };

  const handleClearDataAndReset = () => {
    setViewMode('landing');
    setCurrentStep(1);
    setFormData({});
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            onSubmit={(data) => handleStepSubmit(1, data)}
            defaultValues={formData.step1}
          />
        );
      case 2:
        return (
          <Step2
            onSubmit={(data) => handleStepSubmit(2, data)}
            defaultValues={formData.step2}
          />
        );
      case 3:
        return (
          <Step3
            onSubmit={(data) => handleStepSubmit(3, data)}
            defaultValues={formData.step3}
          />
        );
      case 4:
        return (
          <Step4
            onSubmit={(data) => handleStepSubmit(4, data)}
            defaultValues={formData.step4}
          />
        );
      case 5:
        return (
          <Step5
            onSubmit={(data) => handleStepSubmit(5, data)}
            defaultValues={formData.step5}
          />
        );
      case 6:
        return (
          <Step6
            onSubmit={(data) => handleStepSubmit(6, data)}
            defaultValues={formData.step6}
          />
        );
      default:
        return null;
    }
  };

  if (viewMode === 'success') {
    return (
      <div className="min-h-screen bg-background">
        <SuccessScreen onClearData={handleClearDataAndReset} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Restore data prompt */}
      <AnimatePresence>
        {showRestorePrompt && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Alert className="max-w-lg bg-white">
              <Info className="h-5 w-5 text-quipu-teal" />
              <AlertDescription className="space-y-4">
                <p className="font-medium text-ink">
                  Encontramos una encuesta en progreso
                </p>
                <p className="text-sm text-muted-foreground">
                  Tienes respuestas guardadas en este dispositivo. ¿Quieres
                  continuar donde lo dejaste o empezar de nuevo?
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={handleRestoreSavedData}
                    className="flex-1 bg-quipu-teal hover:bg-quipu-teal/90"
                  >
                    Continuar
                  </Button>
                  <Button
                    onClick={handleStartFresh}
                    variant="outline"
                    className="flex-1"
                  >
                    Empezar de nuevo
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </AnimatePresence>

      {/* Intro Modal */}
      <IntroModal isOpen={showIntroModal} onClose={handleCloseIntroModal} />

      {/* Landing View */}
      {viewMode === 'landing' && (
        <>
          <Hero onStartSurvey={handleStartSurvey} />
          <FAQ />
        </>
      )}

      {/* Form View */}
      {viewMode === 'form' && (
        <>
          <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

          <main className="max-w-3xl mx-auto px-4 py-8 pb-32 md:pb-8">
            {/* Submission Error Alert */}
            {submissionError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-5 w-5" />
                <AlertTitle>Error al enviar el formulario</AlertTitle>
                <AlertDescription className="space-y-3">
                  <p>{submissionError}</p>
                  <div className="flex gap-3">
                    <Button
                      onClick={handleRetrySubmission}
                      variant="outline"
                      size="sm"
                      className="bg-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        'Reintentar'
                      )}
                    </Button>
                    <Button
                      onClick={() => setSubmissionError(null)}
                      variant="ghost"
                      size="sm"
                    >
                      Cerrar
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Loading Overlay */}
            {isSubmitting && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 max-w-sm mx-4 text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-quipu-teal mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-ink mb-2">
                    Enviando tu encuesta...
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Por favor espera un momento
                  </p>
                </div>
              </div>
            )}

            <div ref={currentStepRef}>
              <AnimatePresence mode="wait">
                {renderCurrentStep()}
              </AnimatePresence>
            </div>
          </main>

          <StickyActions
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            onBack={handleBack}
            onNext={handleNext}
            isLastStep={currentStep === TOTAL_STEPS}
            isNextDisabled={isSubmitting}
          />
        </>
      )}
    </div>
  );
}

export default App;
