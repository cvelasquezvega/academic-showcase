import { useState, useRef } from 'react';
import { Search, X, ArrowRight, BookOpen, Unlock, Clock, Headphones, ChevronRight, Bell, Smartphone, Package } from 'lucide-react';
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

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [activeFormat, setActiveFormat] = useState<BookFormat | 'all'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = allBooks.filter(book => {
    const matchesQuery = query.length === 0 || 
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase()) ||
      book.category.toLowerCase().includes(query.toLowerCase());
    const matchesFormat = activeFormat === 'all' || book.formats.includes(activeFormat);
    return matchesQuery && matchesFormat;
  });

  const showResults = focused && (query.length > 0 || activeFormat !== 'all');
  const showSuggestions = focused && query.length === 0 && activeFormat === 'all';

  return (
    <section className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
          {formatFilters.map(f => (
            <button
              key={f.key}
              onClick={() => { setActiveFormat(f.key); inputRef.current?.focus(); }}
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

        <div className="relative max-w-2xl mx-auto">
          <div className="flex items-center border border-border px-4 py-3 focus-within:border-primary focus-within:shadow-sm transition-all bg-background">
            <Search className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar por título, autor, ISBN o temática..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 250)}
              className="flex-1 bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            {(query || activeFormat !== 'all') && (
              <button onClick={() => { setQuery(''); setActiveFormat('all'); }} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {showSuggestions && (
            <div className="absolute top-full mt-px left-0 right-0 bg-card border border-border border-t-0 shadow-lg z-20 p-4">
              <p className="font-body text-[11px] font-bold tracking-widest uppercase text-muted-foreground mb-3">Búsquedas populares</p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map(s => (
                  <button
                    key={s}
                    className="font-body text-xs text-foreground border border-border px-3 py-1.5 hover:border-primary hover:text-primary transition-colors"
                    onMouseDown={() => setQuery(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {showResults && (
            <div className="absolute top-full mt-px left-0 right-0 bg-card border border-border border-t-0 shadow-lg z-20 max-h-[420px] overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="font-body text-sm text-muted-foreground">No se encontraron resultados.</p>
                  <p className="font-body text-xs text-muted-foreground mt-1">Intenta con otros términos o ajusta el filtro de formato.</p>
                </div>
              ) : (
                <>
                  <p className="font-body text-[11px] font-bold tracking-widest uppercase text-muted-foreground px-4 pt-3 pb-2">
                    {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
                  </p>
                  {filtered.slice(0, 6).map(book => (
                    <SearchResultItem key={book.id} book={book} />
                  ))}
                  {filtered.length > 6 && (
                    <div className="p-3 border-t border-border text-center">
                      <button className="font-body text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
                        Ver los {filtered.length} resultados <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
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
    <div className="flex items-center gap-4 px-4 py-3 hover:bg-primary-light/50 transition-colors border-b border-border/50 last:border-b-0 cursor-pointer">
      <BookCover book={book} className="w-12 h-16 flex-shrink-0" fallbackClassName="p-1" />

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
          } ${cta.icon === 'options' ? 'bg-[#2B303B] text-white hover:bg-[#1f232b]' : ''}`}
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

export default SearchBar;
