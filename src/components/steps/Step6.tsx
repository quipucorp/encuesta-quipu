import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step6Schema, Step6Data } from '@/lib/validation';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield, CheckCircle } from 'lucide-react';

interface Step6Props {
  onSubmit: (data: Step6Data) => void;
  defaultValues?: Partial<Step6Data>;
}

export function Step6({ onSubmit, defaultValues }: Step6Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step6Data>({
    resolver: zodResolver(step6Schema),
    defaultValues: defaultValues || { privacyConsent: false },
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-ink mb-2">
              Privacidad y consentimiento
            </h2>
            <p className="text-muted-foreground">
              Antes de enviar tu encuesta, por favor revisa y acepta nuestros
              términos de privacidad.
            </p>
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertTitle>Protección de tus datos</AlertTitle>
            <AlertDescription className="space-y-2 mt-2">
              <p>
                En Quipu, la confidencialidad de tu información es nuestra
                prioridad. Los datos que compartas en esta encuesta:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Se utilizarán únicamente con fines de análisis estadístico</li>
                <li>No se asociarán a tu identidad personal</li>
                <li>No se compartirán con terceros</li>
                <li>
                  Nos ayudarán a diseñar mejores soluciones financieras para
                  personas emprendedoras
                </li>
              </ul>
            </AlertDescription>
          </Alert>

          <Controller
            name="privacyConsent"
            control={control}
            render={({ field }) => (
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-4 border border-border rounded-lg bg-card touch-target">
                  <Checkbox
                    id="privacyConsent"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-1"
                    aria-required
                    aria-invalid={!!errors.privacyConsent}
                    aria-describedby={
                      errors.privacyConsent
                        ? 'privacyConsent-error'
                        : 'privacyConsent-description'
                    }
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor="privacyConsent"
                      className="font-medium cursor-pointer leading-relaxed"
                    >
                      Acepto el tratamiento de mis datos para fines de análisis
                      de la encuesta
                      <span className="text-destructive ml-1">*</span>
                    </Label>
                    <p
                      id="privacyConsent-description"
                      className="text-sm text-muted-foreground mt-1"
                    >
                      Tu información será confidencial y no se asociará a tu
                      identidad.
                    </p>
                  </div>
                </div>

                {errors.privacyConsent && (
                  <p
                    id="privacyConsent-error"
                    className="text-sm text-destructive font-medium"
                    role="alert"
                  >
                    {errors.privacyConsent.message}
                  </p>
                )}
              </div>
            )}
          />

          <Alert className="border-quipu-lime bg-quipu-lime/10">
            <CheckCircle className="h-4 w-4 text-quipu-lime" />
            <AlertDescription>
              ¡Gracias por tu tiempo! Al hacer clic en "Enviar respuestas",
              contribuyes a mejorar el acceso a financiamiento para miles de
              emprendedores en Colombia.
            </AlertDescription>
          </Alert>
        </div>
      </form>
    </motion.div>
  );
}
