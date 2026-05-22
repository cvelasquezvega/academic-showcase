import { useDeferredValue, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
  BookOpen,
  CalendarRange,
  ChevronDown,
  Filter,
  Headphones,
  Layers3,
  MapPin,
  Package,
  Search,
  SlidersHorizontal,
  Smartphone,
  Unlock,
  UserRound,
  X,
} from 'lucide-react';
import BookCard from '@/components/BookCard';
import { allBooks } from '@/data/books';
import type { Book, BookFormat } from '@/data/books';

type AvailabilityFilter = 'all' | 'for-sale' | 'open-access' | 'coming-soon' | 'out-of-stock';

const formatConfig: Record<BookFormat, { label: string; icon: typeof BookOpen; className: string; accentClass: string }> = {
  ebook: { label: 'E-book', icon: Smartphone, className: 'border-[#C8DCF7] bg-[#EAF3FF] text-[#2F80ED]', accentClass: 'bg-[#7FB0FF]' },
  ibd: { label: 'IBD', icon: Package, className: 'border-[#F2DDB4] bg-[#FFF1D8] text-[#D98A12]', accentClass: 'bg-[#F0C87A]' },
  printed: { label: 'Impreso', icon: BookOpen, className: 'border-[#CBE7D6] bg-[#E7F5EC] text-[#2FAE73]', accentClass: 'bg-[#93D2B0]' },
  audiobook: { label: 'Audiolibro', icon: Headphones, className: 'border-[#DCCDF7] bg-[#EFE7FF] text-[#7C3AED]', accentClass: 'bg-[#C8A7F7]' },
  'open-access': { label: 'Acceso abierto', icon: Unlock, className: 'border-[#F6D5B5] bg-[#FFF1E2] text-[#EE7E11]', accentClass: 'bg-[#F3B77A]' },
};

const availabilityConfig: Record<AvailabilityFilter, { label: string; helper: string; accent: string; icon: typeof BookOpen }> = {
  all: { label: 'Todas', helper: 'Todas las publicaciones', accent: 'bg-[#FFF0EB] text-[#F45E48]', icon: Filter },
  'for-sale': { label: 'A la venta', helper: 'E-book, IBD e impreso', accent: 'bg-[#F5F2ED] text-[#6E645B]', icon: BookOpen },
  'open-access': { label: 'Acceso abierto', helper: 'Consulta libre', accent: 'bg-[#F6F1FF] text-[#7C3AED]', icon: Unlock },
  'coming-soon': { label: 'Próximamente', helper: 'Formatos anunciados', accent: 'bg-[#EEF4FF] text-[#2F80ED]', icon: Smartphone },
  'out-of-stock': { label: 'Sin stock', helper: 'Activa aviso de disponibilidad', accent: 'bg-[#FFF3F0] text-[#D6654F]', icon: Package },
};

const normalize = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

const getBookAuthors = (book: Book) => [book.author, ...(book.coAuthors || [])];

const matchesAvailability = (book: Book, filter: AvailabilityFilter) => {
  const printDetail = book.formatDetails?.find(detail => detail.format === 'printed');
  const hasOpenAccess = book.formats.includes('open-access');
  const hasForSale = book.formatDetails?.some(detail => {
    if (detail.format === 'open-access' || detail.format === 'audiobook') return false;
    if (detail.format === 'printed') return detail.printStatus === 'available';
    return Boolean(detail.price && detail.price > 0);
  }) || false;
  const hasComingSoon = book.formatDetails?.some(detail =>
    detail.printStatus === 'coming-soon' || detail.audioStatus === 'coming-soon',
  ) || false;
  const hasOutOfStock = printDetail?.printStatus === 'out-of-stock';

  if (filter === 'for-sale') return hasForSale;
  if (filter === 'open-access') return hasOpenAccess;
  if (filter === 'coming-soon') return hasComingSoon;
  if (filter === 'out-of-stock') return hasOutOfStock;
  return true;
};

