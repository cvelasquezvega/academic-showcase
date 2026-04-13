import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck, Clock, Bell, Heart, ShoppingCart,
  Share2, BookOpen, FileText, Headphones, ChevronRight, ChevronDown,
  Check, AlertTriangle, Info, ExternalLink, Copy,
  Monitor, Smartphone, Shield, Tag, BookMarked, Users, Globe, Unlock, Package,
  Leaf, Target, Music2, Video, PlayCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';
import BookCover from '@/components/BookCover';
import { featuredBooks, bestsellerBooks, formatPrice } from '@/data/books';
import type { Book, BookFormat } from '@/data/books';
import { toast } from '@/hooks/use-toast';
import logoDpa from '@/assets/Logo-DPA.png';

const allBooks = [...featuredBooks, ...bestsellerBooks];

/* ── Format config ── */
const fmtCfg: Record<BookFormat, { label: string; icon: typeof BookOpen; badgeClass: string }> = {
  printed:       { label: 'Impreso',        icon: BookOpen,    badgeClass: 'badge-print' },
  ebook:         { label: 'E-book',         icon: Smartphone,  badgeClass: 'badge-ebook' },
  'open-access': { label: 'Acceso Abierto', icon: Unlock,      badgeClass: 'badge-open-access' },
  ibd:           { label: 'IBD',            icon: Package,     badgeClass: 'badge-ibd' },
  audiobook:     { label: 'Audiolibro',     icon: Headphones,  badgeClass: 'badge-audio' },
};

const formatCssVar: Record<BookFormat, string> = {
  printed: '--format-print',
  ebook: '--format-ebook',
  'open-access': '--format-open',
  ibd: '--format-ibd',
  audiobook: '--format-audio',
};

const multimediaCfg = {
  mp3: {
    label: 'MP3',
    icon: Music2,
    color: 'hsl(var(--format-audio))',
    soft: 'hsl(var(--format-audio) / 0.08)',
  },
  mp4: {
    label: 'MP4',
    icon: Video,
    color: 'hsl(var(--format-ebook))',
    soft: 'hsl(var(--format-ebook) / 0.08)',
  },
};

