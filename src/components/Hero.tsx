import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onStartSurvey: () => void;
}

export function Hero({ onStartSurvey }: HeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-quipu-teal to-quipu-teal/80 text-white py-20 px-4 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-64 h-64 bg-quipu-yellow rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-quipu-lime rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
        >
          Con tu voz, mejoramos el crédito para la gente camelladora
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto"
        >
          Cuéntanos cómo te ha ido: ingresos, empleo y financiación. Tu
          información es confidencial y ayuda a diseñar mejores soluciones.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Button
            onClick={onStartSurvey}
            size="lg"
            className="bg-white text-quipu-teal hover:bg-white/90 font-semibold text-lg px-8 py-6 touch-target shadow-xl hover:shadow-2xl transition-all"
          >
            Iniciar encuesta
            <ChevronDown className="ml-2 h-5 w-5" />
          </Button>

          <p className="text-sm text-white/80 mt-4">
            Solo toma 5-7 minutos
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
