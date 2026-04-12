import { motion } from 'framer-motion';
import { Download, ShoppingCart, Truck, Clock, ChevronRight, Bell, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Book } from '@/data/books';
import { formatPrice, getMiniCardCTA, isMultiFormat } from '@/data/books';

const formatMeta: Record<string, { label: string; class: string }> = {
  'open-access': { label: 'Acceso Abierto', class: 'badge-open-access' },
  ebook: { label: 'eBook', class: 'badge-ebook' },
  printed: { label: 'Impreso', class: 'badge-print' },
  audiobook: { label: 'Audiolibro', class: 'badge-audio' },
  ibd: { label: 'Bajo Demanda', class: 'badge-ibd' },
};

const BookCard = ({ book, index = 0 }: { book: Book; index?: number }) => {
  const cta = getMiniCardCTA(book);
  const multiFormat = isMultiFormat(book);
  const printDetail = book.formatDetails?.find(d => d.format === 'printed');
  const audioDetail = book.formatDetails?.find(d => d.format === 'audiobook');

  // Show lowest price across all sellable formats
  const prices = book.formatDetails
    ? book.formatDetails.filter(d => d.price && d.price > 0).map(d => d.price!)
    : book.price ? [book.price] : [];
  const lowestPrice = prices.length > 0 ? Math.min(...prices) : null;
  const highestPrice = prices.length > 1 ? Math.max(...prices) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="group bg-card border border-border overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col relative cursor-pointer"
    >
      {/* Discount badge */}
      {book.discount && <span className="badge-discount">-{book.discount}%</span>}

      {/* Status badges (top-right) */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
        {printDetail?.printStatus === 'out-of-stock' && (
          <span className="font-body text-[10px] font-bold bg-destructive/90 text-white px-2 py-0.5">Sin stock</span>
        )}
        {printDetail?.printStatus === 'coming-soon' && (
          <span className="font-body text-[10px] font-bold bg-muted-foreground/80 text-white px-2 py-0.5">Próximamente</span>
        )}
        {audioDetail?.audioStatus === 'coming-soon' && (
          <span className="font-body text-[10px] font-bold bg-format-audio text-white px-2 py-0.5 flex items-center gap-0.5">
            <Headphones className="h-2.5 w-2.5" /> Pronto
          </span>
        )}
        {audioDetail?.audioStatus === 'free-listen' && (
          <span className="font-body text-[10px] font-bold bg-secondary text-white px-2 py-0.5 flex items-center gap-0.5">
            <Headphones className="h-2.5 w-2.5" /> Audio libre
          </span>
        )}
      </div>

      {/* Cover */}
      <div className={`relative h-64 bg-gradient-to-br ${book.coverColor} flex items-center justify-center p-6`}>
        <div className="text-center">
          <h3 className="font-heading text-sm font-bold text-white leading-snug line-clamp-3">{book.title}</h3>
          <p className="font-body text-xs text-white/70 mt-2">{book.author}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Format badges */}
        <div className="flex flex-wrap gap-1 mb-2">
          {book.formats.map(f => (
            <span key={f} className={`badge-format ${formatMeta[f].class}`}>{formatMeta[f].label}</span>
          ))}
        </div>

        <p className="font-body text-xs text-muted-foreground tracking-wide uppercase mb-2">{book.category}</p>

        {/* Price + CTA area */}
        <div className="mt-auto pt-3 border-t border-border">
          {cta.icon === 'download' ? (
            /* Open Access: direct download */
            <Button size="sm" className="w-full font-body font-semibold bg-secondary hover:bg-secondary/90 text-secondary-foreground uppercase text-xs tracking-wider">
              <Download className="h-3.5 w-3.5 mr-1.5" /> Descargar gratis
            </Button>
          ) : (
            <>
              {/* Price display */}
              {lowestPrice && (
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-body text-lg font-bold text-foreground">
                    {multiFormat ? `Desde ${formatPrice(lowestPrice)}` : formatPrice(lowestPrice)}
                  </span>
                  {book.originalPrice && !multiFormat && (
                    <span className="font-body text-sm text-muted-foreground line-through">{formatPrice(book.originalPrice)}</span>
                  )}
                </div>
              )}

              {/* Delivery info for single-format */}
              {!multiFormat && (
                <div className="flex items-center gap-1 text-muted-foreground text-[11px] font-body mb-2">
                  {book.formats.includes('ebook') && <span className="flex items-center gap-0.5"><Download className="h-3 w-3" /> Inmediato</span>}
                  {book.formats.includes('printed') && printDetail?.printStatus === 'available' && (
                    <span className="flex items-center gap-0.5 ml-2"><Truck className="h-3 w-3" /> Envío</span>
                  )}
                  {book.formats.includes('ibd') && <span className="flex items-center gap-0.5 ml-2"><Clock className="h-3 w-3" /> 5-7 días</span>}
                </div>
              )}

              {/* Multi-format: show format price range hint */}
              {multiFormat && highestPrice && (
                <div className="text-[11px] font-body text-muted-foreground mb-2">
                  {book.formats.filter(f => f !== 'audiobook').length} formatos disponibles
                </div>
              )}

              {/* Main CTA */}
              <Button
                size="sm"
                variant={cta.icon === 'notify' ? 'outline' : 'default'}
                className={`w-full font-body font-semibold uppercase text-xs tracking-wider ${
                  cta.icon === 'coming-soon' ? 'bg-muted text-muted-foreground hover:bg-muted cursor-default' : ''
                } ${cta.icon === 'notify' ? 'border-primary text-primary hover:bg-primary hover:text-primary-foreground' : ''}`}
              >
                {cta.icon === 'cart' && <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />}
                {cta.icon === 'options' && <ChevronRight className="h-3.5 w-3.5 mr-1.5" />}
                {cta.icon === 'notify' && <Bell className="h-3.5 w-3.5 mr-1.5" />}
                {cta.icon === 'coming-soon' && <Clock className="h-3.5 w-3.5 mr-1.5" />}
                {cta.label}
              </Button>

              {/* Notify me sub-action for out-of-stock printed when book has other formats */}
              {multiFormat && printDetail?.printStatus === 'out-of-stock' && (
                <button className="w-full mt-2 font-body text-[11px] text-primary hover:underline flex items-center justify-center gap-1">
                  <Bell className="h-3 w-3" /> Impreso sin stock — Avíseme disponibilidad
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
