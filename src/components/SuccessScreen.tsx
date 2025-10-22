import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { CheckCircle, Share2, Trash2 } from 'lucide-react';
import { clearSurveyData } from '@/lib/storage';

interface SuccessScreenProps {
  onClearData: () => void;
}

export function SuccessScreen({ onClearData }: SuccessScreenProps) {
  const handleShare = () => {
    const message = encodeURIComponent(
      '¡Acabo de completar la encuesta de Quipu! Ayuda a mejorar el acceso a financiamiento para emprendedores en Colombia. 🇨🇴'
    );
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://wa.me/?text=${message}%20${url}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleClearData = () => {
    if (
      confirm(
        '¿Estás seguro de que quieres borrar tus datos locales? Esta acción no se puede deshacer.'
      )
    ) {
      clearSurveyData();
      onClearData();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[60vh] flex items-center justify-center px-4 py-12"
    >
      <Card className="max-w-2xl w-full border-quipu-teal/30 shadow-xl">
        <CardHeader className="text-center pb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mx-auto mb-4 w-20 h-20 bg-quipu-lime/20 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="w-12 h-12 text-quipu-lime" />
          </motion.div>

          <CardTitle className="text-3xl font-bold text-ink">
            ¡Encuesta completada!
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center space-y-3">
            <p className="text-lg text-ink/80">
              Gracias por tu tiempo y por compartir tu experiencia con nosotros.
            </p>
            <p className="text-muted-foreground">
              Tu aporte es invaluable para ayudarnos a diseñar mejores
              soluciones financieras que se ajusten a las necesidades reales de
              emprendedores como tú en Colombia.
            </p>
          </div>

          <div className="bg-surface p-6 rounded-lg space-y-3">
            <h3 className="font-semibold text-ink flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-quipu-teal" />
              ¿Qué sigue?
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground ml-7">
              <li>• Analizaremos tus respuestas junto con las de otros participantes</li>
              <li>• Identificaremos patrones y necesidades comunes</li>
              <li>
                • Usaremos esta información para mejorar nuestros productos y
                servicios
              </li>
              <li>
                • Contribuirás a crear un ecosistema financiero más justo e
                inclusivo
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleShare}
              variant="outline"
              className="flex-1 touch-target"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartir por WhatsApp
            </Button>

            <Button
              onClick={handleClearData}
              variant="ghost"
              className="flex-1 touch-target text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Borrar mis datos locales
            </Button>
          </div>

          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              ¿Tienes alguna pregunta?{' '}
              <a
                href="https://quipu.com.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-quipu-teal hover:underline font-medium"
              >
                Visita quipu.com.co
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
