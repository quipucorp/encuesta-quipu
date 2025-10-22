import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface StickyActionsProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  isNextDisabled?: boolean;
  isLastStep: boolean;
}

export function StickyActions({
  currentStep,
  onBack,
  onNext,
  isNextDisabled = false,
  isLastStep,
}: StickyActionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg z-40 md:relative md:border-0 md:shadow-none md:bg-transparent md:mt-8"
    >
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {currentStep > 1 ? (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="touch-target"
            aria-label="Volver al paso anterior"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Atrás
          </Button>
        ) : (
          <div />
        )}

        <Button
          type="submit"
          onClick={onNext}
          disabled={isNextDisabled}
          className="touch-target bg-quipu-teal hover:bg-quipu-teal/90 text-white ml-auto"
          aria-label={isLastStep ? 'Enviar respuestas' : 'Siguiente paso'}
        >
          {isLastStep ? (
            <>
              Enviar respuestas
              <Send className="h-4 w-4 ml-2" />
            </>
          ) : (
            <>
              Siguiente
              <ChevronRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
