import { motion } from 'framer-motion';
import { BookOpen, Download, Headphones, Printer, Clock } from 'lucide-react';

const formats = [
  { label: 'Impresos', desc: 'Envío a todo el país', icon: BookOpen },
  { label: 'eBooks', desc: 'Acceso inmediato', icon: Download },
  { label: 'Acceso Abierto', desc: 'Descarga gratuita', icon: Download },
  { label: 'Audiolibros', desc: 'Escucha en cualquier lugar', icon: Headphones },
  { label: 'Bajo Demanda', desc: 'Producción en 5-7 días', icon: Clock },
];

const FormatAccess = () => (
  <section className="py-16 md:py-20">
    <div className="container mx-auto px-4">
      <p className="font-body text-sm tracking-widest uppercase text-muted-foreground text-center mb-3">Formatos</p>
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
        Elige tu formato preferido
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px bg-border">
        {formats.map((f, i) => (
          <motion.a
            key={f.label}
            href="#"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group flex flex-col items-center text-center p-8 bg-background hover:bg-muted transition-colors"
          >
            <f.icon className="h-6 w-6 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <span className="font-body text-sm font-semibold text-foreground">{f.label}</span>
            <span className="font-body text-xs text-muted-foreground mt-1">{f.desc}</span>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default FormatAccess;
