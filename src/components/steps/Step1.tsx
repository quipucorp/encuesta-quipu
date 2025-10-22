import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema, Step1Data } from '@/lib/validation';
import { FormRadioGroup } from '@/components/form/FormRadioGroup';
import { FormInput } from '@/components/form/FormInput';
import { FormSelect } from '@/components/form/FormSelect';
import { CityAutocomplete } from '@/components/form/CityAutocomplete';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { validateDocumentNumber } from '@/lib/validation';

interface Step1Props {
  onSubmit: (data: Step1Data) => void;
  defaultValues?: Partial<Step1Data>;
}

export function Step1({ onSubmit, defaultValues }: Step1Props) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: defaultValues || {},
  });

  const documentType = watch('documentType');
  const documentNumber = watch('documentNumber');

  // Validate document number based on type
  useEffect(() => {
    if (documentType && documentNumber) {
      if (!validateDocumentNumber(documentType, documentNumber)) {
        setError('documentNumber', {
          type: 'manual',
          message: getDocumentValidationMessage(documentType),
        });
      } else {
        clearErrors('documentNumber');
      }
    }
  }, [documentType, documentNumber, setError, clearErrors]);

  const getDocumentValidationMessage = (type: string): string => {
    switch (type) {
      case 'Cédula de ciudadanía':
      case 'Cédula de extranjería':
        return 'Ingresa solo números (6-12 dígitos)';
      case 'Pasaporte':
      case 'PPT':
        return 'Ingresa números y letras (6-15 caracteres)';
      default:
        return 'Formato de documento inválido';
    }
  };

  const getDocumentPlaceholder = (type?: string): string => {
    if (!type) return 'Selecciona primero el tipo de documento';
    switch (type) {
      case 'Cédula de ciudadanía':
      case 'Cédula de extranjería':
        return 'Ej: 1234567890';
      case 'Pasaporte':
        return 'Ej: AB123456';
      case 'PPT':
        return 'Ej: PPT123456';
      default:
        return '';
    }
  };

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
            <h2 className="text-2xl font-bold text-ink mb-2">Datos básicos</h2>
            <p className="text-muted-foreground">
              Esta información nos ayuda a entender mejor el perfil de los
              participantes.
            </p>
          </div>

          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <FormRadioGroup
                name="gender"
                label="¿Eres o te identificas como?"
                options={['Hombre', 'Mujer', 'Otro', 'Prefiero no responder']}
                value={field.value}
                onChange={field.onChange}
                error={errors.gender}
                required
              />
            )}
          />

          <FormInput
            name="age"
            label="¿Qué edad tienes?"
            type="number"
            placeholder="Ej: 35"
            register={register}
            error={errors.age}
            required
          />

          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <CityAutocomplete
                name="city"
                label="¿En qué ciudad de Colombia vives?"
                value={field.value || ''}
                onChange={field.onChange}
                error={errors.city}
                required
              />
            )}
          />

          <Controller
            name="documentType"
            control={control}
            render={({ field }) => (
              <FormSelect
                name="documentType"
                label="¿Qué tipo de documento de identidad tienes?"
                options={[
                  'Cédula de ciudadanía',
                  'Cédula de extranjería',
                  'Pasaporte',
                  'PPT',
                ]}
                value={field.value}
                onChange={field.onChange}
                error={errors.documentType}
                required
              />
            )}
          />

          <FormInput
            name="documentNumber"
            label="¿Cuál es el número del documento de identidad?"
            type="text"
            placeholder={getDocumentPlaceholder(documentType)}
            register={register}
            error={errors.documentNumber}
            required
            helpText={
              documentType
                ? getDocumentValidationMessage(documentType)
                : undefined
            }
          />
        </div>
      </form>
    </motion.div>
  );
}
