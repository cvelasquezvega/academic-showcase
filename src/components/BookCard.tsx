import { motion } from 'framer-motion';
import { Download, ShoppingCart, Truck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Book } from '@/data/books';
import { formatPrice } from '@/data/books';

const formatMeta: Record<string, { label: string; class: string }> = {
  'open-access': { label: 'Acceso Abierto', class: 'badge-open-access' },
  ebook: { label: 'eBook', class: 'badge-ebook' },
  printed: { label: 'Impreso', class: 'badge-print' },
  audiobook: { label: 'Audiolibro', class: 'badge-audio' },
  ibd: { label: 'Bajo Demanda', class: 'badge-ibd' },
};

const BookCard = ({ book, index = 0 }: { book: Book; index?: number }) => {
  const isOpenAccess = book.formats.includes('open-access');
  const hasEbook = book.formats.includes('ebook');
  const hasPrint = book.formats.includes('printed');
  const hasIbd = book.formats.includes('ibd');

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col relative"
    >
      {book.discount && <span className="badge-discount">-{book.discount}%</span>}

      <div className={`relative h-56 bg-gradient-to-br ${book.coverColor} flex items-center justify-center p-6`}>
        <div className="text-center">
          <h3 className="font-heading text-sm font-bold text-white leading-snug line-clamp-3">{book.title}</h3>
          <p className="font-body text-xs text-white/70 mt-2">{book.author}</p>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex flex-wrap gap-1 mb-3">
          {book.formats.map(f => (
            <span key={f} className={`badge-format ${formatMeta[f].class}`}>{formatMeta[f].label}</span>
          ))}
        </div>

        <p className="font-body text-xs text-muted-foreground mb-1">{book.category}</p>

        <div className="mt-auto pt-3 border-t border-border">
          {isOpenAccess ? (
            <Button size="sm" className="w-full font-body font-semibold bg-format-open hover:bg-format-open/90 text-white">
              <Download className="h-3.5 w-3.5 mr-1.5" /> Descargar gratis
            </Button>
          ) : (
            <>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-body text-lg font-bold text-foreground">{formatPrice(book.price!)}</span>
                {book.originalPrice && (
                  <span className="font-body text-sm text-muted-foreground line-through">{formatPrice(book.originalPrice)}</span>
                )}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-[11px] font-body mb-2">
                {hasEbook && <span className="flex items-center gap-0.5"><Download className="h-3 w-3" /> Acceso inmediato</span>}
                {hasPrint && <span className="flex items-center gap-0.5 ml-2"><Truck className="h-3 w-3" /> Envío disponible</span>}
                {hasIbd && <span className="flex items-center gap-0.5 ml-2"><Clock className="h-3 w-3" /> 5-7 días</span>}
              </div>
              <Button size="sm" className="w-full font-body font-semibold">
                <ShoppingCart className="h-3.5 w-3.5 mr-1.5" /> Añadir al carrito
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
