import { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BookCard from './BookCard';
import type { Book } from '@/data/books';
import useEmblaCarousel from 'embla-carousel-react';

interface Props {
  title: string;
  subtitle?: string;
  books: Book[];
  ctaLabel?: string;
}

const BookSection = ({ title, subtitle, books, ctaLabel = 'Ver todo' }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    loop: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            {subtitle && (
              <p className="font-body text-sm tracking-widest uppercase text-primary mb-1 font-semibold">{subtitle}</p>
            )}
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
          </div>
          <div className="flex items-center gap-2">
            {/* Nav arrows */}
            <button
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="w-9 h-9 flex items-center justify-center border border-border text-foreground/60 hover:text-primary hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext}
              className="w-9 h-9 flex items-center justify-center border border-border text-foreground/60 hover:text-primary hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <Button variant="ghost" className="font-body text-sm text-primary font-semibold hover:text-primary/80 uppercase tracking-wider ml-2">
              {ctaLabel} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {books.map((book, i) => (
              <div
                key={book.id}
                className="min-w-0 shrink-0 grow-0 pl-4"
                style={{ flexBasis: 'calc(100% / 2)' }}
                // Responsive via CSS classes won't work inline, use media queries approach
              >
                <BookCard book={book} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookSection;
