import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step4Schema, Step4Data } from '@/lib/validation';
import { FormRadioGroup } from '@/components/form/FormRadioGroup';
import { motion } from 'framer-motion';

interface Step4Props {
  onSubmit: (data: Step4Data) => void;
  defaultValues?: Partial<Step4Data>;
}

export function Step4({ onSubmit, defaultValues }: Step4Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step4Data>({
    resolver: zodResolver(step4Schema),
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
              Empleos generados
            </h2>
            <p className="text-muted-foreground">
              Sabemos que muchos negocios generan oportunidades de trabajo, ya
              sea para familiares, personas de la comunidad o ayudantes
              contratados de manera formal o informal. Nos gustaría conocer
              cuántas personas trabajan actualmente en su negocio, incluyendo
              tanto trabajo permanente como apoyo ocasional.
            </p>
          </div>

          <Controller
            name="currentEmployees"
            control={control}
            render={({ field }) => (
              <FormRadioGroup
                name="currentEmployees"
                label="En total, ¿cuántas personas trabajan actualmente en su negocio, además de usted?"
                options={[
                  'Ninguna (solo yo)',
                  '1 persona',
                  '2 personas',
                  '3 a 5 personas',
                  'Más de 5 personas',
                  'Prefiero no responder',
                ]}
                value={field.value}
                onChange={field.onChange}
                error={errors.currentEmployees}
                required
              />
            )}
          />

          <Controller
            name="employeeChange"
            control={control}
            render={({ field }) => (
              <FormRadioGroup
                name="employeeChange"
                label="En comparación con hace un año, ¿cuántas personas más o menos trabajan actualmente con usted en su negocio?"
                options={[
                  'La misma cantidad',
                  '1 persona más',
                  '2–3 personas más',
                  'Más de 3 personas más',
                  '1 persona menos',
                  '2–3 personas menos',
                  'Más de 3 personas menos',
                ]}
                value={field.value}
                onChange={field.onChange}
                error={errors.employeeChange}
                required
              />
            )}
          />
        </div>
      </form>
    </motion.div>
  );
}
