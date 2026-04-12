import { useState } from 'react';
import { Search, X } from 'lucide-react';

const suggestions = [
  'Descentralización territorial',
  'Crisis ambiental',
  'Derechos humanos',
  'Martha Nussbaum',
  'Literatura colombiana',
  'Arquitectura urbana',
];

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const filtered = query.length > 0
    ? suggestions.filter(s => s.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <section className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="relative max-w-2xl mx-auto">
          <div className="flex items-center bg-muted rounded-lg px-4 py-2.5 border border-border focus-within:ring-2 focus-within:ring-primary/30">
            <Search className="h-5 w-5 text-muted-foreground mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Buscar por título, autor, ISBN o tema..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 200)}
              className="flex-1 bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {focused && filtered.length > 0 && (
            <div className="absolute top-full mt-1 left-0 right-0 bg-card border border-border rounded-lg shadow-lg z-20 overflow-hidden">
              {filtered.map(s => (
                <button
                  key={s}
                  className="w-full text-left px-4 py-2.5 font-body text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2"
                  onClick={() => setQuery(s)}
                >
                  <Search className="h-3.5 w-3.5 text-muted-foreground" />
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
