import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ShoppingCart, Download, Truck, Clock, Bell, Heart,
  Share2, BookOpen, FileText, Headphones, ChevronRight, ChevronDown,
  Check, AlertTriangle, Info, Printer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';
import { featuredBooks, bestsellerBooks, formatPrice } from '@/data/books';
import type { Book, BookFormat, FormatDetail } from '@/data/books';

/* ── Find book by ID ── */
const allBooks = [...featuredBooks, ...bestsellerBooks];

/* ── Format display config ── */
const formatConfig: Record<BookFormat, { label: string; icon: typeof BookOpen; colorClass: string; desc: string }> = {
  printed: { label: 'Impreso', icon: BookOpen, colorClass: 'bg-primary text-primary-foreground', desc: 'Libro físico con envío a toda Colombia' },
  ebook: { label: 'eBook', icon: FileText, colorClass: 'bg-[hsl(var(--format-ebook))] text-white', desc: 'Descarga inmediata en formato digital' },
  'open-access': { label: 'Acceso Abierto', icon: Download, colorClass: 'bg-secondary text-secondary-foreground', desc: 'Descarga gratuita — conocimiento libre' },
  ibd: { label: 'Bajo Demanda', icon: Printer, colorClass: 'bg-secondary-light text-foreground', desc: 'Impresión personalizada en 5-7 días hábiles' },
  audiobook: { label: 'Audiolibro', icon: Headphones, colorClass: 'bg-[hsl(var(--format-audio))] text-white', desc: 'Escucha en cualquier lugar' },
};

