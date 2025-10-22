import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step2Schema, Step2Data } from '@/lib/validation';
import { FormRadioGroup } from '@/components/form/FormRadioGroup';
import { FormInput } from '@/components/form/FormInput';
import { motion } from 'framer-motion';

interface Step2Props {
  onSubmit: (data: Step2Data) => void;
  defaultValues?: Partial<Step2Data>;
}

export function Step2({ onSubmit, defaultValues }: Step2Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
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
              Sobre negocios activos
            </h2>
            <p className="text-muted-foreground">
              Sabemos que muchas personas camelladoras desarrollan más de una
              actividad económica, y que algunas pueden estar activas mientras
              otras se encuentran en pausa. Nos gustaría conocer cuántas
              actividades económicas mantiene actualmente activas,
              entendiendo como "activas" aquellos en los que ha trabajado o
              generado ingresos en los últimos tres meses.
            </p>
          </div>

          <Controller
            name="activeBusinesses"
            control={control}
            render={({ field }) => (
              <FormRadioGroup
                name="activeBusinesses"
                label="¿Cuántas actividades económicas mantiene actualmente activas?"
                options={[
                  'Ninguno (todas mis actividades están en pausa o cerradas)',
                  'Uno',
                  'Dos',
                  'Tres o más',
                  'Prefiero no responder',
                ]}
                value={field.value}
                onChange={field.onChange}
                error={errors.activeBusinesses}
                required
              />
            )}
          />

          <FormInput
            name="businessName"
            label="Nombre del camello o actividad económica (opcional)"
            type="text"
            placeholder="Ej: Tienda de abarrotes..."
            register={register}
            error={errors.businessName}
          />
        </div>
      </form>
    </motion.div>
  );
}
