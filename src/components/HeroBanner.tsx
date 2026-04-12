import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/hero-bg.jpg';

const HeroBanner = () => (
  <section className="relative overflow-hidden min-h-[480px] md:min-h-[540px] flex items-center">
    <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0" style={{ background: 'var(--hero-gradient)' }} />

    <div className="container mx-auto px-4 relative z-10 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl"
      >
        <span className="inline-block badge-format badge-open-access mb-4 text-sm">Novedades 2026</span>
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
          Conocimiento que transforma el futuro
        </h1>
        <p className="font-body text-lg md:text-xl text-white/80 mb-8 max-w-lg">
          Más de 2.300 publicaciones académicas en todos los formatos. Investigación, cultura y pensamiento crítico al alcance de todos.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" className="font-body font-semibold" style={{ background: 'var(--cta-gradient)' }}>
            Explorar catálogo <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="font-body font-semibold border-white/30 text-white hover:bg-white/10 bg-transparent">
            Acceso abierto
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroBanner;
