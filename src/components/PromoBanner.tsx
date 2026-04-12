import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PromoBanner = () => (
  <section className="py-6">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="rounded-2xl p-8 md:p-12 text-center md:text-left md:flex items-center justify-between"
        style={{ background: 'var(--promo-gradient)' }}
      >
        <div className="mb-6 md:mb-0">
          <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="font-body text-sm font-bold text-accent uppercase tracking-wide">Feria del Libro 2026</span>
          </div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
            Hasta 30% de descuento en títulos seleccionados
          </h3>
          <p className="font-body text-white/80 text-sm">
            Aprovecha la promoción especial en más de 500 publicaciones hasta el 30 de mayo.
          </p>
        </div>
        <Button size="lg" className="font-body font-semibold bg-accent text-accent-foreground hover:bg-accent/90 flex-shrink-0">
          Ver ofertas <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  </section>
);

export default PromoBanner;
