import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Headphones, BookOpen, Unlock, Clock, ChevronRight, Bell, Smartphone, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { featuredBooks, bestsellerBooks, formatPrice, getMiniCardCTA } from '@/data/books';
import type { Book, BookFormat } from '@/data/books';
import BookCover from '@/components/BookCover';

const allBooks = [...featuredBooks, ...bestsellerBooks];

const formatFilters: { key: BookFormat | 'all'; label: string; icon: React.ElementType }[] = [
  { key: 'all', label: 'Todos', icon: Search },
  { key: 'open-access', label: 'Acceso Abierto', icon: Unlock },
  { key: 'ebook', label: 'eBooks', icon: Smartphone },
  { key: 'printed', label: 'Impresos', icon: BookOpen },
  { key: 'audiobook', label: 'Audiolibros', icon: Headphones },
  { key: 'ibd', label: 'Bajo Demanda', icon: Package },
];

const popularSearches = [
  'Derechos humanos', 'Crisis ambiental', 'Literatura colombiana',
  'Arquitectura urbana', 'Salud pública', 'Acceso abierto',
];

const formatMeta: Record<BookFormat, { label: string; class: string; icon: typeof BookOpen }> = {
  'open-access': { label: 'Acceso Abierto', class: 'badge-open-access', icon: Unlock },
  ebook: { label: 'eBook', class: 'badge-ebook', icon: Smartphone },
  printed: { label: 'Impreso', class: 'badge-print', icon: BookOpen },
  audiobook: { label: 'Audiolibro', class: 'badge-audio', icon: Headphones },
  ibd: { label: 'Bajo Demanda', class: 'badge-ibd', icon: Package },
};

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ open, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState('');
  const [activeFormat, setActiveFormat] = useState<BookFormat | 'all'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setActiveFormat('all');
    }
  }, [open]);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      document.addEventListener('keydown', handler);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const filtered = allBooks.filter(book => {
    const q = query.toLowerCase();
    const matchesQuery = query.length === 0 ||
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.category.toLowerCase().includes(q);
    const matchesFormat = activeFormat === 'all' || book.formats.includes(activeFormat);
    return matchesQuery && matchesFormat;
  });

  const showResults = query.length > 0 || activeFormat !== 'all';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="bg-card w-full max-w-3xl mx-auto mt-[10vh] shadow-2xl border border-border max-h-[75vh] flex flex-col"
          >
            {/* Search input area */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
              <Search className="h-5 w-5 text-primary flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Buscar por título, autor, ISBN o temática..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="flex-1 bg-transparent font-body text-base text-foreground placeholder:text-muted-foreground outline-none"
              />
              {(query || activeFormat !== 'all') && (
                <button onClick={() => { setQuery(''); setActiveFormat('all'); }} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="ml-2 font-body text-xs font-semibold text-muted-foreground border border-border px-2 py-1 hover:text-foreground"
              >
                ESC
              </button>
            </div>

            {/* Format filter pills */}
            <div className="flex items-center gap-2 px-6 py-3 border-b border-border flex-wrap">
              {formatFilters.map(f => (
                <button
                  key={f.key}
                  onClick={() => setActiveFormat(f.key)}
                  className={`inline-flex items-center gap-1.5 font-body text-xs font-semibold px-3 py-1.5 border transition-all ${
                    activeFormat === f.key
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  }`}
                >
                  <f.icon className="h-3.5 w-3.5" />
                  {f.label}
                </button>
              ))}
            </div>

            {/* Results / suggestions */}
            <div className="flex-1 overflow-y-auto">
              {!showResults ? (
                /* Popular searches */
                <div className="p-6">
                  <p className="font-body text-[11px] font-bold tracking-widest uppercase text-muted-foreground mb-3">Búsquedas populares</p>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map(s => (
                      <button
                        key={s}
                        className="font-body text-xs text-foreground border border-border px-3 py-1.5 hover:border-primary hover:text-primary transition-colors"
                        onClick={() => setQuery(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-primary-light/30 border border-primary/10">
                    <p className="font-body text-sm text-muted-foreground">
                      <strong className="text-foreground">Consejo:</strong> Puedes filtrar por formato usando las etiquetas de arriba o escribir directamente "acceso abierto", "ebook" o "impreso" en tu búsqueda.
                    </p>
                  </div>
                </div>
              ) : filtered.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="font-body text-sm text-muted-foreground">No se encontraron resultados.</p>
                  <p className="font-body text-xs text-muted-foreground mt-1">Intenta con otros términos o ajusta el filtro.</p>
                </div>
              ) : (
                <>
                  <p className="font-body text-[11px] font-bold tracking-widest uppercase text-muted-foreground px-6 pt-4 pb-2">
                    {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
                  </p>
                  {filtered.slice(0, 8).map(book => (
                    <SearchResultItem key={book.id} book={book} />
                  ))}
                  {filtered.length > 8 && (
                    <div className="p-4 border-t border-border text-center">
                      <button className="font-body text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
                        Ver los {filtered.length} resultados <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SearchResultItem = ({ book }: { book: Book }) => {
  const cta = getMiniCardCTA(book);
  const lowestPrice = book.formatDetails
    ? Math.min(...book.formatDetails.filter(d => d.price && d.price > 0).map(d => d.price!))
    : book.price;
  const singleActionFormat = book.formats.find(f => f !== 'audiobook') || book.formats[0];
  const CtaFormatIcon = formatMeta[singleActionFormat].icon;

  return (
    <div className="flex items-center gap-4 px-6 py-3 hover:bg-primary-light/30 transition-colors border-b border-border/50 last:border-b-0 cursor-pointer">
      {/* Mini cover */}
      <BookCover book={book} className="w-12 h-16 flex-shrink-0" fallbackClassName="p-1" />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-body text-sm font-semibold text-foreground truncate">{book.title}</h4>
        <p className="font-body text-xs text-muted-foreground">{book.author}</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {book.formats.map(f => {
            const Icon = formatMeta[f].icon;
            return (
              <span key={f} className={`badge-format text-[10px] gap-1 ${formatMeta[f].class}`}>
                <Icon className="h-3 w-3" /> {formatMeta[f].label}
              </span>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="flex-shrink-0 text-right">
        {lowestPrice && lowestPrice > 0 && (
          <span className="font-body text-sm font-bold text-foreground block">
            {cta.icon === 'options' ? `Desde ${formatPrice(lowestPrice)}` : formatPrice(lowestPrice)}
          </span>
        )}
        <Button
          size="sm"
          variant={cta.icon === 'notify' ? 'outline' : 'default'}
          className={`font-body text-[11px] font-semibold h-7 px-2.5 mt-1 ${
            cta.icon === 'download' ? 'bg-[hsl(var(--format-open))] hover:bg-[hsl(var(--format-open)/0.9)] text-white' : ''
          } ${cta.icon === 'options' ? 'bg-[#2B303B] text-white hover:bg-[#1f232b]' : ''} ${
            cta.icon === 'coming-soon' ? 'bg-muted text-muted-foreground cursor-default' : ''
          }`}
        >
          {cta.icon === 'download' && <Unlock className="h-3 w-3 mr-1" />}
          {cta.icon === 'cart' && <CtaFormatIcon className="h-3 w-3 mr-1" />}
          {cta.icon === 'options' && <ChevronRight className="h-3 w-3 mr-1" />}
          {cta.icon === 'notify' && <Bell className="h-3 w-3 mr-1" />}
          {cta.label}
        </Button>
      </div>
    </div>
  );
};

export default SearchOverlay;