const odsItems = [
  {
    number: '10',
    color: '#DF1683',
    title: 'Reducción de las Desigualdades',
    description: 'Impulsa liderazgos inclusivos y equitativos',
  },
  {
    number: '11',
    color: '#F99D26',
    title: 'Ciudades y Comunidades Sostenibles',
    description: 'Aporta al diseño urbano inclusivo, seguro y resiliente',
  },
  {
    number: '16',
    color: '#00689D',
    title: 'Paz, Justicia e Instituciones',
    description: 'Fortalece el Estado de derecho y las instituciones democráticas',
  },
];

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
  const currentFormatColor = `hsl(var(${formatCssVar[effectiveFormat]}))`;
  const currentFormatSoftColor = `hsl(var(${formatCssVar[effectiveFormat]}) / 0.08)`;
  const detailCardTitle: Record<BookFormat, string> = {
    printed: 'Características del impreso',
    ebook: 'Características del E-book',
    'open-access': 'Características del acceso abierto',
    ibd: 'Características del impreso bajo demanda',
    audiobook: 'Características del audiolibro',
  };
  const detailLinkLabel: Record<BookFormat, string> = {
    printed: 'Detalles de entrega',
    ebook: 'Detalles de lectura',
    'open-access': 'Detalles de lectura',
    ibd: 'Detalles de entrega',
    audiobook: 'Detalles de escucha',
  };
  const detailPopover: Record<BookFormat, { title: string; body: string; note: string }> = {
    printed: {
      title: 'Compra de impreso',
      body: 'Recibirás un ejemplar físico. La entrega depende de disponibilidad, preparación del pedido y destino de envío.',
      note: 'Libro físico con envío a domicilio.',
    },
    ebook: {
      title: 'Lectura digital',
      body: 'Puedes leer en navegador web o en apps oficiales para Windows, Mac, iOS y Android. No se envía PDF/EPUB por correo ni queda como descarga directa. No compatible con Linux ni Kindle.',
      note: 'Lee en navegador web o app oficial.',
    },
    'open-access': {
      title: 'Acceso abierto',
      body: 'Puedes consultar y descargar este título sin costo desde el entorno de lectura autorizado.',
      note: 'Consulta y descarga gratuita.',
    },
    ibd: {
      title: 'Impreso bajo demanda',
      body: 'Primero se produce el ejemplar bajo pedido y luego se envía como libro físico. El tiempo total incluye producción más envío según destino.',
      note: 'Producción bajo demanda + envío físico.',
    },
    audiobook: {
      title: 'Escucha digital',
      body: 'Accede al audio desde el entorno habilitado para este título. La disponibilidad puede depender de la licencia y del formato activo.',
      note: 'Escucha desde el entorno oficial.',
    },
  };
  const detailItems = (() => {
    if (isEbook || isOpenAccess) {
      return [
        { icon: Monitor, label: 'Versión digital', value: effectiveEbookSub ? effectiveEbookSub.toUpperCase() : 'Web' },
        book.fileSize && { icon: FileText, label: 'Tamaño', value: book.fileSize },
        { icon: Shield, label: 'Tipo de DRM', value: book.drmType || 'Propietario' },
        book.pages && { icon: BookOpen, label: 'Págs. orientativas', value: `~${book.pages} pp.` },
      ].filter(Boolean) as { icon: typeof BookOpen; label: string; value: string }[];
    }

    if (isIBD) {
      return [
        { icon: BookOpen, label: 'Encuadernación', value: 'Rústica bajo demanda' },
        book.pages && { icon: FileText, label: 'Páginas', value: `${book.pages} pp.` },
        book.dimensions && { icon: Package, label: 'Dimensiones', value: book.dimensions },
        { icon: Truck, label: 'Entrega', value: '15 a 21 días hábiles' },
      ].filter(Boolean) as { icon: typeof BookOpen; label: string; value: string }[];
    }

    if (isPrinted) {
      return [
        { icon: BookOpen, label: 'Encuadernación', value: 'Rústica' },
        book.pages && { icon: FileText, label: 'Páginas', value: `${book.pages} pp.` },
        book.dimensions && { icon: Package, label: 'Dimensiones', value: book.dimensions },
      ].filter(Boolean) as { icon: typeof BookOpen; label: string; value: string }[];
    }

    return [
      { icon: Headphones, label: 'Formato', value: 'Audio digital' },
      { icon: Smartphone, label: 'Acceso', value: 'App o navegador' },
    ];
  })();

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
          <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_320px] gap-8 lg:gap-10">

            {/* ────── COL 1: Cover + actions ────── */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="group"
              >
                <BookCover book={book} className="aspect-[3/4] shadow-lg" imageClassName="group-hover:scale-105 transition-transform duration-700">
                  {book.discount && (
                    <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm font-body font-semibold px-3 py-1.5 z-10">
                      -{book.discount}%
                    </span>
                  )}
                </BookCover>
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
                  {book.formats.map(f => {
                    const Icon = fmtCfg[f].icon;
                    return (
                      <span key={f} className={`badge-format ${fmtCfg[f].badgeClass} text-[10px] gap-1`}>
                        <Icon className="h-3 w-3" /> {fmtCfg[f].label}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 space-y-5">
                <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
                  <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                    <Leaf className="h-4 w-4 text-[hsl(var(--format-print))]" />
                    <p className="font-body text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                      Alineado con los ODS - Agenda 2030
                    </p>
                  </div>
                  <div className="divide-y divide-border">
                    {odsItems.map((item) => (
                      <div key={item.number} className="flex items-center gap-3 px-4 py-3">
                        <div
                          className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg text-white"
                          style={{ backgroundColor: item.color }}
                        >
                          <span className="font-body text-[9px] font-bold uppercase leading-none">ODS</span>
                          <span className="font-body text-lg font-bold leading-none">{item.number}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-body text-xs font-bold leading-snug" style={{ color: item.color }}>
                            {item.title}
                          </p>
                          <p className="mt-1 font-body text-[11px] leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border px-4 py-2 text-right">
                    <span className="font-body text-[10px] text-muted-foreground">* ONU Agenda 2030</span>
                  </div>
                </div>

                <div className="overflow-hidden rounded-lg border border-[hsl(var(--format-ebook)/0.22)] bg-card shadow-sm">
                  <div className="flex items-center gap-4 px-4 py-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center">
                      <img src={logoDpa} alt="Declaración de prestigio académico" className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-body text-[11px] font-bold uppercase leading-relaxed tracking-[0.22em] text-[#0A7080]">
                        Declaración de prestigio académico
                      </p>
                      <p className="mt-1 font-body text-xs text-muted-foreground">
                        Certificación de calidad editorial
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] gap-3 border-t border-[hsl(var(--format-ebook)/0.14)] px-4 py-4">
                    <div className="space-y-2">
                      <p className="font-body text-[11px] text-muted-foreground">Fecha de emisión</p>
                      <p className="font-body text-[11px] text-muted-foreground">Evaluación</p>
                      <p className="font-body text-[11px] text-muted-foreground">Estado</p>
                    </div>
                    <div className="space-y-2 text-right">
                      <p className="font-body text-[11px] font-bold text-[#0A7080]">15-03-2025</p>
                      <p className="font-body text-[11px] text-foreground">Revisión por pares ciegos</p>
                      <span className="inline-flex rounded-full bg-[#DCEFF2] px-3 py-1 font-body text-[11px] font-bold text-[#0A7080]">
                        Vigente
                      </span>
                    </div>
                  </div>
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
              {book.multimediaResources && book.multimediaResources.length > 0 && (
                <div className="mb-6 border border-border bg-card p-4 shadow-sm">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <span className="font-body text-[10px] tracking-[0.16em] uppercase text-primary font-bold">
                        Recursos multimedia
                      </span>
                      <p className="mt-1 font-body text-xs text-muted-foreground font-light">
                        Material complementario disponible para esta obra.
                      </p>
                    </div>
                    <Target className="h-4 w-4 text-primary" />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {book.multimediaResources.map(resource => {
                      const cfg = multimediaCfg[resource.type];
                      const Icon = cfg.icon;

                      return (
                        <button
                          key={`${resource.type}-${resource.title}`}
                          className="group flex items-start gap-3 border p-3 text-left transition-all hover:-translate-y-0.5 hover:shadow-sm"
                          style={{ borderColor: cfg.color, backgroundColor: cfg.soft }}
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center text-white" style={{ backgroundColor: cfg.color }}>
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2">
                              <span className="font-body text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: cfg.color }}>
                                {cfg.label}
                              </span>
                              {resource.duration && (
                                <span className="font-body text-[10px] text-muted-foreground">{resource.duration}</span>
                              )}
                            </span>
                            <span className="mt-1 block font-body text-sm font-semibold leading-snug text-foreground">
                              {resource.title}
                            </span>
                            <span className="mt-1 block font-body text-[11px] leading-relaxed text-muted-foreground">
                              {resource.description}
                            </span>
                            <span className="mt-2 flex items-center gap-1 font-body text-[11px] font-semibold text-primary">
                              <PlayCircle className="h-3.5 w-3.5" />
                              Vista previa
                              {resource.size && <span className="font-light text-muted-foreground">· {resource.size}</span>}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

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
                <div className="grid grid-cols-3 gap-1.5 mb-3">
                  {book.formats.map(f => {
                    const cfg = fmtCfg[f];
                    const Icon = cfg.icon;
                    const isSelected = effectiveFormat === f;
                    const detail = book.formatDetails?.find(d => d.format === f);
                    const fPrice = detail?.price;
                    const formatColor = `hsl(var(${formatCssVar[f]}))`;
                    const formatSoftColor = `hsl(var(${formatCssVar[f]}) / 0.08)`;

                    return (
                      <button
                        key={f}
                        onClick={() => { setSelectedFormat(f); setSelectedEbookSub(null); setShowNotifyForm(false); }}
                        aria-pressed={isSelected}
                        className={`relative min-h-[52px] overflow-hidden border bg-card px-2 py-2 text-left transition-all hover:-translate-y-0.5 hover:shadow-sm ${
                          isSelected
                            ? 'shadow-sm ring-2'
                            : 'border-border hover:border-foreground/30'
                        }`}
                        style={isSelected
                          ? { borderColor: formatColor, backgroundColor: formatColor, ['--tw-ring-color' as string]: 'hsl(var(--ring) / 0.35)' }
                          : { backgroundColor: formatSoftColor }}
                      >
                        <span className="absolute left-0 top-0 h-1 w-full" style={{ backgroundColor: isSelected ? 'rgba(255,255,255,0.5)' : formatColor }} />
                        <span className="flex items-start justify-between gap-2">
                          <span className="flex min-w-0 items-start gap-1.5">
                            <Icon className="mt-0.5 h-3 w-3 flex-shrink-0" style={{ color: isSelected ? '#fff' : formatColor }} />
                            <span>
                        <span className={`font-body text-[11px] font-semibold block leading-tight whitespace-nowrap ${isSelected ? 'text-white' : 'text-foreground/75'}`}>
                          {cfg.label}
                        </span>
                        <span className={`font-body text-[10px] block mt-0.5 whitespace-nowrap ${isSelected ? 'font-semibold text-white/85' : 'text-muted-foreground font-light'}`}>
                          {fPrice && fPrice > 0 ? formatPrice(fPrice) : f === 'open-access' ? 'Gratis' : '—'}
                        </span>
                            </span>
                          </span>
                          {isSelected && (
                            <Check className="h-3 w-3 flex-shrink-0 text-white" />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Format-specific details box */}
                <div
                  className="border p-3 mb-4"
                  style={{ borderColor: `hsl(var(${formatCssVar[effectiveFormat]}) / 0.18)`, backgroundColor: currentFormatSoftColor }}
                >
                  <span
                    className="font-body text-[10px] tracking-[0.16em] uppercase font-bold block mb-2"
                    style={{ color: currentFormatColor }}
                  >
                    {detailCardTitle[effectiveFormat]}
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    {detailItems.map(({ icon: DetailIcon, label, value }) => (
                      <div key={label} className="flex items-start gap-2">
                        <DetailIcon className="h-3 w-3 mt-0.5 flex-shrink-0" style={{ color: currentFormatColor }} />
                        <div>
                          <span className="font-body text-[10px] text-muted-foreground block leading-tight">{label}</span>
                          <span className="font-body text-[11px] font-semibold text-foreground block leading-snug">{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 bg-card/80 border border-white/70 px-3 py-2 shadow-sm">
                    <p className="font-body text-[11px] text-muted-foreground font-light leading-relaxed">
                      {detailPopover[effectiveFormat].note}
                    </p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="mt-1 font-body text-[11px] font-semibold hover:underline"
                          style={{ color: currentFormatColor }}
                        >
                          {detailLinkLabel[effectiveFormat]}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent align="start" side="top" className="w-80 rounded-md border-border p-4 shadow-lg">
                        <h4 className="font-body text-sm font-semibold text-foreground mb-2">
                          {detailPopover[effectiveFormat].title}
                        </h4>
                        <p className="font-body text-xs text-muted-foreground font-light leading-relaxed">
                          {detailPopover[effectiveFormat].body}
                        </p>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {false && isEbook && ebookFormats.length > 1 && (
                    <div className="flex gap-2 mt-3">
                      {ebookFormats.map(sub => (
                        <button
                          key={sub}
                          onClick={() => setSelectedEbookSub(sub)}
                          className="flex-1 border py-2 font-body text-xs font-semibold uppercase tracking-[0.08em] transition-all"
                          style={effectiveEbookSub === sub
                            ? { borderColor: currentFormatColor, backgroundColor: 'hsl(var(--format-ebook) / 0.12)', color: currentFormatColor }
                            : { borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}
                        >
                          {sub.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {false && isEbook && (
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

                {false && isPrinted && !isOutOfStock && !isComingSoon && (
                  <div className="border p-3 mb-4" style={{ borderColor: currentFormatSoftColor, backgroundColor: currentFormatSoftColor }}>
                    <span className="font-body text-[10px] tracking-[0.15em] uppercase font-semibold block mb-2" style={{ color: currentFormatColor }}>
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
                <div className="mb-3">
                  {currentPrice > 0 ? (
                    <div className="flex items-baseline gap-2">
                      <span className="font-body text-2xl font-bold text-primary tracking-wide">{formatPrice(currentPrice)}</span>
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
                    <Button size="lg" className="w-full font-body font-semibold hover:opacity-90 text-white uppercase text-sm tracking-[0.08em]" style={{ backgroundColor: currentFormatColor }}>
                      <Unlock className="h-4 w-4 mr-2" /> Descargar gratis
                    </Button>
                  ) : isAudiobook && audioStatus === 'coming-soon' ? (
                    <Button size="lg" disabled className="w-full font-body font-semibold bg-muted text-muted-foreground uppercase text-sm tracking-[0.08em]">
                      <Clock className="h-4 w-4 mr-2" /> Próximamente
                    </Button>
                  ) : isAudiobook && audioStatus === 'free-listen' ? (
                    <Button size="lg" className="w-full font-body font-semibold hover:opacity-90 text-white uppercase text-sm tracking-[0.08em]" style={{ backgroundColor: currentFormatColor }}>
                      <Headphones className="h-4 w-4 mr-2" /> Escuchar ahora
                    </Button>
                  ) : isOutOfStock ? (
                    <>
                      <Button size="lg" disabled className="w-full font-body font-semibold bg-muted text-muted-foreground uppercase text-sm tracking-[0.08em]">
                        <AlertTriangle className="h-4 w-4 mr-2" /> Sin stock
                      </Button>
                      <Button size="lg" variant="outline" onClick={() => setShowNotifyForm(true)}
                        className="w-full font-body font-semibold hover:opacity-90 uppercase text-sm tracking-[0.08em]"
                        style={{ borderColor: currentFormatColor, color: currentFormatColor, backgroundColor: showNotifyForm ? currentFormatSoftColor : undefined }}>
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
                    <Button size="lg" disabled className="w-full font-body font-semibold bg-muted text-muted-foreground uppercase text-sm tracking-[0.08em]">
                      <Clock className="h-4 w-4 mr-2" /> Próximamente
                    </Button>
                  ) : (
                    <Button size="lg" className="w-full font-body font-semibold bg-primary hover:bg-primary/90 text-primary-foreground uppercase text-sm tracking-[0.08em]">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Agregar al carrito
                    </Button>
                  )}
                </div>

                {/* "Qué recibes" benefits */}
                {!isOpenAccess && currentPrice > 0 && (
                  <div className="border border-border bg-card p-4 shadow-sm">
                    <span className="font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-semibold block mb-2">
                      Qué recibes
                    </span>
                    <ul className="space-y-1.5">
                      {isEbook && (
                        <>
                          <li className="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
                            <Check className="h-3 w-3 text-primary flex-shrink-0" /> Acceso web y app oficial
                          </li>
                          <li className="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
                            <Check className="h-3 w-3 text-primary flex-shrink-0" /> Apps para Windows, Mac, iOS y Android
                          </li>
                          <li className="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
                            <Check className="h-3 w-3 text-primary flex-shrink-0" /> {book.drmType || 'DRM social'} — uso personal
                          </li>
                          <li className="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
                            <Check className="h-3 w-3 text-primary flex-shrink-0" /> Descarga directa {effectiveEbookSub?.toUpperCase() || 'PDF/EPUB'}
                          </li>
                        </>
                      )}
                      {isPrinted && (
                        <>
                          <li className="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
                            <Truck className="h-3 w-3 text-primary flex-shrink-0" /> Envío a todo Colombia — 5-7 días hábiles
                          </li>
                          <li className="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
                            <Check className="h-3 w-3 text-primary flex-shrink-0" /> Libro físico con acabado editorial
                          </li>
                        </>
                      )}
                      {isIBD && (
                        <>
                          <li className="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
                            <Clock className="h-3 w-3 text-primary flex-shrink-0" /> Producción 10-15 días hábiles
                          </li>
                          <li className="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
                            <Check className="h-3 w-3 text-primary flex-shrink-0" /> Impresión de alta calidad bajo demanda
                          </li>
                        </>
                      )}
                      <li className="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
                        <Shield className="h-3 w-3 text-primary flex-shrink-0" /> Pago seguro con cifrado SSL
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
