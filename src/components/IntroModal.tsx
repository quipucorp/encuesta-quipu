import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface IntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function IntroModal({ isOpen, onClose }: IntroModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Info className="h-6 w-6 text-quipu-teal" />
            Introducción a la encuesta
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="space-y-4 text-base text-ink/80">
          <p className="font-medium text-lg text-ink">
            ¡Gracias por participar en esta encuesta!
          </p>

          <p>
            En <strong className="text-quipu-teal">Quipu</strong>, trabajamos
            para comprender mejor las realidades, desafíos y oportunidades de
            la gente camelladora como tú. Tu participación nos ayudará
            a conocer cómo han cambiado los ingresos, el empleo y las fuentes de
            financiamiento en los últimos meses, con el fin de seguir diseñando
            soluciones financieras más útiles y adaptadas a tus necesidades.
          </p>

          <p className="font-medium">
            La información que compartas será <strong>confidencial</strong> y se
            utilizará únicamente con fines de análisis. No se divulgarán datos
            personales ni se asociarán tus respuestas a tu identidad.
          </p>
        </DialogDescription>

        <div className="flex justify-end mt-4">
          <Button
            onClick={onClose}
            className="bg-quipu-teal hover:bg-quipu-teal/90 touch-target"
          >
            Entendido, continuar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
