import { motion } from 'framer-motion';
import { Clock, ChevronRight, Bell, Headphones, BookOpen, Smartphone, Unlock, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import BookCover from '@/components/BookCover';
import type { Book, BookFormat } from '@/data/books';
import { formatPrice, getMiniCardCTA, isMultiFormat } from '@/data/books';

const formatMeta: Record<BookFormat, { label: string; class: string; icon: typeof BookOpen }> = {
  'open-access': { label: 'Acceso Abierto', class: 'badge-open-access', icon: Unlock },
  ebook: { label: 'eBook', class: 'badge-ebook', icon: Smartphone },
  printed: { label: 'Impreso', class: 'badge-print', icon: BookOpen },
  audiobook: { label: 'Audiolibro', class: 'badge-audio', icon: Headphones },
  ibd: { label: 'Bajo Demanda', class: 'badge-ibd', icon: Package },
};

const BookCard = ({ book, index = 0 }: { book: Book; index?: number }) => {
  const cta = getMiniCardCTA(book);
  const multiFormat = isMultiFormat(book);
  const printDetail = book.formatDetails?.find(d => d.format === 'printed');
  const audioDetail = book.formatDetails?.find(d => d.format === 'audiobook');
  const ctaLabel = cta.icon === 'notify' ? 'Avísame' : cta.label;
  const ctaClassName = [
    'w-full h-10 sm:h-11 px-2 sm:px-3 font-body font-semibold uppercase text-[10px] tracking-[0.06em] sm:tracking-[0.08em] relative z-20',
    'whitespace-normal leading-tight text-center rounded-md transition-all',
    cta.icon === 'options' ? 'bg-[#2B303B] text-white hover:bg-[#1f232b] shadow-sm hover:shadow-md' : '',
    cta.icon === 'coming-soon' ? 'bg-muted text-muted-foreground hover:bg-muted cursor-default' : '',
    cta.icon === 'notify' ? 'border-destructive/70 text-destructive hover:bg-destructive hover:text-destructive-foreground' : '',
  ].filter(Boolean).join(' ');

  const prices = book.formatDetails
    ? book.formatDetails.filter(d => d.price && d.price > 0).map(d => d.price!)
    : book.price ? [book.price] : [];
  const lowestPrice = prices.length > 0 ? Math.min(...prices) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="group bg-card border border-border overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col relative"
    >
      {/* Whole card is clickable */}
      <Link to={`/libro/${book.id}`} className="absolute inset-0 z-10" aria-label={`Ver ${book.title}`} />

      {/* Discount badge */}
      {book.discount && <span className="badge-discount z-20">-{book.discount}%</span>}

      {/* Status badges (top-right) */}
      <div className="absolute right-2 top-2 z-20 flex flex-col gap-1 sm:right-3 sm:top-3">
        {printDetail?.printStatus === 'out-of-stock' && (
          <span className="font-body text-[10px] font-semibold bg-destructive/90 text-white px-2 py-0.5">Sin stock</span>
        )}
        {printDetail?.printStatus === 'coming-soon' && (
          <span className="font-body text-[10px] font-semibold bg-muted-foreground/80 text-white px-2 py-0.5">Próximamente</span>
        )}
        {audioDetail?.audioStatus === 'coming-soon' && (
          <span className="font-body text-[10px] font-semibold bg-format-audio text-white px-2 py-0.5 flex items-center gap-0.5">
            <Headphones className="h-2.5 w-2.5" /> Pronto
          </span>
        )}
        {audioDetail?.audioStatus === 'free-listen' && (
          <span className="font-body text-[10px] font-semibold bg-secondary text-white px-2 py-0.5 flex items-center gap-0.5">
            <Headphones className="h-2.5 w-2.5" /> Audio libre
          </span>
        )}
      </div>

      {/* Cover — full image area with hover overlay */}
      <BookCover book={book} className="aspect-[4/5] sm:aspect-auto sm:h-64" imageClassName="group-hover:scale-105 transition-transform duration-500">
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-all duration-300 flex items-center justify-center">
          <span className="font-body text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-foreground/60 backdrop-blur-sm px-4 py-2 flex items-center gap-1.5">
            Ver detalle <ChevronRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </BookCover>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {/* Format badges */}
        <div className="flex flex-wrap gap-1 mb-2">
          {book.formats.map(f => {
            const Icon = formatMeta[f].icon;
            return (
              <span key={f} className={`badge-format ${formatMeta[f].class} gap-1 px-1.5 text-[9px] sm:px-2 sm:text-[10px]`}>
                <Icon className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> {formatMeta[f].label}
              </span>
            );
          })}
        </div>

        {/* Category */}
        <p className="mb-1.5 font-body text-[10px] font-medium uppercase tracking-wide text-muted-foreground sm:text-[11px]">{book.category}</p>

        {/* Title + Author — now here, between category and price */}
        <h3 className="mb-0.5 line-clamp-2 font-heading text-[13px] font-bold leading-snug text-foreground sm:text-sm">{book.title}</h3>
        <p className="mb-3 line-clamp-2 font-body text-[11px] font-light leading-snug text-muted-foreground sm:text-xs">{book.author}</p>

        {/* Price + CTA area */}
        <div className="mt-auto pt-3 border-t border-border">
          {cta.icon === 'download' ? (
            <Button
              size="sm"
              className="relative z-20 h-10 w-full rounded-md bg-[hsl(var(--format-open))] px-2 font-body text-[10px] font-semibold uppercase leading-tight tracking-[0.06em] text-white hover:bg-[hsl(var(--format-open)/0.9)] sm:h-11 sm:px-3 sm:tracking-[0.08em]"
              asChild
            >
              <Link to={`/libro/${book.id}`}>
                <Unlock className="h-3.5 w-3.5 mr-1.5" /> Descargar gratis
              </Link>
            </Button>
          ) : (
            <>
              {lowestPrice && (
                <div className="mb-2 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2">
                  <span className="font-body text-base font-semibold leading-tight text-foreground sm:text-lg">
                    {multiFormat ? `Desde ${formatPrice(lowestPrice)}` : formatPrice(lowestPrice)}
                  </span>
                  {book.originalPrice && !multiFormat && (
                    <span className="font-body text-sm text-muted-foreground line-through font-light">{formatPrice(book.originalPrice)}</span>
                  )}
                </div>
              )}

              <Button
                size="sm"
                variant={cta.icon === 'notify' ? 'outline' : 'default'}
                className={ctaClassName}
                asChild
              >
                <Link to={`/libro/${book.id}`}>
                  {cta.icon === 'options' && <ChevronRight className="h-3.5 w-3.5" />}
                  {cta.icon === 'notify' && <Bell className="h-3.5 w-3.5" />}
                  {cta.icon === 'coming-soon' && <Clock className="h-3.5 w-3.5" />}
                  <span>{ctaLabel}</span>
                </Link>
              </Button>

              {multiFormat && printDetail?.printStatus === 'out-of-stock' && (
                <button className="w-full mt-2 font-body text-[11px] text-primary hover:underline flex items-center justify-center gap-1 relative z-20">
                  <Bell className="h-3 w-3" /> Impreso sin stock — Avíseme
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
