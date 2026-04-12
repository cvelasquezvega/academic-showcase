import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Radio, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';

/* ── Programa radial ── */
const radioEpisodes = [
  { title: 'La irrupción de lo siniestro en Franz Kafka', date: '17 octubre', duration: '26:09:00' },
  { title: 'Las mujeres de Ningunaparte. Voces del Asilo de Locas de Bogotá, 1930-1950', date: '24 octubre', duration: '25:58:00' },
  { title: 'El profesor Jorge Eliécer Gaitán en las aulas de la Universidad Liberal', date: '21 noviembre', duration: '25:11:00' },
  { title: 'Geología y geomorfología de ríos tropicales de Colombia', date: '28 noviembre', duration: '25:14:00' },
  { title: 'Soberanía alimentaria de los campesinos del municipio de Pasto', date: '10 octubre', duration: '25:11:00' },
];

/* ── BookTrailers YouTube ── */
const bookTrailers = [
  {
    id: 'trailer1',
    title: '«La ayuda mutua. La otra ley de la selva»',
    channel: 'Editorial UNAL',
    thumbnail: 'from-amber-800 to-amber-600',
  },
  {
    id: 'trailer2',
    title: 'Trazas, oficios y territorios',
    channel: 'Editorial UNAL',
    thumbnail: 'from-teal-700 to-teal-500',
  },
  {
    id: 'trailer3',
    title: 'Biodiversidad y ecosistemas colombianos',
    channel: 'Editorial UNAL',
    thumbnail: 'from-green-700 to-green-500',
  },
  {
    id: 'trailer4',
    title: 'Memoria histórica del conflicto',
    channel: 'Editorial UNAL',
    thumbnail: 'from-indigo-700 to-indigo-500',
  },
];

const MultimediaSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <>
      {/* ═══ PROGRAMA ENTRE LIBROS ═══ */}
      <section className="bg-primary py-12 md:py-16" id="entre-libros">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-8">
            Programa: Entre libros
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8">
            {/* Podcast cover */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-foreground/10 to-primary-foreground/5 rounded-lg overflow-hidden aspect-square flex flex-col items-center justify-center p-8 border border-primary-foreground/10"
            >
              <Radio className="h-12 w-12 text-primary-foreground/70 mb-4" />
              <p className="font-heading text-2xl font-bold text-primary-foreground text-center leading-tight">
                ‹‹Entre Libros››
              </p>
              <p className="font-body text-sm text-primary-foreground/60 mt-2 text-center">
                Espacio editorial al aire
              </p>
              <div className="flex items-center gap-2 mt-4">
                <span className="font-nav text-[10px] font-bold bg-primary-foreground/10 text-primary-foreground/70 px-2 py-0.5 tracking-wider">
                  Editorial UNAL
                </span>
              </div>
            </motion.div>

            {/* Episodes list */}
            <div>
              <h3 className="font-body text-lg font-semibold text-primary-foreground mb-4">Capítulos recientes</h3>
              <div className="space-y-0">
                {radioEpisodes.map((ep, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4 py-3.5 border-b border-primary-foreground/10 hover:bg-primary-foreground/5 transition-colors group px-2 -mx-2"
                  >
                    <button className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-primary-foreground/10 text-primary-foreground group-hover:bg-primary-foreground group-hover:text-primary transition-colors rounded-full">
                      <Play className="h-3.5 w-3.5 ml-0.5" />
                    </button>
                    <span className="flex-1 font-body text-sm text-primary-foreground font-medium line-clamp-2 leading-snug">
                      {ep.title}
                    </span>
                    <span className="font-nav text-xs text-primary-foreground/50 whitespace-nowrap hidden sm:block">{ep.date}</span>
                    <span className="font-nav text-xs text-primary-foreground/40 whitespace-nowrap hidden sm:block border-l border-primary-foreground/10 pl-3">{ep.duration}</span>
                  </motion.a>
                ))}
              </div>
              <a href="#" className="inline-flex items-center gap-1 mt-4 font-nav text-xs font-medium text-primary-foreground/70 hover:text-primary-foreground tracking-wide transition-colors">
                Ver más <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MÁS ALLÁ DE LOS LIBROS — YOUTUBE ═══ */}
      <section className="bg-primary/90 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground">
              Más allá de los Libros
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!canPrev}
                className="w-9 h-9 flex items-center justify-center border border-primary-foreground/30 text-primary-foreground/60 hover:text-primary-foreground hover:border-primary-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => emblaApi?.scrollNext()}
                disabled={!canNext}
                className="w-9 h-9 flex items-center justify-center border border-primary-foreground/30 text-primary-foreground/60 hover:text-primary-foreground hover:border-primary-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* YouTube Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {bookTrailers.map((trailer, i) => (
                <div key={trailer.id} className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/2 pl-4">
                  <motion.a
                    href="#"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="block group relative overflow-hidden rounded-lg"
                  >
                    {/* Thumbnail placeholder */}
                    <div className={`aspect-video bg-gradient-to-br ${trailer.thumbnail} relative`}>
                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <Play className="h-7 w-7 text-white ml-1" fill="white" />
                        </div>
                      </div>
                      {/* Top bar: channel info */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <span className="font-nav text-[7px] font-bold text-white">UN</span>
                        </div>
                        <div>
                          <p className="font-nav text-xs font-bold text-white leading-none drop-shadow">
                            #BookTrailer 📚
                          </p>
                          <p className="font-nav text-[10px] text-white/70">{trailer.channel}</p>
                        </div>
                      </div>
                      {/* Title overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-8">
                        <p className="font-body text-sm font-semibold text-white leading-snug line-clamp-2">
                          {trailer.title}
                        </p>
                      </div>
                      {/* YouTube badge */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                        <span className="font-nav text-[10px] text-white/80">Ver en</span>
                        <span className="font-nav text-[10px] font-bold text-white">▶ YouTube</span>
                      </div>
                    </div>
                  </motion.a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MultimediaSection;