const bookMatchesMainSearch = (book: Book, rawQuery: string) => {
  if (!rawQuery) return true;
  const query = normalize(rawQuery);
  const haystack = [
    book.title,
    book.subtitle,
    book.author,
    ...(book.coAuthors || []),
    book.category,
    book.collection,
    book.sede,
    book.isbnPrint,
    book.isbnPdf,
    book.isbnEpub,
    book.isbnIbd,
    ...(book.keywords || []),
  ]
    .filter(Boolean)
    .map(value => normalize(String(value)));

  return haystack.some(value => value.includes(query));
};

const CatalogExplorer = () => {
  const resultsHeaderRef = useRef<HTMLDivElement | null>(null);
  const hasMountedFilterScrollRef = useRef(false);
  const pendingFilterScrollRef = useRef(false);
  const [mainQuery, setMainQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<BookFormat | 'all'>('all');
  const [availability, setAvailability] = useState<AvailabilityFilter>('all');
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedSedes, setSelectedSedes] = useState<string[]>([]);
  const [collectionQuery, setCollectionQuery] = useState('');
  const [authorQuery, setAuthorQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    formato: true,
    disponibilidad: true,
    colecciones: true,
    autores: true,
    tematicas: true,
    anios: true,
    sedes: false,
  });

  const deferredMainQuery = useDeferredValue(mainQuery);
  const deferredCollectionQuery = useDeferredValue(collectionQuery);
  const deferredAuthorQuery = useDeferredValue(authorQuery);

  useEffect(() => {
    if (!mobileFiltersOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileFiltersOpen]);

  const scrollToResultsHeader = () => {
    if (!resultsHeaderRef.current) return;

    resultsHeaderRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  useEffect(() => {
    if (!hasMountedFilterScrollRef.current) {
      hasMountedFilterScrollRef.current = true;
      return;
    }

    pendingFilterScrollRef.current = true;

    if (mobileFiltersOpen) {
      setMobileFiltersOpen(false);
      return;
    }

    scrollToResultsHeader();
    pendingFilterScrollRef.current = false;
  }, [
    selectedFormat,
    availability,
    selectedCollections,
    selectedAuthors,
    selectedCategories,
    selectedYears,
    selectedSedes,
  ]);

  useEffect(() => {
    if (mobileFiltersOpen || !pendingFilterScrollRef.current) return;

    scrollToResultsHeader();
    pendingFilterScrollRef.current = false;
  }, [mobileFiltersOpen]);

  const collections = Array.from(new Set(allBooks.map(book => book.collection).filter(Boolean) as string[])).sort((a, b) => a.localeCompare(b));
  const authors = Array.from(new Set(allBooks.flatMap(getBookAuthors))).sort((a, b) => a.localeCompare(b));
  const categories = Array.from(new Set(allBooks.map(book => book.category))).sort((a, b) => a.localeCompare(b));
  const years = Array.from(new Set(allBooks.map(book => book.year).filter((year): year is number => Boolean(year)))).sort((a, b) => b - a);
  const sedes = Array.from(new Set(allBooks.map(book => book.sede).filter(Boolean) as string[])).sort((a, b) => a.localeCompare(b));

  const applyFilters = (books: Book[], excludedGroup?: 'format' | 'availability' | 'collections' | 'authors' | 'categories' | 'years' | 'sedes') =>
    books.filter(book => {
      if (!bookMatchesMainSearch(book, deferredMainQuery)) return false;
      if (excludedGroup !== 'format' && selectedFormat !== 'all' && !book.formats.includes(selectedFormat)) return false;
      if (excludedGroup !== 'availability' && !matchesAvailability(book, availability)) return false;
      if (excludedGroup !== 'collections' && selectedCollections.length > 0 && !selectedCollections.includes(book.collection || '')) return false;
      if (excludedGroup !== 'authors' && selectedAuthors.length > 0 && !getBookAuthors(book).some(author => selectedAuthors.includes(author))) return false;
      if (excludedGroup !== 'categories' && selectedCategories.length > 0 && !selectedCategories.includes(book.category)) return false;
      if (excludedGroup !== 'years' && selectedYears.length > 0 && !selectedYears.includes(book.year || -1)) return false;
      if (excludedGroup !== 'sedes' && selectedSedes.length > 0 && !selectedSedes.includes(book.sede || '')) return false;
      return true;
    });

  const filteredBooks = applyFilters(allBooks);
  const formatCountsBase = applyFilters(allBooks, 'format');
  const availabilityCountsBase = applyFilters(allBooks, 'availability');
  const collectionsBase = applyFilters(allBooks, 'collections');
  const authorsBase = applyFilters(allBooks, 'authors');
  const categoriesBase = applyFilters(allBooks, 'categories');
  const yearsBase = applyFilters(allBooks, 'years');
  const sedesBase = applyFilters(allBooks, 'sedes');

  const activeFilterCount = [
    selectedFormat !== 'all' ? 1 : 0,
    availability !== 'all' ? 1 : 0,
    selectedCollections.length,
    selectedAuthors.length,
    selectedCategories.length,
    selectedYears.length,
    selectedSedes.length,
    mainQuery.trim() ? 1 : 0,
  ].reduce((sum, value) => sum + value, 0);

  const filteredCollections = collections.filter(collection => normalize(collection).includes(normalize(deferredCollectionQuery)));
  const filteredAuthors = authors.filter(author => normalize(author).includes(normalize(deferredAuthorQuery)));

  const toggleInList = <T,>(value: T, values: T[], setter: (next: T[]) => void) => {
    setter(values.includes(value) ? values.filter(item => item !== value) : [...values, value]);
  };

  const resetFilters = () => {
    setMainQuery('');
    setSelectedFormat('all');
    setAvailability('all');
    setSelectedCollections([]);
    setSelectedAuthors([]);
    setSelectedCategories([]);
    setSelectedYears([]);
    setSelectedSedes([]);
    setCollectionQuery('');
    setAuthorQuery('');
  };

  const filtersPanel = (
    <div className="overflow-hidden rounded-[28px] border border-border bg-card shadow-[0_20px_60px_rgba(43,48,59,0.08)]">
      <div className="flex items-center justify-between border-b border-border px-5 py-5">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Filter className="h-4 w-4" />
          </div>
          <div>
            <p className="font-body text-base font-semibold text-foreground">Filtros</p>
            <p className="font-body text-xs text-muted-foreground">{activeFilterCount > 0 ? `${activeFilterCount} activos` : 'Explora el catálogo'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={resetFilters} className="font-body text-sm font-medium text-primary transition-colors hover:text-primary/80">Limpiar</button>
          <button onClick={() => setMobileFiltersOpen(false)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground lg:hidden" aria-label="Cerrar filtros">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="border-b border-border px-5 py-5">
        <label className="mb-2 block font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Buscar publicación</label>
        <div className="flex items-center gap-3 rounded-full border border-border bg-background px-4 py-3 focus-within:border-primary">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={mainQuery} onChange={event => setMainQuery(event.target.value)} placeholder="Título, autor, ISBN, tema..." className="w-full bg-transparent font-body text-sm text-foreground outline-none placeholder:text-muted-foreground" />
          {mainQuery && (
            <button onClick={() => setMainQuery('')} className="text-muted-foreground transition-colors hover:text-foreground" aria-label="Limpiar búsqueda">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <FilterBlock title="Formato" open={openSections.formato} onToggle={() => setOpenSections(prev => ({ ...prev, formato: !prev.formato }))}>
        <div className="grid grid-cols-2 gap-3">
          {(['ebook', 'ibd', 'printed', 'audiobook'] as BookFormat[]).map(format => {
            const config = formatConfig[format];
            const Icon = config.icon;
            const count = formatCountsBase.filter(book => book.formats.includes(format)).length;
            const isSelected = selectedFormat === format;

            return (
              <button key={format} onClick={() => setSelectedFormat(current => current === format ? 'all' : format)} className={`relative rounded-[20px] border p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md ${isSelected ? 'ring-1 ring-primary/35 shadow-sm' : ''} ${config.className}`}>
                <span className={`absolute right-4 top-4 h-2.5 w-2.5 rounded-full ${config.accentClass}`} />
                <Icon className="mb-7 h-4 w-4" />
                <span className="block font-body text-lg font-semibold">{config.label}</span>
                <span className="mt-1 block font-body text-sm opacity-80">{count} título{count !== 1 ? 's' : ''}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 font-body text-xs leading-relaxed text-muted-foreground">E-book, IBD e impreso disponibles según la metadata comercial de cada obra.</p>
      </FilterBlock>

      <FilterBlock title="Disponibilidad" open={openSections.disponibilidad} onToggle={() => setOpenSections(prev => ({ ...prev, disponibilidad: !prev.disponibilidad }))}>
        <div className="space-y-3">
          {(Object.keys(availabilityConfig) as AvailabilityFilter[]).map(key => {
            const config = availabilityConfig[key];
            const Icon = config.icon;
            const count = availabilityCountsBase.filter(book => matchesAvailability(book, key)).length;
            const isSelected = availability === key;
            return (
              <button key={key} onClick={() => setAvailability(key)} className={`flex w-full items-center gap-3 rounded-[20px] border px-4 py-3 text-left transition-all hover:border-primary/30 hover:bg-primary/5 ${isSelected ? 'border-primary/40 bg-primary/5' : 'border-border bg-background'}`}>
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${config.accent}`}><Icon className="h-4 w-4" /></div>
                <div className="min-w-0 flex-1">
                  <p className="font-body text-sm font-semibold text-foreground">{config.label}</p>
                  <p className="font-body text-xs text-muted-foreground">{config.helper}</p>
                </div>
                <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-muted px-2 font-body text-sm font-semibold text-foreground">{count}</span>
              </button>
            );
          })}
        </div>
      </FilterBlock>

      <FilterBlock title="Colecciones" open={openSections.colecciones} onToggle={() => setOpenSections(prev => ({ ...prev, colecciones: !prev.colecciones }))}>
        <SearchWithin value={collectionQuery} onChange={setCollectionQuery} placeholder="Buscar colección..." />
        <div className="mt-4 max-h-[260px] space-y-3 overflow-y-auto pr-1">
          {filteredCollections.map(collection => (
            <CheckRow key={collection} checked={selectedCollections.includes(collection)} label={collection} count={collectionsBase.filter(book => book.collection === collection).length} onToggle={() => toggleInList(collection, selectedCollections, setSelectedCollections)} />
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Autores" open={openSections.autores} onToggle={() => setOpenSections(prev => ({ ...prev, autores: !prev.autores }))}>
        <SearchWithin value={authorQuery} onChange={setAuthorQuery} placeholder="Buscar autor..." />
        <div className="mt-4 max-h-[260px] space-y-3 overflow-y-auto pr-1">
          {filteredAuthors.map(author => (
            <CheckRow key={author} checked={selectedAuthors.includes(author)} label={author} count={authorsBase.filter(book => getBookAuthors(book).includes(author)).length} onToggle={() => toggleInList(author, selectedAuthors, setSelectedAuthors)} />
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Temáticas" open={openSections.tematicas} onToggle={() => setOpenSections(prev => ({ ...prev, tematicas: !prev.tematicas }))}>
        <div className="flex flex-wrap gap-2">
          <FilterChip active={selectedCategories.length === 0} label="Todas" count={categoriesBase.length} onClick={() => setSelectedCategories([])} tone="primary" />
          {categories.map(category => (
            <FilterChip key={category} active={selectedCategories.includes(category)} label={category} count={categoriesBase.filter(book => book.category === category).length} onClick={() => toggleInList(category, selectedCategories, setSelectedCategories)} />
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Año de publicación" open={openSections.anios} onToggle={() => setOpenSections(prev => ({ ...prev, anios: !prev.anios }))}>
        <div className="grid grid-cols-3 gap-3">
          {years.map(year => (
            <button key={year} onClick={() => toggleInList(year, selectedYears, setSelectedYears)} className={`rounded-[16px] border px-3 py-4 text-center transition-colors ${selectedYears.includes(year) ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-muted/40 text-foreground hover:border-primary/30'}`}>
              <span className="block font-body text-base font-semibold">{year}</span>
              <span className="mt-1 block font-body text-xs text-muted-foreground">{yearsBase.filter(book => book.year === year).length}</span>
            </button>
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Sede editorial" open={openSections.sedes} onToggle={() => setOpenSections(prev => ({ ...prev, sedes: !prev.sedes }))}>
        <div className="space-y-3">
          {sedes.map(sede => (
            <CheckRow key={sede} checked={selectedSedes.includes(sede)} label={sede} count={sedesBase.filter(book => book.sede === sede).length} onToggle={() => toggleInList(sede, selectedSedes, setSelectedSedes)} />
          ))}
        </div>
      </FilterBlock>

      <div className="border-t border-border bg-background/70 px-5 py-4 lg:hidden">
        <button onClick={() => setMobileFiltersOpen(false)} className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-4 py-3 font-body text-sm font-semibold text-background">
          Ver {filteredBooks.length} resultado{filteredBooks.length !== 1 ? 's' : ''}
        </button>
      </div>
    </div>
  );

  return (
    <section className="bg-[linear-gradient(180deg,#fbf8f4_0%,#ffffff_22%,#ffffff_100%)] py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1.5">
              <Layers3 className="h-3.5 w-3.5 text-primary" />
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Todo el catálogo</p>
            </div>
            <h2 className="mt-2 font-heading text-2xl font-bold text-foreground md:text-3xl">Encuentra una publicacion por formato, autor, colección, temática o año</h2>
            <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-muted-foreground md:text-base">
              Diseñamos esta vista para que llegar a un título sea rápido y claro: filtros visibles, conteos útiles, búsquedas internas y resultados que responden a la metadata real de cada publicacion.
            </p>
          </div>
          <div className="rounded-full border border-border bg-card px-4 py-2 font-body text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredBooks.length}</span> resultado{filteredBooks.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
          <aside className="hidden lg:block lg:sticky lg:top-[112px]">
            {filtersPanel}
          </aside>

          <div className="min-w-0">
            <div className="rounded-[28px] border border-border bg-white p-5 shadow-[0_18px_50px_rgba(43,48,59,0.06)] md:p-6">
              <div ref={resultsHeaderRef} className="flex scroll-mt-[112px] flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Exploración del catálogo</p>
                  <h3 className="mt-2 font-heading text-xl font-bold text-foreground md:text-2xl">
                    {filteredBooks.length} publicacion{filteredBooks.length !== 1 ? 'es' : ''} encontradas
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <SummaryBadge icon={Layers3} label={`${collections.length} colecciones`} />
                  <SummaryBadge icon={UserRound} label={`${authors.length} autores`} />
                  <SummaryBadge icon={CalendarRange} label={`${years.length} años`} />
                  <SummaryBadge icon={MapPin} label={`${sedes.length} sedes`} />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 lg:hidden">
                <button onClick={() => setMobileFiltersOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3 font-body text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/30">
                  <SlidersHorizontal className="h-4 w-4 text-primary" />
                  Filtros
                  {activeFilterCount > 0 && <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-primary-foreground">{activeFilterCount}</span>}
                </button>
                <span className="font-body text-xs text-muted-foreground">{filteredBooks.length} resultado{filteredBooks.length !== 1 ? 's' : ''}</span>
              </div>

              {activeFilterCount > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedFormat !== 'all' && <ActiveFilter label={`Formato: ${formatConfig[selectedFormat].label}`} onClear={() => setSelectedFormat('all')} />}
                  {availability !== 'all' && <ActiveFilter label={`Disponibilidad: ${availabilityConfig[availability].label}`} onClear={() => setAvailability('all')} />}
                  {selectedCollections.map(collection => <ActiveFilter key={collection} label={collection} onClear={() => setSelectedCollections(prev => prev.filter(item => item !== collection))} />)}
                  {selectedAuthors.map(author => <ActiveFilter key={author} label={author} onClear={() => setSelectedAuthors(prev => prev.filter(item => item !== author))} />)}
                  {selectedCategories.map(category => <ActiveFilter key={category} label={category} onClear={() => setSelectedCategories(prev => prev.filter(item => item !== category))} />)}
                  {selectedYears.map(year => <ActiveFilter key={year} label={String(year)} onClear={() => setSelectedYears(prev => prev.filter(item => item !== year))} />)}
                  {selectedSedes.map(sede => <ActiveFilter key={sede} label={sede} onClear={() => setSelectedSedes(prev => prev.filter(item => item !== sede))} />)}
                  {mainQuery && <ActiveFilter label={`Búsqueda: ${mainQuery}`} onClear={() => setMainQuery('')} />}
                </div>
              )}

              {filteredBooks.length === 0 ? (
                <div className="flex min-h-[360px] flex-col items-center justify-center px-6 py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Search className="h-6 w-6" />
                  </div>
                  <h4 className="mt-5 font-heading text-2xl font-bold text-foreground">No encontramos publicaciones con esta combinación</h4>
                  <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-muted-foreground">
                    Prueba limpiando algunos filtros o buscando por otra colección, autor o temática. La idea es que siempre puedas volver a un resultado útil con pocos clics.
                  </p>
                  <button onClick={resetFilters} className="mt-6 inline-flex items-center justify-center bg-primary px-5 py-3 font-body text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                    Restablecer filtros
                  </button>
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                  {filteredBooks.map((book, index) => <BookCard key={book.id} book={book} index={index} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 z-[70] bg-black/45 transition-opacity lg:hidden ${mobileFiltersOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
        <button onClick={() => setMobileFiltersOpen(false)} className="absolute inset-0 h-full w-full cursor-default" aria-label="Cerrar panel de filtros" />
        <div className={`absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-[32px] bg-[#F9F4ED] p-3 transition-transform duration-300 ${mobileFiltersOpen ? 'translate-y-0' : 'translate-y-full'}`}>
          {filtersPanel}
        </div>
      </div>
    </section>
  );
};

const FilterBlock = ({ title, open, onToggle, children }: { title: string; open: boolean; onToggle: () => void; children: ReactNode }) => (
  <section className="border-b border-border px-5 py-5 last:border-b-0">
    <button onClick={onToggle} className="flex w-full items-center justify-between gap-3 text-left">
      <span className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{title}</span>
      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
    </button>
    {open && <div className="mt-4">{children}</div>}
  </section>
);

const SearchWithin = ({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) => (
  <div className="flex items-center gap-3 rounded-full border border-border bg-background px-4 py-3">
    <Search className="h-4 w-4 text-muted-foreground" />
    <input value={value} onChange={event => onChange(event.target.value)} placeholder={placeholder} className="w-full bg-transparent font-body text-sm text-foreground outline-none placeholder:text-muted-foreground" />
  </div>
);

const CheckRow = ({ checked, label, count, onToggle }: { checked: boolean; label: string; count: number; onToggle: () => void }) => (
  <button onClick={onToggle} className="flex w-full items-center gap-3 text-left">
    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${checked ? 'border-primary bg-primary/10' : 'border-border bg-white'}`}>
      {checked && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
    </span>
    <span className="min-w-0 flex-1 font-body text-sm text-foreground">{label}</span>
    <span className="font-body text-sm text-muted-foreground">{count}</span>
  </button>
);

const FilterChip = ({ active, label, count, onClick, tone = 'default' }: { active: boolean; label: string; count: number; onClick: () => void; tone?: 'default' | 'primary' }) => (
  <button onClick={onClick} className={`inline-flex items-center gap-1 rounded-full px-3 py-2 font-body text-xs font-semibold transition-colors ${active ? (tone === 'primary' ? 'bg-primary text-primary-foreground' : 'bg-foreground text-background') : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'}`}>
    <span>{label}</span>
    <span className={`${active ? 'opacity-90' : 'opacity-75'}`}>{count}</span>
  </button>
);

const SummaryBadge = ({ icon: Icon, label }: { icon: typeof Layers3; label: string }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 font-body text-xs font-medium text-muted-foreground">
    <Icon className="h-3.5 w-3.5 text-primary" />
    {label}
  </span>
);

const ActiveFilter = ({ label, onClear }: { label: string; onClear: () => void }) => (
  <button onClick={onClear} className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-2 font-body text-xs font-medium text-primary transition-colors hover:bg-primary/20">
    <span>{label}</span>
    <X className="h-3.5 w-3.5" />
  </button>
);

export default CatalogExplorer;
