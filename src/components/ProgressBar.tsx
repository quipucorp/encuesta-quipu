import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-white border-b border-border sticky top-0 z-40 shadow-sm"
    >
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-ink">
            Paso {currentStep} de {totalSteps}
          </span>
          <span className="text-sm font-medium text-quipu-teal">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-2" aria-label={`Progreso: ${Math.round(progress)}%`} />
      </div>
    </motion.div>
  );
}
