import { motion } from 'framer-motion';
import { BookOpen, Download, Headphones, Printer, Clock } from 'lucide-react';

const formats = [
  { label: 'Impresos', desc: 'Envío a todo el país', icon: BookOpen, colorClass: 'bg-format-print text-white' },
  { label: 'eBooks', desc: 'Acceso inmediato', icon: Download, colorClass: 'bg-format-ebook text-white' },
  { label: 'Acceso Abierto', desc: 'Descarga gratuita', icon: Download, colorClass: 'bg-format-open text-white' },
  { label: 'Audiolibros', desc: 'Escucha en cualquier lugar', icon: Headphones, colorClass: 'bg-format-audio text-white' },
  { label: 'Bajo Demanda', desc: 'Producción en 5-7 días', icon: Clock, colorClass: 'bg-format-ibd text-foreground' },
];

const FormatAccess = () => (
  <section className="py-10 md:py-14">
    <div className="container mx-auto px-4">
      <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground text-center mb-8">
        Elige tu formato preferido
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {formats.map((f, i) => (
          <motion.a
            key={f.label}
            href="#"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group flex flex-col items-center text-center p-5 rounded-xl bg-card border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-full ${f.colorClass} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <f.icon className="h-5 w-5" />
            </div>
            <span className="font-body text-sm font-semibold text-foreground">{f.label}</span>
            <span className="font-body text-xs text-muted-foreground mt-1">{f.desc}</span>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default FormatAccess;
