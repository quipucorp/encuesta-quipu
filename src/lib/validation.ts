import { z } from 'zod';

// Step 1: Basic demographic data
export const step1Schema = z.object({
  gender: z.enum(['Hombre', 'Mujer', 'Otro', 'Prefiero no responder'], {
    required_error: 'Por favor selecciona una opción',
  }),
  age: z
    .number({
      required_error: 'Por favor ingresa tu edad',
      invalid_type_error: 'Por favor ingresa un número válido',
    })
    .min(14, 'Debes tener al menos 14 años')
    .max(100, 'Por favor verifica tu edad'),
  city: z.string().min(2, 'Por favor ingresa tu ciudad').max(100),
  documentType: z.enum(
    ['Cédula de ciudadanía', 'Cédula de extranjería', 'Pasaporte', 'PPT'],
    {
      required_error: 'Por favor selecciona el tipo de documento',
    }
  ),
  documentNumber: z.string().min(6, 'El número de documento es muy corto').max(15),
});

export type Step1Data = z.infer<typeof step1Schema>;

// Step 2: Active businesses
export const step2Schema = z.object({
  activeBusinesses: z.enum(
    [
      'Ninguno (todas mis actividades están en pausa o cerradas)',
      'Uno',
      'Dos',
      'Tres o más',
      'Prefiero no responder',
    ],
    {
      required_error: 'Por favor selecciona una opción',
    }
  ),
  businessName: z.string().max(200).optional(),
});

export type Step2Data = z.infer<typeof step2Schema>;

// Step 3: Income change
export const step3Schema = z.object({
  incomeChange: z.enum(
    [
      'Han disminuido más del 50 %',
      'Han disminuido entre 25 % y 50 %',
      'Han disminuido menos del 25 %',
      'Se han mantenido más o menos iguales',
      'Han aumentado menos del 25 %',
      'Han aumentado entre 25 % y 50 %',
      'Han aumentado más del 50 %',
      'No sabe / Prefiere no responder',
    ],
    {
      required_error: 'Por favor selecciona una opción',
    }
  ),
});

export type Step3Data = z.infer<typeof step3Schema>;

// Step 4: Employment
export const step4Schema = z.object({
  currentEmployees: z.enum(
    [
      'Ninguna (solo yo)',
      '1 persona',
      '2 personas',
      '3 a 5 personas',
      'Más de 5 personas',
      'Prefiero no responder',
    ],
    {
      required_error: 'Por favor selecciona una opción',
    }
  ),
  employeeChange: z.enum(
    [
      'La misma cantidad',
      '1 persona más',
      '2–3 personas más',
      'Más de 3 personas más',
      '1 persona menos',
      '2–3 personas menos',
      'Más de 3 personas menos',
    ],
    {
      required_error: 'Por favor selecciona una opción',
    }
  ),
});

export type Step4Data = z.infer<typeof step4Schema>;

// Step 5: Financing ("gota a gota" and institutional)
export const step5Schema = z.object({
  usedGotaGota: z.enum(['Sí', 'No', 'Prefiero no responder'], {
    required_error: 'Por favor selecciona una opción',
  }),
  gotaGotaFrequency: z
    .enum([
      'Solo una vez',
      'Varias veces (2 a 4 veces)',
      'Con frecuencia (más de 4 veces)',
      'Prefiero no responder',
    ])
    .optional(),
  gotaGotaReasons: z.array(z.string()).optional(),
  gotaGotaReasonOther: z.string().max(500).optional(),
  otherFinancing: z.array(z.string()).min(1, 'Por favor selecciona al menos una opción'),
  otherFinancingOther: z.string().max(500).optional(),
});

export type Step5Data = z.infer<typeof step5Schema>;

// Step 6: Privacy consent
export const step6Schema = z.object({
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar el tratamiento de datos para continuar',
  }),
});

export type Step6Data = z.infer<typeof step6Schema>;

// Complete form data
export const completeFormSchema = z.object({
  step1: step1Schema,
  step2: step2Schema,
  step3: step3Schema,
  step4: step4Schema,
  step5: step5Schema,
  step6: step6Schema,
});

export type CompleteFormData = z.infer<typeof completeFormSchema>;

// Document validation helpers
export const validateDocumentNumber = (type: string, number: string): boolean => {
  switch (type) {
    case 'Cédula de ciudadanía':
    case 'Cédula de extranjería':
      return /^\d{6,12}$/.test(number);
    case 'Pasaporte':
    case 'PPT':
      return /^[a-zA-Z0-9]{6,15}$/.test(number);
    default:
      return false;
  }
};

// Options for "gota a gota" reasons
export const gotaGotaReasonOptions = [
  'Necesitaba dinero rápido y sin trámites',
  'No calificaba para un préstamo formal',
  'Era el único crédito disponible',
  'Lo hago por costumbre o confianza',
  'Otra razón',
  'Prefiero no responder',
] as const;

// Options for other financing types
export const otherFinancingOptions = [
  'Banco tradicional',
  'Microfinanciera',
  'Fintech (Banco digital)',
  'Tarjeta de crédito',
  'Familiares',
  'Amigos',
  'Ninguna',
  'Prefiero no responder',
  'Otra',
] as const;

// Colombian cities for autocomplete
export const colombianCities = [
  'Bogotá',
  'Medellín',
  'Cali',
  'Barranquilla',
  'Cartagena',
  'Cúcuta',
  'Bucaramanga',
  'Pereira',
  'Santa Marta',
  'Ibagué',
  'Pasto',
  'Manizales',
  'Neiva',
  'Villavicencio',
  'Armenia',
];
