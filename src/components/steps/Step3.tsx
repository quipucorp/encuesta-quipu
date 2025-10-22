import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step3Schema, Step3Data } from '@/lib/validation';
import { FormRadioGroup } from '@/components/form/FormRadioGroup';
import { motion } from 'framer-motion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

interface Step3Props {
  onSubmit: (data: Step3Data) => void;
  defaultValues?: Partial<Step3Data>;
}

export function Step3({ onSubmit, defaultValues }: Step3Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: defaultValues || {},
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
              Crecimiento de ingresos
            </h2>
            <p className="text-muted-foreground">
              Para comprender mejor cómo ha evolucionado su negocio en los
              últimos meses, nos gustaría conocer su percepción sobre el cambio
              aproximado en los ingresos.
            </p>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              No buscamos una cifra exacta, solo una estimación general. Su
              respuesta será confidencial y se utilizará únicamente con fines de
              análisis para entender tendencias entre diferentes tipos de
              negocios.
            </AlertDescription>
          </Alert>

          <Controller
            name="incomeChange"
            control={control}
            render={({ field }) => (
              <FormRadioGroup
                name="incomeChange"
                label="En comparación con hace un año, ¿cómo considera que han cambiado los ingresos de su negocio?"
                options={[
                  'Han disminuido más del 50 %',
                  'Han disminuido entre 25 % y 50 %',
                  'Han disminuido menos del 25 %',
                  'Se han mantenido más o menos iguales',
                  'Han aumentado menos del 25 %',
                  'Han aumentado entre 25 % y 50 %',
                  'Han aumentado más del 50 %',
                  'No sabe / Prefiere no responder',
                ]}
                value={field.value}
                onChange={field.onChange}
                error={errors.incomeChange}
                required
              />
            )}
          />
        </div>
      </form>
    </motion.div>
  );
}
