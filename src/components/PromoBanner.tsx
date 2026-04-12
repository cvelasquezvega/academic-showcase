import { motion } from 'framer-motion';
import { ArrowRight, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PromoBanner = () => (
  <section className="py-6">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-primary-light p-8 md:p-14 md:flex items-center justify-between gap-8"
      >
        <div className="mb-6 md:mb-0">
          <p className="font-body text-[11px] tracking-[0.2em] uppercase text-primary mb-2 font-semibold">Feria del Libro 2026</p>
          <h3 className="font-heading text-xl md:text-3xl font-bold text-foreground mb-3">
            Hasta 30% de descuento
          </h3>
          <p className="font-body text-muted-foreground text-sm max-w-md font-light leading-relaxed">
            Aprovecha la promoción especial en más de 500 publicaciones. Regístrate y obtén un descuento adicional del 5%.
          </p>
        </div>
        <div className="flex flex-col gap-3 flex-shrink-0">
          <Button size="lg" className="font-body font-medium uppercase tracking-[0.15em] text-sm">
            Ver ofertas <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="font-body font-medium uppercase tracking-[0.15em] text-sm border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
            <UserPlus className="mr-2 h-4 w-4" /> Regístrate gratis
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default PromoBanner;
