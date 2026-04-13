import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const banners = [
  {
    src: '/banner-libreria-nieves.svg',
    alt: 'Horario 2026 de la Libreria UNAL Las Nieves',
  },
  {
    src: '/banner-boletin-marzo.svg',
    alt: 'Boletin Editorial UNAL de marzo de 2026',
  },
];

const ImageBannerSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length);
    }, 6500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden border border-border bg-card">
          <div className="aspect-[2048/371] min-h-[110px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={banners[current].src}
                src={banners[current].src}
                alt={banners[current].alt}
                className="h-full w-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
              />
            </AnimatePresence>
          </div>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {banners.map((banner, index) => (
              <button
                key={banner.src}
                onClick={() => setCurrent(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  current === index ? 'bg-white' : 'bg-white/45 hover:bg-white/70'
                }`}
                aria-label={`Ver banner ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageBannerSlider;
