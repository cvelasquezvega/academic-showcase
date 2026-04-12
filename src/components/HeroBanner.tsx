import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroBanner = () => (
  <section className="relative overflow-hidden bg-primary min-h-[560px] md:min-h-[640px] flex items-center">
    {/* Large decorative circle — Princeton style */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-[900px] h-[900px] md:w-[1100px] md:h-[1100px] rounded-full border-[80px] md:border-[120px] border-background/90 opacity-90" />
    </div>

    <div className="container mx-auto px-4 relative z-10 py-20 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="bg-background p-10 md:p-16 max-w-lg text-center"
      >
        <p className="font-body text-sm tracking-widest uppercase text-muted-foreground mb-4">
          Novedades 2026
        </p>
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
          Conocimiento que transforma
        </h1>
        <div className="w-12 h-0.5 bg-primary mx-auto mb-6" />
        <p className="font-body text-base text-muted-foreground mb-8 leading-relaxed">
          Más de 2.300 publicaciones académicas en todos los formatos. Investigación, cultura y pensamiento crítico.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" className="font-body font-semibold text-sm uppercase tracking-wider">
            Explorar catálogo <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="font-body font-semibold text-sm uppercase tracking-wider border-foreground text-foreground hover:bg-foreground hover:text-background">
            Acceso abierto
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroBanner;
