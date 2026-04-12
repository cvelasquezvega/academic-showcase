import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Download, Truck, Clock, Bell, Heart,
  Share2, BookOpen, FileText, Headphones, ChevronRight, ChevronDown,
  Check, AlertTriangle, Info, Printer, ExternalLink, Copy,
  Monitor, Smartphone, Shield, Tag, BookMarked, Users, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';
import { featuredBooks, bestsellerBooks, formatPrice } from '@/data/books';
import type { Book, BookFormat } from '@/data/books';
import { toast } from '@/hooks/use-toast';

const allBooks = [...featuredBooks, ...bestsellerBooks];

/* ── Format config ── */
const fmtCfg: Record<BookFormat, { label: string; icon: typeof BookOpen; badgeClass: string }> = {
  printed:       { label: 'Impreso',        icon: BookOpen,    badgeClass: 'badge-print' },
  ebook:         { label: 'E-book',         icon: FileText,    badgeClass: 'badge-ebook' },
  'open-access': { label: 'Acceso Abierto', icon: Download,    badgeClass: 'badge-open-access' },
  ibd:           { label: 'IBD',            icon: Printer,     badgeClass: 'badge-ibd' },
  audiobook:     { label: 'Audiolibro',     icon: Headphones,  badgeClass: 'badge-audio' },
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const book = allBooks.find(b => b.id === id);
  const [selectedFormat, setSelectedFormat] = useState<BookFormat | null>(null);
  const [selectedEbookSub, setSelectedEbookSub] = useState<'pdf' | 'epub' | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'toc' | 'author' | 'reviews'>('desc');
  const [notifyEmail, setNotifyEmail] = useState('');
  const [showNotifyForm, setShowNotifyForm] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);

  // Scroll to top on book change
  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center py-20">
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

  const effectiveFormat = selectedFormat || book.formats[0];
  const currentDetail = book.formatDetails?.find(d => d.format === effectiveFormat);
  const isOpenAccess = effectiveFormat === 'open-access';
  const isPrinted = effectiveFormat === 'printed';
  const isEbook = effectiveFormat === 'ebook';
  const isIBD = effectiveFormat === 'ibd';
  const isAudiobook = effectiveFormat === 'audiobook';
  const currentPrice = currentDetail?.price || 0;
  const currentOriginalPrice = currentDetail?.originalPrice;
  const printStatus = currentDetail?.printStatus;
  const isOutOfStock = isPrinted && printStatus === 'out-of-stock';
  const isComingSoon = (isPrinted && printStatus === 'coming-soon');
  const ebookFormats = currentDetail?.ebookFormats || [];
  const effectiveEbookSub = selectedEbookSub || (ebookFormats.length > 0 ? ebookFormats[0] : null);
  const audioStatus = currentDetail?.audioStatus;

  // Related books
  const relatedBooks = allBooks
    .filter(b => b.id !== book.id)
    .sort((a, b) => (a.category === book.category ? -1 : 0) - (b.category === book.category ? -1 : 0))
    .slice(0, 6);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: 'Enlace copiado', description: 'Se ha copiado el enlace al portapapeles.' });
  };

  // Stars component
  const Stars = ({ rating, size = 'text-sm' }: { rating: number; size?: string }) => (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <span key={s} className={`${size} ${s <= Math.round(rating) ? 'text-primary' : 'text-border'}`}>★</span>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* ═══ BREADCRUMB ═══ */}
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center gap-2 font-body text-[11px] text-muted-foreground font-light">
          <Link to="/" className="hover:text-primary transition-colors">Inicio</Link>
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
          <span className="hover:text-primary transition-colors cursor-pointer">Catálogo</span>
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
          <span className="hover:text-primary transition-colors cursor-pointer">{book.category}</span>
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
          <span className="text-foreground font-medium truncate max-w-[250px]">{book.title}</span>
          <button onClick={handleShare} className="ml-auto flex items-center gap-1 hover:text-primary transition-colors">
            <Share2 className="h-3 w-3" /> Compartir
          </button>
        </div>
      </nav>

      {/* ═══ MAIN PRODUCT — 3-column layout ═══ */}
      <section className="py-8 md:py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr_320px] gap-8 lg:gap-10">

            {/* ────── COL 1: Cover + actions ────── */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className={`relative aspect-[3/4] bg-gradient-to-br ${book.coverColor} overflow-hidden group shadow-lg`}
              >
                {book.discount && (
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm font-body font-semibold px-3 py-1.5 z-10">
                    -{book.discount}%
                  </span>
                )}
                <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700" />
              </motion.div>

              {/* Quick actions under cover */}
              <div className="flex gap-2 mt-4">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-border font-body text-xs text-muted-foreground hover:text-primary hover:border-primary transition-colors font-medium">
                  <Copy className="h-3.5 w-3.5" /> Citar
                </button>
                {book.doi && (
                  <a href={`https://doi.org/${book.doi}`} target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-border font-body text-xs text-muted-foreground hover:text-primary hover:border-primary transition-colors font-medium">
                    <ExternalLink className="h-3.5 w-3.5" /> OpenAlex
                  </a>
                )}
              </div>

              {/* Formats available badges */}
              <div className="mt-5">
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-semibold block mb-2">
                  Formatos disponibles
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {book.formats.map(f => (
                    <span key={f} className={`badge-format ${fmtCfg[f].badgeClass} text-[10px]`}>{fmtCfg[f].label}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* ────── COL 2: Product info (scrollable) ────── */}
            <div className="min-w-0">
              {/* Category + Collection */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="font-body text-[11px] tracking-[0.2em] uppercase text-primary font-semibold">{book.category}</span>
                {book.collection && (
                  <>
                    <span className="text-border">·</span>
                    <span className="font-body text-[11px] text-muted-foreground font-light flex items-center gap-1">
                      <BookMarked className="h-3 w-3" /> {book.collection}
                    </span>
                  </>
                )}
              </div>

              {/* Title */}
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground leading-tight mb-1">
                {book.title}
              </h1>
              {book.subtitle && (
                <p className="font-heading text-base md:text-lg font-normal text-muted-foreground italic leading-snug mb-3">
                  {book.subtitle}
                </p>
              )}

              {/* Author(s) */}
              <div className="mb-3">
                <span className="font-body text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Escrito por </span>
                <span className="font-body text-sm font-medium text-foreground">{book.author}</span>
                {book.coAuthors && book.coAuthors.length > 0 && (
                  <span className="font-body text-sm text-muted-foreground font-light"> y {book.coAuthors.join(', ')}</span>
                )}
              </div>

              {/* Meta line */}
              <div className="flex items-center gap-3 text-muted-foreground font-body text-xs font-light mb-4 flex-wrap">
                {book.sede && <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> {book.sede}</span>}
                {book.year && <span>· {book.year}</span>}
                {book.edition && <span>· {book.edition}</span>}
              </div>

              {/* Rating */}
              {book.ratingAvg && (
                <div className="flex items-center gap-2 mb-6">
                  <Stars rating={book.ratingAvg} />
                  <span className="font-body text-xs text-muted-foreground font-light">
                    {book.ratingAvg.toFixed(1)} ({book.ratingCount} reseñas)
                  </span>
                </div>
              )}

              {/* Description */}
              {book.description && (
                <div className="mb-6">
                  <div className="font-body text-sm text-foreground/80 font-light leading-[1.8] whitespace-pre-line">
                    {book.description}
                  </div>
                </div>
              )}

              {/* ── Collapsible: Table of Contents ── */}
              {book.toc && book.toc.length > 0 && (
                <div className="border border-border mb-4">
                  <button
                    onClick={() => setTocOpen(!tocOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 font-body text-sm font-medium text-foreground hover:bg-muted/30 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" /> Tabla de contenido
                    </span>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${tocOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {tocOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 space-y-0">
                          {book.toc.map((item, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                              <span className="font-body text-sm text-foreground/80 font-light">{item.title}</span>
                              {item.page && <span className="font-body text-xs text-muted-foreground">{item.page}</span>}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* ── Keywords ── */}
              {book.keywords && book.keywords.length > 0 && (
                <div className="mb-6">
                  <span className="font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-semibold mb-2 block">
                    Palabras clave
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {book.keywords.map(kw => (
                      <span key={kw} className="font-body text-xs text-foreground/70 bg-muted px-3 py-1 hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Classifications ── */}
              {book.classifications && book.classifications.length > 0 && (
                <div className="mb-6">
                  <span className="font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-semibold mb-2 flex items-center gap-1">
                    <Tag className="h-3 w-3" /> Clasificación temática
                  </span>
                  <div className="space-y-1.5">
                    {book.classifications.map((cl, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className={`font-nav text-[10px] font-bold px-2 py-0.5 ${
                          cl.system === 'BISAC' ? 'bg-primary text-primary-foreground'
                          : cl.system === 'THEMA' ? 'bg-secondary text-secondary-foreground'
                          : 'bg-muted-foreground text-white'
                        }`}>
                          {cl.system}
                        </span>
                        <span className="font-body text-sm text-foreground/80 font-light flex-1">{cl.label}</span>
                        <span className="font-body text-xs text-muted-foreground font-light">{cl.code}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Bibliographic Record ── */}
              <div className="mb-6">
                <span className="font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-semibold mb-3 flex items-center gap-1">
                  <FileText className="h-3 w-3" /> Ficha bibliográfica
                </span>
                <div className="divide-y divide-border border border-border">
                  {[
                    book.doi && { icon: ExternalLink, label: 'DOI', value: book.doi, isLink: true },
                    book.collection && { icon: BookMarked, label: 'Colección', value: book.collection },
                    book.edition && { icon: Info, label: 'Edición', value: book.edition },
                    book.publishCity && { icon: Globe, label: 'Lugar de publicación', value: book.publishCity },
                    book.year && { icon: Info, label: 'Año de publicación', value: String(book.year) },
                    book.pages && { icon: BookOpen, label: 'Páginas', value: `${book.pages} pp.` },
                    book.dimensions && { icon: Info, label: 'Dimensiones', value: book.dimensions },
                    book.language && { icon: Globe, label: 'Idioma', value: book.language },
                    book.targetAudience && { icon: Users, label: 'Público objetivo', value: book.targetAudience },
                    { icon: FileText, label: 'Formatos', value: book.formats.map(f => fmtCfg[f].label).join(' · ') },
                    book.isbnPrint && { icon: Info, label: 'ISBN Impreso', value: book.isbnPrint },
                    book.isbnPdf && { icon: Info, label: 'ISBN E-book PDF', value: book.isbnPdf },
                    book.isbnEpub && { icon: Info, label: 'ISBN E-book EPUB', value: book.isbnEpub },
                    book.isbnIbd && { icon: Info, label: 'ISBN IBD', value: book.isbnIbd },
                  ].filter(Boolean).map((spec: any, i) => {
                    const Icon = spec.icon;
                    return (
                      <div key={i} className="flex items-start gap-3 px-4 py-2.5">
                        <Icon className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <span className="font-body text-xs text-muted-foreground font-medium w-[140px] flex-shrink-0">{spec.label}</span>
                        {spec.isLink ? (
                          <a href={`https://doi.org/${spec.value}`} target="_blank" rel="noopener noreferrer"
                            className="font-body text-xs text-primary hover:underline flex items-center gap-1">
                            {spec.value} <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                        ) : (
                          <span className="font-body text-xs text-foreground/80 font-light">{spec.value}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ────── COL 3: Purchase sidebar (sticky) ────── */}
            <div className="lg:self-start lg:sticky lg:top-[120px]">
              <div className="border border-border bg-card p-5 shadow-sm">
                {/* Format selector */}
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-semibold mb-3 block">
                  Formato
                </span>
                <div className="flex gap-2 mb-5">
                  {book.formats.map(f => {
                    const cfg = fmtCfg[f];
                    const Icon = cfg.icon;
                    const isSelected = effectiveFormat === f;
                    const detail = book.formatDetails?.find(d => d.format === f);
                    const fPrice = detail?.price;

                    return (
                      <button
                        key={f}
                        onClick={() => { setSelectedFormat(f); setSelectedEbookSub(null); setShowNotifyForm(false); }}
                        className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 border transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/5 shadow-sm'
                            : 'border-border hover:border-foreground/30'
                        }`}
                      >
                        <Icon className={`h-4 w-4 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className={`font-body text-xs font-medium ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {cfg.label}
                        </span>
                        <span className={`font-body text-[10px] ${isSelected ? 'text-primary font-medium' : 'text-muted-foreground font-light'}`}>
                          {fPrice && fPrice > 0 ? formatPrice(fPrice) : f === 'open-access' ? 'Gratis' : '—'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Format-specific details box */}
                {isEbook && (
                  <div className="bg-[hsl(var(--format-ebook)/0.06)] border border-[hsl(var(--format-ebook)/0.15)] p-3 mb-4">
                    <span className="font-body text-[10px] tracking-[0.15em] uppercase text-[hsl(var(--format-ebook))] font-semibold block mb-2">
                      Características del E-book
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {effectiveEbookSub && (
                        <div>
                          <span className="font-body text-[10px] text-muted-foreground">Versión digital</span>
                          <span className="font-body text-xs font-medium text-foreground block">{effectiveEbookSub.toUpperCase()}</span>
                        </div>
                      )}
                      {book.fileSize && (
                        <div>
                          <span className="font-body text-[10px] text-muted-foreground">Tamaño</span>
                          <span className="font-body text-xs font-medium text-foreground block">{book.fileSize}</span>
                        </div>
                      )}
                      {book.drmType && (
                        <div>
                          <span className="font-body text-[10px] text-muted-foreground">Tipo de DRM</span>
                          <span className="font-body text-xs font-medium text-foreground block">{book.drmType}</span>
                        </div>
                      )}
                      {book.pages && (
                        <div>
                          <span className="font-body text-[10px] text-muted-foreground">Págs. orientativas</span>
                          <span className="font-body text-xs font-medium text-foreground block">~{book.pages} pp.</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-2 pt-2 border-t border-[hsl(var(--format-ebook)/0.1)]">
                      <p className="font-body text-[10px] text-muted-foreground font-light leading-relaxed">
                        Lee en navegador web o app oficial.
                      </p>
                    </div>
                    {/* Ebook sub-format selector */}
                    {ebookFormats.length > 1 && (
                      <div className="flex gap-2 mt-3">
                        {ebookFormats.map(sub => (
                          <button
                            key={sub}
                            onClick={() => setSelectedEbookSub(sub)}
                            className={`flex-1 py-2 border font-body text-xs font-medium uppercase tracking-wider transition-all ${
                              effectiveEbookSub === sub
                                ? 'border-[hsl(var(--format-ebook))] bg-[hsl(var(--format-ebook)/0.08)] text-[hsl(var(--format-ebook))]'
                                : 'border-border text-muted-foreground hover:border-foreground/30'
                            }`}
                          >
                            {sub.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {isPrinted && !isOutOfStock && !isComingSoon && (
                  <div className="bg-primary/5 border border-primary/10 p-3 mb-4">
                    <span className="font-body text-[10px] tracking-[0.15em] uppercase text-primary font-semibold block mb-2">
                      Detalles del impreso
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {book.pages && (
                        <div>
                          <span className="font-body text-[10px] text-muted-foreground">Páginas</span>
                          <span className="font-body text-xs font-medium text-foreground block">{book.pages} pp.</span>
                        </div>
                      )}
                      {book.dimensions && (
                        <div>
                          <span className="font-body text-[10px] text-muted-foreground">Dimensiones</span>
                          <span className="font-body text-xs font-medium text-foreground block">{book.dimensions}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Price */}
                <div className="mb-4">
                  {currentPrice > 0 ? (
                    <div className="flex items-baseline gap-2">
                      <span className="font-body text-3xl font-bold text-foreground">{formatPrice(currentPrice)}</span>
                      <span className="font-body text-xs text-muted-foreground font-light">COP</span>
                      {currentOriginalPrice && (
                        <span className="font-body text-base text-muted-foreground line-through font-light ml-2">{formatPrice(currentOriginalPrice)}</span>
                      )}
                    </div>
                  ) : isOpenAccess ? (
                    <span className="font-body text-2xl font-bold text-secondary">Descarga gratuita</span>
                  ) : null}
                </div>

                {/* CTA */}
                <div className="space-y-3 mb-5">
                  {/* Quantity for physical */}
                  {(isPrinted || isIBD) && !isOutOfStock && !isComingSoon && (
                    <div className="flex items-center gap-3">
                      <span className="font-body text-xs text-muted-foreground font-light">Cant.:</span>
                      <div className="flex items-center border border-border">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors font-body text-sm">−</button>
                        <span className="w-8 h-8 flex items-center justify-center font-body text-xs font-medium border-x border-border">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors font-body text-sm">+</button>
                      </div>
                    </div>
                  )}

                  {/* Main CTA button */}
                  {isOpenAccess ? (
                    <Button size="lg" className="w-full font-body font-medium bg-secondary hover:bg-secondary/90 text-secondary-foreground uppercase text-sm tracking-[0.15em]">
                      <Download className="h-4 w-4 mr-2" /> Descargar gratis
                    </Button>
                  ) : isAudiobook && audioStatus === 'coming-soon' ? (
                    <Button size="lg" disabled className="w-full font-body font-medium bg-muted text-muted-foreground uppercase text-sm tracking-[0.15em]">
                      <Clock className="h-4 w-4 mr-2" /> Próximamente
                    </Button>
                  ) : isAudiobook && audioStatus === 'free-listen' ? (
                    <Button size="lg" className="w-full font-body font-medium bg-[hsl(var(--format-audio))] hover:opacity-90 text-white uppercase text-sm tracking-[0.15em]">
                      <Headphones className="h-4 w-4 mr-2" /> Escuchar ahora
                    </Button>
                  ) : isOutOfStock ? (
                    <>
                      <Button size="lg" disabled className="w-full font-body font-medium bg-muted text-muted-foreground uppercase text-sm tracking-[0.15em]">
                        <AlertTriangle className="h-4 w-4 mr-2" /> Sin stock
                      </Button>
                      <Button size="lg" variant="outline" onClick={() => setShowNotifyForm(true)}
                        className="w-full font-body font-medium border-primary text-primary hover:bg-primary hover:text-primary-foreground uppercase text-sm tracking-[0.15em]">
                        <Bell className="h-4 w-4 mr-2" /> Avíseme disponibilidad
                      </Button>
                      <AnimatePresence>
                        {showNotifyForm && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="flex gap-2">
                              <input type="email" value={notifyEmail} onChange={e => setNotifyEmail(e.target.value)}
                                placeholder="tu@email.com"
                                className="flex-1 px-3 py-2 border border-border font-body text-sm font-light focus:border-primary outline-none transition-colors" />
                              <Button size="sm" onClick={() => { toast({ title: '¡Listo!', description: 'Te notificaremos cuando esté disponible.' }); setShowNotifyForm(false); }}
                                className="font-body font-medium text-xs">Enviar</Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : isComingSoon ? (
                    <Button size="lg" disabled className="w-full font-body font-medium bg-muted text-muted-foreground uppercase text-sm tracking-[0.15em]">
                      <Clock className="h-4 w-4 mr-2" /> Próximamente
                    </Button>
                  ) : (
                    <Button size="lg" className="w-full font-body font-medium uppercase text-sm tracking-[0.15em]">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {isEbook ? 'Comprar E-book' : isIBD ? 'Solicitar impresión' : 'Agregar al carrito'}
                    </Button>
                  )}
                </div>

                {/* "Qué recibes" benefits */}
                {!isOpenAccess && currentPrice > 0 && (
                  <div className="border-t border-border pt-4">
                    <span className="font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-semibold block mb-2">
                      Qué recibes
                    </span>
                    <ul className="space-y-1.5">
                      {isEbook && (
                        <>
                          <li className="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
                            <Check className="h-3 w-3 text-secondary flex-shrink-0" /> Acceso web y app oficial
                          </li>
                          <li className="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
                            <Check className="h-3 w-3 text-secondary flex-shrink-0" /> Apps para Windows, Mac, iOS y Android
                          </li>
                          <li className="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
                            <Check className="h-3 w-3 text-secondary flex-shrink-0" /> {book.drmType || 'DRM social'} — uso personal
                          </li>
                          <li className="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
                            <Check className="h-3 w-3 text-secondary flex-shrink-0" /> Descarga directa {effectiveEbookSub?.toUpperCase() || 'PDF/EPUB'}
                          </li>
                        </>
                      )}
                      {isPrinted && (
                        <>
                          <li className="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
                            <Truck className="h-3 w-3 text-secondary flex-shrink-0" /> Envío a todo Colombia — 5-7 días hábiles
                          </li>
                          <li className="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
                            <Check className="h-3 w-3 text-secondary flex-shrink-0" /> Libro físico con acabado editorial
                          </li>
                        </>
                      )}
                      {isIBD && (
                        <>
                          <li className="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
                            <Clock className="h-3 w-3 text-secondary flex-shrink-0" /> Producción 10-15 días hábiles
                          </li>
                          <li className="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
                            <Check className="h-3 w-3 text-secondary flex-shrink-0" /> Impresión de alta calidad bajo demanda
                          </li>
                        </>
                      )}
                      <li className="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
                        <Shield className="h-3 w-3 text-secondary flex-shrink-0" /> Pago seguro con cifrado SSL
                      </li>
                    </ul>
                  </div>
                )}

                {/* Wishlist + Share */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 font-body text-xs text-muted-foreground hover:text-primary transition-colors font-light">
                    <Heart className="h-3.5 w-3.5" /> Favoritos
                  </button>
                  <button onClick={handleShare} className="flex-1 flex items-center justify-center gap-1.5 py-2 font-body text-xs text-muted-foreground hover:text-primary transition-colors font-light">
                    <Share2 className="h-3.5 w-3.5" /> Compartir
                  </button>
                </div>
              </div>

              {/* Back to catalog */}
              <Link to="/" className="flex items-center gap-1.5 mt-4 font-body text-xs text-muted-foreground hover:text-primary transition-colors font-light">
                ← Volver al catálogo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TABS: Author / Reviews ═══ */}
      <section className="border-t border-border py-8 md:py-10 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex gap-0 border-b border-border mb-8">
            {[
              { key: 'desc' as const, label: 'Sobre la obra' },
              { key: 'author' as const, label: 'Sobre el autor' },
              { key: 'reviews' as const, label: `Reseñas (${book.ratingCount || 0})` },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-3 font-body text-sm transition-all border-b-2 -mb-[1px] ${
                  activeTab === tab.key
                    ? 'border-primary text-primary font-medium'
                    : 'border-transparent text-muted-foreground font-light hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="max-w-3xl">
              {activeTab === 'desc' && (
                <div className="font-body text-sm text-foreground/80 font-light leading-[1.8] whitespace-pre-line">
                  {book.description || 'Descripción no disponible para este título.'}
                </div>
              )}

              {activeTab === 'author' && (
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-primary/10 flex items-center justify-center">
                      <Users className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-foreground">{book.author}</h3>
                      {book.sede && <p className="font-body text-xs text-muted-foreground font-light">{book.sede} · Universidad Nacional de Colombia</p>}
                    </div>
                  </div>
                  <p className="font-body text-sm text-foreground/80 font-light leading-[1.8]">
                    {book.aboutAuthor || 'Información sobre el autor no disponible.'}
                  </p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Summary */}
                  {book.ratingAvg && (
                    <div className="flex items-center gap-6 p-5 bg-card border border-border">
                      <div className="text-center">
                        <span className="font-heading text-4xl font-bold text-foreground">{book.ratingAvg.toFixed(1)}</span>
                        <div className="mt-1"><Stars rating={book.ratingAvg} size="text-xs" /></div>
                        <p className="font-body text-xs text-muted-foreground mt-1 font-light">{book.ratingCount} reseñas</p>
                      </div>
                      <div className="flex-1 space-y-1">
                        {[5,4,3,2,1].map(star => (
                          <div key={star} className="flex items-center gap-2">
                            <span className="font-body text-xs text-muted-foreground w-3">{star}</span>
                            <div className="flex-1 h-2 bg-border overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${star === 5 ? 45 : star === 4 ? 30 : star === 3 ? 15 : star === 2 ? 7 : 3}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sample reviews */}
                  {[
                    { name: 'Carlos M.', rating: 5, date: 'Hace 2 semanas', text: 'Excelente obra. Muy bien documentada y con un enfoque que aporta al debate actual en la disciplina.' },
                    { name: 'Ana R.', rating: 4, date: 'Hace 1 mes', text: 'Buen material de referencia para investigación. La edición es de calidad y la estructura facilita la consulta.' },
                    { name: 'Diego P.', rating: 4, date: 'Hace 2 meses', text: 'Lectura obligada para estudiantes de posgrado. Rigor académico con claridad expositiva.' },
                  ].map((review, i) => (
                    <div key={i} className="border-b border-border pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary/10 flex items-center justify-center font-body text-xs font-medium text-primary">{review.name[0]}</div>
                          <span className="font-body text-sm font-medium text-foreground">{review.name}</span>
                          <Stars rating={review.rating} size="text-xs" />
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
      <section className="border-t border-border py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="font-body text-[11px] tracking-[0.2em] uppercase text-primary font-semibold mb-1">Misma temática</p>
              <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">También puede interesarte</h2>
            </div>
            <Link to="/" className="font-body text-xs text-primary font-medium hover:underline uppercase tracking-wider flex items-center gap-1">
              Ver más <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {relatedBooks.map((b, i) => (
              <BookCard key={b.id} book={b} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
