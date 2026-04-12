import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PromoBanner = () => (
  <section className="py-6">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-foreground p-10 md:p-16 md:flex items-center justify-between"
      >
        <div className="mb-6 md:mb-0 md:mr-12">
          <p className="font-body text-sm tracking-widest uppercase text-primary mb-3">Feria del Libro 2026</p>
          <h3 className="font-heading text-2xl md:text-4xl font-bold text-background mb-3">
            Hasta 30% de descuento
          </h3>
          <p className="font-body text-background/60 text-sm max-w-md">
            Aprovecha la promoción especial en más de 500 publicaciones hasta el 30 de mayo.
          </p>
        </div>
        <Button size="lg" className="font-body font-semibold uppercase tracking-wider text-sm flex-shrink-0">
          Ver ofertas <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  </section>
);

export default PromoBanner;
