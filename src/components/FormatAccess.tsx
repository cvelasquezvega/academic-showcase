import { motion } from 'framer-motion';
import { BookOpen, Download, Headphones, Clock, Unlock } from 'lucide-react';

const formats = [
  { label: 'Impresos', desc: 'Envío a todo el país', icon: BookOpen, color: 'text-primary' },
  { label: 'eBooks', desc: 'Acceso inmediato', icon: Download, color: 'text-format-ebook' },
  { label: 'Acceso Abierto', desc: 'Descarga gratuita', icon: Unlock, color: 'text-secondary' },
  { label: 'Audiolibros', desc: 'Escucha en cualquier lugar', icon: Headphones, color: 'text-format-audio' },
  { label: 'Bajo Demanda', desc: 'Producción en 5-7 días', icon: Clock, color: 'text-secondary-light' },
];

const FormatAccess = () => (
  <section className="py-14 md:py-18 bg-primary-light/50">
    <div className="container mx-auto px-4">
      <p className="font-body text-sm tracking-widest uppercase text-primary text-center mb-2 font-semibold">Formatos</p>
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
        Elige tu formato preferido
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {formats.map((f, i) => (
          <motion.a
            key={f.label}
            href="#"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group flex flex-col items-center text-center p-6 bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all"
          >
            <f.icon className={`h-7 w-7 ${f.color} mb-3 group-hover:scale-110 transition-transform`} />
            <span className="font-body text-sm font-semibold text-foreground">{f.label}</span>
            <span className="font-body text-xs text-muted-foreground mt-1">{f.desc}</span>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default FormatAccess;
