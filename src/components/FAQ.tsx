import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';

export function FAQ() {
  const faqs = [
    {
      question: '¿Cuánto tarda la encuesta?',
      answer:
        'La encuesta toma aproximadamente 5-7 minutos en completarse. Hemos diseñado preguntas claras y directas para respetar tu tiempo.',
    },
    {
      question: '¿Quién verá mis datos?',
      answer:
        'Tu información será vista únicamente por el equipo de análisis de Quipu y se utilizará de forma agregada para fines estadísticos. No compartimos datos personales con terceros y todas las respuestas son completamente anónimas.',
    },
    {
      question: '¿Puedo pausar y continuar luego?',
      answer:
        'Sí, puedes pausar en cualquier momento. Tus respuestas se guardan automáticamente en tu navegador, así que puedes volver más tarde desde el mismo dispositivo y continuar donde lo dejaste.',
    },
    {
      question: '¿Qué pasa con mi información después?',
      answer:
        'Los datos se procesan de forma agregada para identificar tendencias y necesidades comunes entre emprendedores. Esto nos ayuda a diseñar productos financieros más justos y accesibles.',
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="py-12 px-4"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-ink mb-6 text-center">
          Preguntas frecuentes
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.section>
  );
}
