import { motion } from 'framer-motion';
import { BookOpen, Smartphone, Headphones, Package, Unlock } from 'lucide-react';

const formats = [
  { label: 'Impresos', desc: 'Envío a todo el país', icon: BookOpen, color: 'text-format-print' },
  { label: 'eBooks', desc: 'Acceso inmediato', icon: Smartphone, color: 'text-format-ebook' },
  { label: 'Acceso Abierto', desc: 'Descarga gratuita', icon: Unlock, color: 'text-format-open' },
  { label: 'Audiolibros', desc: 'Escucha en cualquier lugar', icon: Headphones, color: 'text-format-audio' },
  { label: 'Bajo Demanda', desc: 'Producción en 5-7 días', icon: Package, color: 'text-format-ibd' },
];

const FormatAccess = () => (
  <section className="py-14 md:py-18 bg-primary-light/50">
    <div className="container mx-auto px-4">
      <p className="font-body text-[11px] tracking-[0.2em] uppercase text-primary text-center mb-2 font-semibold">Formatos</p>
      <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground text-center mb-10">
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
            <span className="font-body text-sm font-medium text-foreground">{f.label}</span>
            <span className="font-body text-xs text-muted-foreground mt-1 font-light">{f.desc}</span>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default FormatAccess;
