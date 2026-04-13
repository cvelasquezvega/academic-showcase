import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Slide {
  type: 'promo' | 'product' | 'news';
  tag: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  bgGradient: string;
}

const slides: Slide[] = [
  {
    type: 'promo',
    tag: 'FILBo 2026 · Abril 21 – Mayo 4',
    title: 'Feria Internacional del Libro de Bogotá',
    subtitle: 'Visítanos en el Pabellón 3, Nivel 2, Stand E. Descuentos especiales hasta del 30% en todo el catálogo.',
    cta: 'Ver ofertas FILBo',
    ctaLink: '#',
    bgGradient: 'from-[hsl(var(--primary-light))] via-[hsl(var(--primary-light))] to-[hsl(var(--secondary)/0.15)]',
  },
  {
    type: 'product',
    tag: 'Novedad editorial',
    title: 'Conocimiento que transforma',
    subtitle: 'Más de 2.300 publicaciones académicas en todos los formatos. Investigación, cultura y pensamiento crítico.',
    cta: 'Explorar catálogo',
    ctaLink: '#',
    bgGradient: 'from-[hsl(var(--primary)/0.12)] via-[hsl(var(--primary-light))] to-[hsl(var(--primary-light))]',
  },
  {
    type: 'news',
    tag: 'Noticias',
    title: 'Acceso abierto: conocimiento sin barreras',
    subtitle: 'Descarga gratuitamente cientos de títulos académicos. La universidad pública al servicio de la sociedad.',
    cta: 'Ir a Acceso Abierto',
    ctaLink: '#',
    bgGradient: 'from-[hsl(var(--secondary)/0.1)] via-[hsl(var(--primary-light))] to-[hsl(var(--primary-light))]',
  },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent(prev => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(prev => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section className={`relative overflow-hidden bg-gradient-to-r ${slide.bgGradient} min-h-[420px] md:min-h-[500px] flex items-center transition-colors duration-700`}>
      <div className="container mx-auto px-4 relative z-10 py-16">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-primary mb-4 bg-primary/10 px-3 py-1.5">
              {slide.tag}
            </span>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.15] mb-5">
              {slide.title}
            </h1>
            <p className="font-body text-base md:text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto font-light">
              {slide.subtitle}
            </p>
            <div className="mx-auto flex w-full max-w-sm flex-col justify-center gap-3 sm:max-w-none sm:flex-row">
              <Button size="lg" className="w-full min-w-0 whitespace-normal px-4 font-body text-sm font-medium uppercase leading-tight tracking-[0.1em] sm:w-auto sm:px-8 sm:tracking-[0.15em]">
                {slide.cta} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="w-full min-w-0 whitespace-normal border-foreground px-4 font-body text-sm font-medium uppercase leading-tight tracking-[0.1em] text-foreground hover:bg-foreground hover:text-primary-foreground sm:w-auto sm:px-8 sm:tracking-[0.15em]">
                Crear cuenta gratis
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className={`w-2.5 h-2.5 transition-colors ${i === current ? 'bg-primary' : 'bg-foreground/20 hover:bg-foreground/40'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
