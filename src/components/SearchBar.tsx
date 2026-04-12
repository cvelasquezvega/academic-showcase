import { useState, useRef } from 'react';
import { Search, X, Download, ShoppingCart, Truck, BookOpen, Headphones, Unlock, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { featuredBooks, bestsellerBooks, formatPrice } from '@/data/books';
import type { Book, BookFormat } from '@/data/books';

const allBooks = [...featuredBooks, ...bestsellerBooks];

const formatFilters: { key: BookFormat | 'all'; label: string; icon: React.ElementType }[] = [
  { key: 'all', label: 'Todos', icon: Search },
  { key: 'open-access', label: 'Acceso Abierto', icon: Unlock },
  { key: 'ebook', label: 'eBooks', icon: Download },
  { key: 'printed', label: 'Impresos', icon: BookOpen },
  { key: 'audiobook', label: 'Audiolibros', icon: Headphones },
  { key: 'ibd', label: 'Bajo Demanda', icon: Clock },
];

const popularSearches = [
  'Derechos humanos', 'Crisis ambiental', 'Literatura colombiana',
  'Arquitectura urbana', 'Salud pública', 'Acceso abierto',
];

const formatMeta: Record<string, { label: string; class: string }> = {
  'open-access': { label: 'Acceso Abierto', class: 'badge-open-access' },
  ebook: { label: 'eBook', class: 'badge-ebook' },
  printed: { label: 'Impreso', class: 'badge-print' },
  audiobook: { label: 'Audiolibro', class: 'badge-audio' },
  ibd: { label: 'Bajo Demanda', class: 'badge-ibd' },
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
        {/* Format filter pills */}
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

        {/* Search input */}
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

          {/* Popular searches (idle state) */}
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

          {/* Rich search results */}
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
  const isOpenAccess = book.formats.includes('open-access');

  return (
    <div className="flex items-center gap-4 px-4 py-3 hover:bg-primary-light/50 transition-colors border-b border-border/50 last:border-b-0 cursor-pointer">
      {/* Mini cover */}
      <div className={`w-12 h-16 flex-shrink-0 bg-gradient-to-br ${book.coverColor} flex items-center justify-center`}>
        <span className="font-heading text-[8px] text-white font-bold text-center leading-tight px-1 line-clamp-2">{book.title}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-body text-sm font-semibold text-foreground truncate">{book.title}</h4>
        <p className="font-body text-xs text-muted-foreground">{book.author}</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {book.formats.map(f => (
            <span key={f} className={`badge-format text-[10px] ${formatMeta[f].class}`}>{formatMeta[f].label}</span>
          ))}
        </div>
      </div>

      {/* Direct action CTA */}
      <div className="flex-shrink-0">
        {isOpenAccess ? (
          <Button size="sm" className="font-body text-[11px] font-semibold bg-secondary hover:bg-secondary/90 text-secondary-foreground h-8 px-3">
            <Download className="h-3 w-3 mr-1" /> Descargar
          </Button>
        ) : (
          <div className="text-right">
            <span className="font-body text-sm font-bold text-foreground block">{formatPrice(book.price!)}</span>
            <Button size="sm" className="font-body text-[11px] font-semibold h-7 px-2.5 mt-1">
              <ShoppingCart className="h-3 w-3 mr-1" /> Añadir
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