/* ── Ficha técnica mock ── */
const getTechSpecs = (book: Book) => [
  { label: 'Editorial', value: 'Universidad Nacional de Colombia' },
  { label: 'Año', value: '2024' },
  { label: 'Páginas', value: '320' },
  { label: 'ISBN (Impreso)', value: '978-958-794-XXX-X' },
  { label: 'ISBN (Digital)', value: '978-958-794-XXX-X' },
  { label: 'Idioma', value: 'Español' },
  { label: 'Sede', value: 'Sede Bogotá' },
  { label: 'Área', value: book.category },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const book = allBooks.find(b => b.id === id);
  const [selectedFormat, setSelectedFormat] = useState<BookFormat | null>(null);
  const [selectedEbookSub, setSelectedEbookSub] = useState<'pdf' | 'epub' | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [notifyEmail, setNotifyEmail] = useState('');
  const [showNotifyForm, setShowNotifyForm] = useState(false);

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Libro no encontrado</h1>
            <p className="font-body text-muted-foreground mb-6 font-light">El libro que buscas no está disponible.</p>
            <Button asChild><Link to="/">Volver al catálogo</Link></Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Auto-select first available format
  const effectiveFormat = selectedFormat || book.formats[0];
  const currentDetail = book.formatDetails?.find(d => d.format === effectiveFormat);
  const isOpenAccess = effectiveFormat === 'open-access';
  const isPrinted = effectiveFormat === 'printed';
  const isEbook = effectiveFormat === 'ebook';
  const isIBD = effectiveFormat === 'ibd';
  const isAudiobook = effectiveFormat === 'audiobook';

  // Price for selected format
  const currentPrice = currentDetail?.price || 0;
  const currentOriginalPrice = currentDetail?.originalPrice;

  // Print status
  const printStatus = currentDetail?.printStatus;
  const isOutOfStock = isPrinted && printStatus === 'out-of-stock';
  const isComingSoon = isPrinted && printStatus === 'coming-soon';
  const isAvailable = !isOutOfStock && !isComingSoon;

  // Ebook sub-formats
  const ebookFormats = currentDetail?.ebookFormats || [];
  const effectiveEbookSub = selectedEbookSub || (ebookFormats.length > 0 ? ebookFormats[0] : null);

  // Audio status
  const audioStatus = currentDetail?.audioStatus;

  // Related books
  const relatedBooks = allBooks.filter(b => b.id !== book.id && b.category === book.category).slice(0, 4);
  const moreBooks = relatedBooks.length < 4
    ? [...relatedBooks, ...allBooks.filter(b => b.id !== book.id && !relatedBooks.includes(b)).slice(0, 4 - relatedBooks.length)]
    : relatedBooks;

  const techSpecs = getTechSpecs(book);

  // CTA logic per format
  const renderCTA = () => {
    if (isOpenAccess) {
      return (
        <Button size="lg" className="w-full font-body font-medium bg-secondary hover:bg-secondary/90 text-secondary-foreground uppercase text-sm tracking-[0.15em]">
          <Download className="h-4 w-4 mr-2" /> Descargar gratis
        </Button>
      );
    }

    if (isAudiobook) {
      if (audioStatus === 'coming-soon') {
        return (
          <Button size="lg" disabled className="w-full font-body font-medium bg-muted text-muted-foreground uppercase text-sm tracking-[0.15em]">
            <Clock className="h-4 w-4 mr-2" /> Próximamente
          </Button>
        );
      }
      if (audioStatus === 'free-listen') {
        return (
          <Button size="lg" className="w-full font-body font-medium bg-[hsl(var(--format-audio))] hover:bg-[hsl(var(--format-audio))]/90 text-white uppercase text-sm tracking-[0.15em]">
            <Headphones className="h-4 w-4 mr-2" /> Escuchar ahora
          </Button>
        );
      }
    }

    if (isOutOfStock) {
      return (
        <div className="space-y-3">
          <Button size="lg" disabled className="w-full font-body font-medium bg-muted text-muted-foreground uppercase text-sm tracking-[0.15em]">
            <AlertTriangle className="h-4 w-4 mr-2" /> Sin stock
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full font-body font-medium border-primary text-primary hover:bg-primary hover:text-primary-foreground uppercase text-sm tracking-[0.15em]"
            onClick={() => setShowNotifyForm(true)}
          >
            <Bell className="h-4 w-4 mr-2" /> Avíseme disponibilidad
          </Button>
          <AnimatePresence>
            {showNotifyForm && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex gap-2 mt-1">
                  <input
                    type="email"
                    value={notifyEmail}
                    onChange={e => setNotifyEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="flex-1 px-3 py-2 border border-border font-body text-sm font-light focus:border-primary outline-none transition-colors"
                  />
                  <Button size="sm" className="font-body font-medium text-xs uppercase tracking-[0.1em]">
                    Notificarme
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    if (isComingSoon) {
      return (
        <Button size="lg" disabled className="w-full font-body font-medium bg-muted text-muted-foreground uppercase text-sm tracking-[0.15em]">
          <Clock className="h-4 w-4 mr-2" /> Próximamente
        </Button>
      );
    }

    // Available for purchase
    return (
      <div className="space-y-3">
        {/* Quantity selector for physical */}
        {(isPrinted || isIBD) && (
          <div className="flex items-center gap-3">
            <span className="font-body text-sm text-muted-foreground font-light">Cantidad:</span>
            <div className="flex items-center border border-border">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 flex items-center justify-center text-foreground hover:bg-muted transition-colors font-body"
              >
                −
              </button>
              <span className="w-10 h-9 flex items-center justify-center font-body text-sm font-medium border-x border-border">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 flex items-center justify-center text-foreground hover:bg-muted transition-colors font-body"
              >
                +
              </button>
            </div>
          </div>
        )}

        {/* Ebook sub-format selector */}
        {isEbook && ebookFormats.length > 1 && (
          <div className="space-y-2">
            <span className="font-body text-sm text-muted-foreground font-light">Formato digital:</span>
            <div className="flex gap-2">
              {ebookFormats.map(sub => (
                <button
                  key={sub}
                  onClick={() => setSelectedEbookSub(sub)}
                  className={`flex-1 py-2.5 px-4 border font-body text-sm font-medium uppercase tracking-wider transition-all ${
                    effectiveEbookSub === sub
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border text-muted-foreground hover:border-foreground/30'
                  }`}
                >
                  {sub.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}

        <Button size="lg" className="w-full font-body font-medium uppercase text-sm tracking-[0.15em]">
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isEbook ? 'Comprar eBook' : isIBD ? 'Solicitar impresión' : 'Agregar al carrito'}
        </Button>
      </div>
    );
  };

  // Delivery info
  const renderDeliveryInfo = () => {
    if (isOpenAccess) return (
      <div className="flex items-center gap-2 text-secondary font-body text-sm">
        <Download className="h-4 w-4" />
        <span className="font-light">Descarga inmediata — PDF</span>
      </div>
    );
    if (isEbook) return (
      <div className="flex items-center gap-2 text-[hsl(var(--format-ebook))] font-body text-sm">
        <Download className="h-4 w-4" />
        <span className="font-light">Descarga inmediata tras la compra</span>
      </div>
    );
    if (isPrinted && isAvailable) return (
      <div className="flex items-center gap-2 text-secondary font-body text-sm">
        <Truck className="h-4 w-4" />
        <span className="font-light">Envío a todo Colombia — 3-5 días hábiles</span>
      </div>
    );
    if (isIBD) return (
      <div className="flex items-center gap-2 text-secondary-light font-body text-sm">
        <Clock className="h-4 w-4" />
        <span className="font-light">Impresión bajo demanda — 5-7 días hábiles</span>
      </div>
    );
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Breadcrumb */}
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center gap-2 font-body text-xs text-muted-foreground font-light">
          <Link to="/" className="hover:text-primary transition-colors">Inicio</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="hover:text-primary transition-colors cursor-pointer">Catálogo</span>
          <ChevronRight className="h-3 w-3" />
          <span className="hover:text-primary transition-colors cursor-pointer">{book.category}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium truncate max-w-[200px]">{book.title}</span>
        </div>
      </nav>

      {/* Main product section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[420px_1fr] gap-8 lg:gap-14">

            {/* ═══ LEFT: Cover image ═══ */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className={`relative aspect-[3/4] bg-gradient-to-br ${book.coverColor} overflow-hidden group`}
              >
                {/* Discount badge */}
                {book.discount && (
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm font-body font-semibold px-3 py-1.5 z-10">
                    -{book.discount}%
                  </span>
                )}
                {/* Hover zoom */}
                <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700" />
              </motion.div>

              {/* Thumbnails placeholder */}
              <div className="flex gap-2 mt-3">
                <div className={`w-16 h-20 bg-gradient-to-br ${book.coverColor} border-2 border-primary opacity-100`} />
                <div className="w-16 h-20 bg-muted border border-border opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
                <div className="w-16 h-20 bg-muted border border-border opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
              </div>
            </div>

            {/* ═══ RIGHT: Product info ═══ */}
            <div>
              {/* Category */}
              <p className="font-body text-[11px] tracking-[0.2em] uppercase text-primary font-semibold mb-2">{book.category}</p>

              {/* Title */}
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground leading-tight mb-2">
                {book.title}
              </h1>

              {/* Author */}
              <p className="font-body text-base text-muted-foreground font-light mb-4">
                {book.author}
              </p>

              {/* Rating placeholder */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <span key={s} className={`text-sm ${s <= 4 ? 'text-primary' : 'text-border'}`}>★</span>
                  ))}
                </div>
                <span className="font-body text-xs text-muted-foreground font-light">(12 reseñas)</span>
              </div>

              {/* ── Format selector tabs ── */}
              {book.formats.length > 1 && (
                <div className="mb-6">
                  <span className="font-body text-[11px] tracking-[0.15em] uppercase text-muted-foreground font-medium mb-3 block">
                    Selecciona formato
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {book.formats.map(f => {
                      const cfg = formatConfig[f];
                      const Icon = cfg.icon;
                      const isSelected = effectiveFormat === f;
                      const detail = book.formatDetails?.find(d => d.format === f);
                      const fPrice = detail?.price;

                      return (
                        <button
                          key={f}
                          onClick={() => { setSelectedFormat(f); setSelectedEbookSub(null); setShowNotifyForm(false); }}
                          className={`flex items-center gap-2 px-4 py-3 border transition-all font-body text-sm ${
                            isSelected
                              ? 'border-primary bg-primary/5 text-foreground shadow-sm'
                              : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
                          }`}
                        >
                          <Icon className={`h-4 w-4 ${isSelected ? 'text-primary' : ''}`} />
                          <span className="font-medium">{cfg.label}</span>
                          {fPrice && fPrice > 0 && (
                            <span className={`text-xs ml-1 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
                              {formatPrice(fPrice)}
                            </span>
                          )}
                          {f === 'open-access' && (
                            <span className="text-xs ml-1 text-secondary font-medium">Gratis</span>
                          )}
                          {isSelected && <Check className="h-3.5 w-3.5 text-primary ml-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Format description */}
              <div className="flex items-start gap-2 mb-4 p-3 bg-muted/50 border border-border">
                <Info className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <p className="font-body text-xs text-muted-foreground font-light leading-relaxed">
                  {formatConfig[effectiveFormat].desc}
                </p>
              </div>

              {/* Price */}
              <div className="mb-4">
                {currentPrice > 0 ? (
                  <div className="flex items-baseline gap-3">
                    <span className="font-body text-3xl font-bold text-foreground">{formatPrice(currentPrice)}</span>
                    {currentOriginalPrice && (
                      <span className="font-body text-lg text-muted-foreground line-through font-light">{formatPrice(currentOriginalPrice)}</span>
                    )}
                    {book.discount && (
                      <span className="font-body text-sm font-semibold text-primary">-{book.discount}%</span>
                    )}
                  </div>
                ) : isOpenAccess ? (
                  <span className="font-body text-2xl font-bold text-secondary">Descarga gratuita</span>
                ) : null}
              </div>

              {/* Delivery info */}
              <div className="mb-6">{renderDeliveryInfo()}</div>

              {/* CTA */}
              <div className="mb-6">{renderCTA()}</div>

              {/* Secondary actions */}
              <div className="flex items-center gap-4 border-t border-border pt-4">
                <button className="flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-primary transition-colors font-light">
                  <Heart className="h-4 w-4" /> Agregar a favoritos
                </button>
                <button className="flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-primary transition-colors font-light">
                  <Share2 className="h-4 w-4" /> Compartir
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TABS: Description / Ficha técnica / Reseñas ═══ */}
      <section className="border-t border-border py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Tab headers */}
          <div className="flex gap-0 border-b border-border mb-8">
            {[
              { key: 'description' as const, label: 'Descripción' },
              { key: 'specs' as const, label: 'Ficha técnica' },
              { key: 'reviews' as const, label: 'Reseñas (12)' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 font-body text-sm transition-all border-b-2 -mb-[1px] ${
                  activeTab === tab.key
                    ? 'border-primary text-primary font-medium'
                    : 'border-transparent text-muted-foreground font-light hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="max-w-3xl"
            >
              {activeTab === 'description' && (
                <div className="font-body text-sm text-foreground/80 font-light leading-[1.8] space-y-4">
                  <p>
                    Esta obra académica explora en profundidad los fundamentos teóricos y las implicaciones prácticas de su campo de estudio.
                    Con un enfoque riguroso y accesible, el autor presenta una investigación que aporta nuevas perspectivas al debate contemporáneo.
                  </p>
                  <p>
                    A lo largo de sus páginas, el lector encontrará un análisis exhaustivo respaldado por fuentes primarias, datos empíricos
                    y una revisión bibliográfica actualizada. La obra se estructura en capítulos que permiten una lectura tanto secuencial como selectiva,
                    facilitando su uso como material de referencia académica.
                  </p>
                  <p>
                    Publicada por la Editorial de la Universidad Nacional de Colombia, esta obra forma parte del compromiso institucional
                    con la difusión del conocimiento y la producción editorial de alta calidad.
                  </p>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="divide-y divide-border">
                  {techSpecs.map(spec => (
                    <div key={spec.label} className="flex py-3">
                      <span className="font-body text-sm font-medium text-foreground w-[180px] flex-shrink-0">{spec.label}</span>
                      <span className="font-body text-sm text-muted-foreground font-light">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Review summary */}
                  <div className="flex items-center gap-6 p-6 bg-muted/50 border border-border">
                    <div className="text-center">
                      <span className="font-heading text-4xl font-bold text-foreground">4.2</span>
                      <div className="flex gap-0.5 mt-1 justify-center">
                        {[1,2,3,4,5].map(s => (
                          <span key={s} className={`text-xs ${s <= 4 ? 'text-primary' : 'text-border'}`}>★</span>
                        ))}
                      </div>
                      <p className="font-body text-xs text-muted-foreground mt-1 font-light">12 reseñas</p>
                    </div>
                    <div className="flex-1 space-y-1">
                      {[5,4,3,2,1].map(star => (
                        <div key={star} className="flex items-center gap-2">
                          <span className="font-body text-xs text-muted-foreground w-3">{star}</span>
                          <div className="flex-1 h-2 bg-border overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${star === 5 ? 40 : star === 4 ? 35 : star === 3 ? 15 : star === 2 ? 8 : 2}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Individual reviews */}
                  {[
                    { name: 'Carlos M.', rating: 5, date: 'Hace 2 semanas', text: 'Excelente obra. Muy bien documentada y con un enfoque que aporta al debate actual.' },
                    { name: 'Ana R.', rating: 4, date: 'Hace 1 mes', text: 'Buen material de referencia para investigación. La edición es de calidad.' },
                  ].map((review, i) => (
                    <div key={i} className="border-b border-border pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary/10 flex items-center justify-center font-body text-sm font-medium text-primary">
                            {review.name[0]}
                          </div>
                          <span className="font-body text-sm font-medium text-foreground">{review.name}</span>
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(s => (
                              <span key={s} className={`text-xs ${s <= review.rating ? 'text-primary' : 'text-border'}`}>★</span>
                            ))}
                          </div>
                        </div>
                        <span className="font-body text-xs text-muted-foreground font-light">{review.date}</span>
                      </div>
                      <p className="font-body text-sm text-foreground/80 font-light leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ RELATED BOOKS ═══ */}
      {moreBooks.length > 0 && (
        <section className="border-t border-border py-10 md:py-14 bg-muted/30">
          <div className="container mx-auto px-4">
            <p className="font-body text-[11px] tracking-[0.2em] uppercase text-primary mb-1 font-semibold">También te puede interesar</p>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-6">Libros relacionados</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {moreBooks.map((b, i) => (
                <BookCard key={b.id} book={b} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetail;
