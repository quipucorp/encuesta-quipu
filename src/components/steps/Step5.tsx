import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step5Schema, Step5Data, gotaGotaReasonOptions, otherFinancingOptions } from '@/lib/validation';
import { FormRadioGroup } from '@/components/form/FormRadioGroup';
import { FormCheckboxGroup } from '@/components/form/FormCheckboxGroup';
import { motion } from 'framer-motion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';
import { useState } from 'react';

interface Step5Props {
  onSubmit: (data: Step5Data) => void;
  defaultValues?: Partial<Step5Data>;
}

export function Step5({ onSubmit, defaultValues }: Step5Props) {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Step5Data>({
    resolver: zodResolver(step5Schema),
    defaultValues: defaultValues || {
      gotaGotaReasons: [],
      otherFinancing: [],
    },
  });

  const [gotaGotaReasonOther, setGotaGotaReasonOther] = useState(
    defaultValues?.gotaGotaReasonOther || ''
  );
  const [otherFinancingOther, setOtherFinancingOther] = useState(
    defaultValues?.otherFinancingOther || ''
  );

  const usedGotaGota = watch('usedGotaGota');
  const showGotaGotaQuestions = usedGotaGota === 'Sí';

  const handleFormSubmit = (data: Step5Data) => {
    onSubmit({
      ...data,
      gotaGotaReasonOther: gotaGotaReasonOther,
      otherFinancingOther: otherFinancingOther,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-ink mb-2">Financiamiento</h2>
            <p className="text-muted-foreground">
              Sabemos que mucha gente camelladora utiliza distintas formas
              de financiamiento para sostener o hacer crecer su camello o actividad económica. Algunas
              recurren a bancos o cooperativas, mientras que otras obtienen
              préstamos directamente de personas particulares o prestamistas
              informales.
            </p>
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Nos gustaría conocer, de forma confidencial, si ha utilizado alguno
              de estos mecanismos en el último año. Esta información es anónima y
              solo se usa para análisis estadístico.
            </AlertDescription>
          </Alert>

          <Controller
            name="usedGotaGota"
            control={control}
            render={({ field }) => (
              <FormRadioGroup
                name="usedGotaGota"
                label='En los últimos 12 meses, ¿has recibido algún préstamo o financiamiento de personas particulares o prestamistas informales, por ejemplo, de los conocidos como "gota a gota" o similares?'
                options={['Sí', 'No', 'Prefiero no responder']}
                value={field.value}
                onChange={field.onChange}
                error={errors.usedGotaGota}
                required
              />
            )}
          />

          {showGotaGotaQuestions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-6 pl-4 border-l-4 border-quipu-teal/30"
            >
              <Controller
                name="gotaGotaFrequency"
                control={control}
                render={({ field }) => (
                  <FormRadioGroup
                    name="gotaGotaFrequency"
                    label="¿Con qué frecuencia has utilizado este tipo de financiamiento en el último año?"
                    options={[
                      'Solo una vez',
                      'Varias veces (2 a 4 veces)',
                      'Con frecuencia (más de 4 veces)',
                      'Prefiero no responder',
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.gotaGotaFrequency}
                  />
                )}
              />

              <Controller
                name="gotaGotaReasons"
                control={control}
                render={({ field }) => (
                  <FormCheckboxGroup
                    name="gotaGotaReasons"
                    label="¿Cuáles fueron las razones para recurrir a este tipo de préstamo?"
                    description="Puede elegir varias opciones"
                    options={gotaGotaReasonOptions}
                    values={field.value || []}
                    onChange={field.onChange}
                    error={errors.gotaGotaReasons as any}
                    allowOther
                    otherValue={gotaGotaReasonOther}
                    onOtherChange={setGotaGotaReasonOther}
                  />
                )}
              />
            </motion.div>
          )}

          <Controller
            name="otherFinancing"
            control={control}
            render={({ field }) => (
              <FormCheckboxGroup
                name="otherFinancing"
                label="¿A qué otro tipo de financiación has tenido que recurrir para sostener tu camello o actividad económica?"
                description="Puede elegir varias opciones"
                options={otherFinancingOptions}
                values={field.value || []}
                onChange={field.onChange}
                error={errors.otherFinancing as any}
                required
                allowOther
                otherValue={otherFinancingOther}
                onOtherChange={setOtherFinancingOther}
              />
            )}
          />
        </div>
      </form>
    </motion.div>
  );
}
