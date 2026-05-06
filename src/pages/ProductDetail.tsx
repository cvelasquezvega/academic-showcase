import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck, Clock, Bell, Heart, ShoppingCart,
  Share2, BookOpen, FileText, Headphones, ChevronRight, ChevronDown,
  Check, AlertTriangle, Info, ExternalLink, Copy,
  Monitor, Smartphone, Shield, BookMarked, Users, Globe, Unlock, Package,
  Leaf
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';
import BookCover from '@/components/BookCover';
import { featuredBooks, bestsellerBooks, formatPrice } from '@/data/books';
import type { Book, BookFormat, MultimediaResource } from '@/data/books';
import { toast } from '@/hooks/use-toast';
import logoDpa from '@/assets/Logo-DPA.png';

const allBooks = [...featuredBooks, ...bestsellerBooks];
const siteUrl = 'https://editorial.unal.edu.co';
const defaultTitle = 'Editorial UNAL | Catálogo de publicaciones académicas';
const defaultDescription = 'Catálogo editorial de la Universidad Nacional de Colombia: libros académicos, eBooks, acceso abierto, audiolibros y publicaciones universitarias.';
const defaultImage = `${siteUrl}/favicon-editorial_UN.png`;

const upsertMeta = (key: 'name' | 'property', value: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${value}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(key, value);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const upsertLink = (rel: string, href: string) => {
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
};

const upsertJsonLd = (id: string, data: object) => {
  let tag = document.getElementById(id) as HTMLScriptElement | null;
  if (!tag) {
    tag = document.createElement('script');
    tag.id = id;
    tag.type = 'application/ld+json';
    document.head.appendChild(tag);
  }
  tag.textContent = JSON.stringify(data);
};

const applyDefaultSeo = () => {
  document.title = defaultTitle;
  upsertMeta('name', 'description', defaultDescription);
  upsertMeta('property', 'og:title', defaultTitle);
  upsertMeta('property', 'og:description', defaultDescription);
  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:url', siteUrl);
  upsertMeta('property', 'og:image', defaultImage);
  upsertMeta('name', 'twitter:title', defaultTitle);
  upsertMeta('name', 'twitter:description', defaultDescription);
  upsertMeta('name', 'twitter:image', defaultImage);
  upsertLink('canonical', `${siteUrl}/`);
  document.getElementById('book-jsonld')?.remove();
};

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

const femaleAuthorNames = [
  'maria', 'luz', 'mara', 'rosa', 'camila', 'patricia', 'krisna', 'claudia',
];

const maleAuthorNames = [
  'francisco', 'carlos', 'felipe', 'juan', 'ivan', 'luis', 'gregorio', 'camilo',
];

const authorPortraits = {
  female: [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=240&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80',
  ],
  male: [
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80',
  ],
  neutral: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=240&q=80',
};

const knownAuthorOrcids: Record<string, string> = {
  'maria angelica sanchez alvarez': '0000-0002-4897-7940',
  'luz gabriela arango': '0000-0002-6354-1643',
  'mara viveros vigoya': '0000-0003-3257-7149',
};

const normalizePersonName = (name: string) =>
  name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const getAuthorOrcid = (name: string) => knownAuthorOrcids[normalizePersonName(name)];

const getAuthorPortrait = (name: string) => {
  const normalized = normalizePersonName(name);

  if (normalized.includes('grupo')) {
    return authorPortraits.neutral;
  }

  const firstName = normalized.split(/\s+/)[0];
  const pool = femaleAuthorNames.includes(firstName)
    ? authorPortraits.female
    : maleAuthorNames.includes(firstName)
      ? authorPortraits.male
      : authorPortraits.neutral;

  if (typeof pool === 'string') {
    return pool;
  }

  const index = [...normalized].reduce((sum, char) => sum + char.charCodeAt(0), 0) % pool.length;
  return pool[index];
};

const MultimediaPreviewCard = ({ resource }: { resource: MultimediaResource }) => {
  const isSpotify = resource.provider === 'spotify' && resource.embedUrl;
  const isYoutube = resource.provider === 'youtube' && resource.embedUrl;
  const isAudioFile = resource.type === 'mp3' && resource.mediaUrl;
  const isVideoFile = resource.type === 'mp4' && resource.mediaUrl;

  return (
    <div className="overflow-hidden border border-border bg-background/70">
      <div className="px-3 py-3">
        <p className="font-body text-sm font-semibold leading-snug text-foreground">
          {resource.title}
        </p>
        <p className="mt-1 font-body text-[11px] leading-relaxed text-muted-foreground">
          {resource.description}
        </p>
        {(resource.duration || resource.size) && (
          <p className="mt-2 font-body text-[10px] text-muted-foreground">
            {[resource.duration, resource.size].filter(Boolean).join(' - ')}
          </p>
        )}
      </div>

      {isSpotify && (
        <iframe
          title={resource.title}
          src={resource.embedUrl}
          className="h-[152px] w-full border-0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      )}

      {isYoutube && (
        <div className="aspect-video bg-foreground">
          <iframe
            title={resource.title}
            src={resource.embedUrl}
            className="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      )}

      {isAudioFile && !isSpotify && (
        <div className="px-3 pb-3">
          <audio controls preload="metadata" className="w-full">
            <source src={resource.mediaUrl} type="audio/mpeg" />
          </audio>
        </div>
      )}

      {isVideoFile && !isYoutube && (
        <video
          controls
          preload="metadata"
          poster={resource.thumbnailUrl}
          className="aspect-video w-full bg-foreground object-cover"
        >
          <source src={resource.mediaUrl} type="video/mp4" />
        </video>
      )}

      {!isSpotify && !isYoutube && !isAudioFile && !isVideoFile && (
        <div className="mx-3 mb-3 flex min-h-[88px] items-center justify-center border border-dashed border-border bg-muted/40">
          <span className="font-body text-[11px] font-semibold text-muted-foreground">
            Vista preliminar pendiente
          </span>
        </div>
      )}
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const book = allBooks.find(b => b.id === id);
  const [selectedFormat, setSelectedFormat] = useState<BookFormat | null>(null);
  const [selectedEbookSub, setSelectedEbookSub] = useState<'pdf' | 'epub' | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'toc' | 'author'>('desc');
  const [notifyEmail, setNotifyEmail] = useState('');
  const [showNotifyForm, setShowNotifyForm] = useState(false);
  const [multimediaOpen, setMultimediaOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [collaboratorsOpen, setCollaboratorsOpen] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(false);

  // Scroll to top on book change
  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  useEffect(() => {
    const handleScroll = () => setShowMobileCta(window.scrollY > 520);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setSelectedFormat(null);
    setSelectedEbookSub(null);
    setQuantity(1);
    setShowNotifyForm(false);
    setNotifyEmail('');
    setMultimediaOpen(false);
    setTocOpen(false);
    setCollaboratorsOpen(false);
    setDescriptionExpanded(false);
  }, [id]);

  useEffect(() => {
    if (!book) {
      applyDefaultSeo();
      return;
    }

    const canonicalUrl = `${siteUrl}/libro/${book.id}`;
    const title = `${book.title} | Editorial UNAL`;
    const description = (book.description || `${book.title}, publicación académica de Editorial UNAL.`)
      .replace(/\s+/g, ' ')
      .slice(0, 158);
    const image = book.coverImage || defaultImage;
    const pricedDetail = book.formatDetails?.find(detail => detail.price && detail.price > 0);
    const price = pricedDetail?.price || book.price;
    const availability = book.formatDetails?.some(detail => detail.printStatus === 'out-of-stock')
      ? 'https://schema.org/OutOfStock'
      : 'https://schema.org/InStock';

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'author', book.author);
    upsertMeta('name', 'keywords', [book.category, book.collection, ...(book.keywords || [])].filter(Boolean).join(', '));
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'book');
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:image:alt', `Portada de ${book.title}`);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);
    upsertLink('canonical', canonicalUrl);

    upsertJsonLd('book-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'Book',
      '@id': `${canonicalUrl}#book`,
      name: book.title,
      alternateName: book.subtitle,
      description,
      url: canonicalUrl,
      image,
      author: {
        '@type': 'Person',
        name: book.author,
      },
      contributor: book.coAuthors?.map(name => ({ '@type': 'Person', name })),
      publisher: {
        '@type': 'Organization',
        name: 'Editorial Universidad Nacional de Colombia',
        url: siteUrl,
      },
      datePublished: book.year?.toString(),
      inLanguage: book.language || 'es-CO',
      numberOfPages: book.pages,
      bookEdition: book.edition,
      isbn: book.isbnPrint || book.isbnPdf || book.isbnEpub || book.isbnIbd,
      keywords: book.keywords,
      genre: book.category,
      sameAs: book.doi ? `https://doi.org/${book.doi}` : undefined,
      offers: price ? {
        '@type': 'Offer',
        url: canonicalUrl,
        price,
        priceCurrency: 'COP',
        availability,
        seller: {
          '@type': 'Organization',
          name: 'Editorial Universidad Nacional de Colombia',
        },
      } : undefined,
      aggregateRating: book.ratingAvg && book.ratingCount ? {
        '@type': 'AggregateRating',
        ratingValue: book.ratingAvg,
        reviewCount: book.ratingCount,
      } : undefined,
    });

    return applyDefaultSeo;
  }, [book]);

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

  const effectiveFormat = selectedFormat || (book.formats.includes('open-access') ? 'open-access' : book.formats[0]);
  const currentDetail = book.formatDetails?.find(d => d.format === effectiveFormat);
  const isOpenAccess = effectiveFormat === 'open-access';
  const isPrinted = effectiveFormat === 'printed';
  const isEbook = effectiveFormat === 'ebook';
  const isIBD = effectiveFormat === 'ibd';
  const isAudiobook = effectiveFormat === 'audiobook';
  const currentPrice = currentDetail?.price || 0;
  const currentOriginalPrice = currentDetail?.originalPrice || book.originalPrice;
  const derivedDiscountOriginalPrice = book.discount && currentPrice > 0
    ? Math.round(currentPrice / (1 - book.discount / 100))
    : undefined;
  const visibleOriginalPrice = currentOriginalPrice || derivedDiscountOriginalPrice;
  const savingsAmount = visibleOriginalPrice && visibleOriginalPrice > currentPrice
    ? visibleOriginalPrice - currentPrice
    : 0;
  const savingsPercent = savingsAmount && visibleOriginalPrice
    ? Math.round((savingsAmount / visibleOriginalPrice) * 100)
    : book.discount || 0;
  const printStatus = currentDetail?.printStatus;
  const isOutOfStock = isPrinted && printStatus === 'out-of-stock';
  const isComingSoon = (isPrinted && printStatus === 'coming-soon');
  const ebookFormats = currentDetail?.ebookFormats || [];
  const effectiveEbookSub = selectedEbookSub || (ebookFormats.length > 0 ? ebookFormats[0] : null);
  const audioStatus = currentDetail?.audioStatus;
  const currentFormatColor = `hsl(var(${formatCssVar[effectiveFormat]}))`;
  const currentFormatSoftColor = `hsl(var(${formatCssVar[effectiveFormat]}) / 0.08)`;
  const availabilityState = isOutOfStock
    ? { label: 'Agotado', helper: 'Puedes activar el aviso de disponibilidad.' }
    : isComingSoon || (isAudiobook && audioStatus === 'coming-soon')
      ? { label: 'Próximamente', helper: 'Este formato aún no está disponible.' }
      : isIBD
        ? { label: 'Impresión bajo demanda', helper: 'Preparación estimada de 15 a 21 días hábiles.' }
        : isOpenAccess
          ? { label: 'Acceso abierto', helper: 'Consulta sin costo desde el recurso autorizado.' }
          : { label: 'Disponible', helper: isEbook ? 'Acceso digital después de la compra.' : 'Listo para compra según disponibilidad.' };
  const mobileCtaLabel = isOpenAccess
    ? 'Abrir acceso'
    : isOutOfStock
      ? 'Avísenme'
      : isComingSoon || (isAudiobook && audioStatus === 'coming-soon')
        ? 'Próximamente'
        : isAudiobook && audioStatus === 'free-listen'
          ? 'Escuchar'
          : 'Agregar';
  const mobileCtaDisabled = isComingSoon || (isAudiobook && audioStatus === 'coming-soon');
  const lowestPurchasePrice = book.formatDetails
    ?.map(detail => detail.price)
    .filter((price): price is number => Boolean(price && price > 0))
    .sort((a, b) => a - b)[0] || book.price || currentPrice;
  const publicationCollaborators = [
    { name: book.author, role: 'Autoría', bio: book.aboutAuthor },
    ...(book.coAuthors || []).map(name => ({ name, role: 'Coautoría', bio: undefined })),
  ];
  const hasPreviewResources = Boolean(book.multimediaResources?.length);
  const shouldClampDescription = Boolean(book.description && book.description.length > 520);
  const invertName = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length < 2) return name;
    return `${parts.slice(-1).join(' ')}, ${parts.slice(0, -1).join(' ')}`;
  };
  const detailCardTitle: Record<BookFormat, string> = {
    printed: 'Características del impreso',
    ebook: 'Características del E-book',
    'open-access': 'Acceso abierto disponible',
    ibd: 'Características del impreso bajo demanda',
    audiobook: 'Características del audiolibro',
  };
  const detailLinkLabel: Record<BookFormat, string> = {
    printed: 'Detalles de entrega',
    ebook: 'Detalles de lectura',
    'open-access': 'Condiciones de acceso',
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
      note: 'Lee en navegador web o apps multidispositivo.',
    },
    'open-access': {
      title: 'Acceso abierto',
      body: 'Este formato puede abrir un repositorio institucional de acceso abierto o descargar un archivo directo, segun la configuracion de la obra.',
      note: 'Acceso sin costo desde repositorio o archivo autorizado.',
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
    if (isOpenAccess) {
      return [
        { icon: Unlock, label: 'Acceso', value: 'Consulta abierta' },
        { icon: Monitor, label: 'Lectura', value: 'Web' },
        { icon: Shield, label: 'Costo', value: 'Sin pago' },
        book.pages && { icon: BookOpen, label: 'Pags. orientativas', value: `~${book.pages} pp.` },
      ].filter(Boolean) as { icon: typeof BookOpen; label: string; value: string }[];
    }

    if (isEbook) {
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

  return (
    <div className="min-h-screen flex flex-col bg-primary-light/30 pb-24 md:pb-0">
      <Header />

      {/* ═══ BREADCRUMB ═══ */}
      <nav className="hidden border-b border-border bg-card sm:block">
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
          <div className="mb-5 flex items-start gap-4 lg:hidden">
            <div className="w-24 shrink-0">
              <BookCover
                book={book}
                className="w-full shadow-md"
                imageClassName=""
                fillImage={false}
                showBackground={false}
                showOverlay={false}
              >
                {savingsPercent > 0 && (
                  <span className="absolute left-2 top-2 bg-primary px-2 py-1 font-body text-[10px] font-semibold text-primary-foreground">
                    -{savingsPercent}%
                  </span>
                )}
              </BookCover>
            </div>
            <div className="min-w-0 flex-1 pt-1">
              <span className="inline-flex bg-primary/10 px-3 py-1 font-body text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                {book.category}
              </span>
              <h1 className="mt-2 font-heading text-xl font-bold leading-tight text-foreground">
                {book.title}
              </h1>
              {book.subtitle && (
                <p className="mt-1 font-body text-xs leading-relaxed text-muted-foreground">
                  {book.subtitle}
                </p>
              )}
              <div className="mt-3 space-y-1 font-body text-[11px] text-muted-foreground">
                <p>
                  <span className="uppercase tracking-[0.12em]">Escrito por </span>
                  <span className="font-semibold text-foreground">{book.author}</span>
                </p>
                {book.sede && <p>{book.sede}</p>}
                <p>{[book.year, book.edition].filter(Boolean).join(' · ')}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_320px] gap-8 lg:gap-10">

            {/* ────── COL 1: Cover + actions ────── */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="group"
              >
                <BookCover
                  book={book}
                  className="w-full shadow-lg"
                  imageClassName="group-hover:scale-[1.02] transition-transform duration-700"
                  fillImage={false}
                  showBackground={false}
                  showOverlay={false}
                >
                  {savingsPercent > 0 && (
                    <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm font-body font-semibold px-3 py-1.5 z-10">
                      -{savingsPercent}%
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

              <div className="mt-3">
                <button
                  type="button"
                  disabled={!hasPreviewResources}
                  onClick={() => {
                    setMultimediaOpen(true);
                    document.getElementById('book-preview-resources')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="w-full border border-border bg-card px-4 py-2.5 font-body text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Vista preliminar
                </button>
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
            <div className="order-3 min-w-0 lg:order-2">
              {/* Category + Collection */}
              <div className="hidden items-center gap-2 mb-2 flex-wrap lg:flex">
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
              <h1 className="hidden font-heading text-2xl md:text-3xl font-bold text-foreground leading-tight mb-1 lg:block">
                {book.title}
              </h1>
              {book.subtitle && (
                <p className="hidden font-body text-sm md:text-base font-light text-muted-foreground leading-relaxed mb-4 max-w-2xl lg:block">
                  {book.subtitle}
                </p>
              )}

              {/* Author(s) */}
              <div className="mb-3 hidden lg:block">
                <span className="font-body text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Escrito por </span>
                <span className="font-body text-sm font-medium text-foreground">{book.author}</span>
                {book.coAuthors && book.coAuthors.length > 0 && (
                  <span className="font-body text-sm text-muted-foreground font-light"> y {book.coAuthors.join(', ')}</span>
                )}
              </div>

              {/* Meta line */}
              <div className="hidden items-center gap-3 text-muted-foreground font-body text-xs font-light mb-4 flex-wrap lg:flex">
                {book.sede && <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> {book.sede}</span>}
                {book.year && <span>· {book.year}</span>}
                {book.edition && <span>· {book.edition}</span>}
              </div>

              {/* Description */}
              {book.description && (
                <div className="mb-6">
                  <div className="relative">
                    <div
                      className={`font-body text-sm text-foreground/80 font-light leading-[1.8] whitespace-pre-line transition-[max-height] duration-300 ${
                        shouldClampDescription && !descriptionExpanded ? 'max-h-[10.8rem] overflow-hidden' : ''
                      }`}
                    >
                      {book.description}
                    </div>
                    {shouldClampDescription && !descriptionExpanded && (
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[hsl(var(--background))] via-[hsl(var(--background))/0.92] to-transparent" />
                    )}
                  </div>
                  {shouldClampDescription && (
                    <button
                      type="button"
                      onClick={() => setDescriptionExpanded(prev => !prev)}
                      className="mt-3 font-body text-xs font-semibold uppercase tracking-[0.12em] text-primary transition-colors hover:text-primary/80"
                    >
                      {descriptionExpanded ? 'Ver menos' : 'Leer más'}
                    </button>
                  )}
                </div>
              )}

              {/* ── Collapsible: Table of Contents ── */}
              {book.multimediaResources && book.multimediaResources.length > 0 && (
                <div id="book-preview-resources" className="border border-border mb-4 bg-card">
                  <button
                    onClick={() => setMultimediaOpen(!multimediaOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 font-body text-sm font-medium text-foreground hover:bg-muted/30 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Headphones className="h-4 w-4 text-muted-foreground" /> Recursos multimedia
                    </span>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${multimediaOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {multimediaOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-3 px-4 pb-4">
                          <p className="font-body text-xs text-muted-foreground font-light">
                            Material complementario disponible para esta obra.
                          </p>
                          {book.multimediaResources.map(resource => (
                            <MultimediaPreviewCard key={`${resource.type}-${resource.title}`} resource={resource} />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {book.toc && book.toc.length > 0 && (
                <div className="border border-border mb-4 bg-card">
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
              {publicationCollaborators.length > 0 && (
                <div className="border border-border mb-6 bg-card">
                  <button
                    onClick={() => setCollaboratorsOpen(!collaboratorsOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 font-body text-sm font-medium text-foreground hover:bg-muted/30 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" /> Autores y colaboradores asociados a esta publicación
                    </span>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${collaboratorsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {collaboratorsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-3 px-4 pb-4">
                          {publicationCollaborators.map((person) => {
                            const initials = person.name
                              .split(/\s+/)
                              .filter(Boolean)
                              .slice(0, 2)
                              .map(part => part[0])
                              .join('')
                              .toUpperCase();
                            const portrait = getAuthorPortrait(person.name);
                            const orcid = getAuthorOrcid(person.name);

                            return (
                              <div key={`${person.role}-${person.name}`} className="border border-border bg-background/80 p-4 shadow-sm">
                                <div className="flex flex-col gap-4 sm:flex-row">
                                  <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden bg-primary/10 font-heading text-xl font-bold text-primary">
                                    <span aria-hidden="true">{initials}</span>
                                    <img
                                      src={portrait}
                                      alt={`Imagen de perfil de ${person.name}`}
                                      className="absolute inset-0 h-full w-full object-cover"
                                      loading="lazy"
                                    />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                      <div>
                                        <h3 className="font-heading text-xl font-bold leading-tight text-foreground">
                                          {person.name}
                                        </h3>
                                        <p className="mt-1 font-body text-sm text-muted-foreground">
                                          Nombre invertido: <span className="font-semibold text-foreground">{invertName(person.name)}</span>
                                        </p>
                                        {orcid && (
                                          <a
                                            href={`https://orcid.org/${orcid}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-3 inline-flex items-center gap-2 rounded-md bg-[#009A6E] px-3 py-1.5 font-body text-xs font-bold tracking-wide text-white transition-colors hover:bg-[#007F5C]"
                                          >
                                            <Globe className="h-3.5 w-3.5" />
                                            {orcid}
                                            <ExternalLink className="h-3 w-3" />
                                          </a>
                                        )}
                                      </div>
                                      <span className="rounded-full bg-primary/10 px-4 py-1.5 font-body text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                                        {person.role}
                                      </span>
                                    </div>
                                    <div className="mt-4 border-t border-border pt-3">
                                      <p className="font-body text-[11px] font-bold uppercase tracking-[0.16em] text-foreground">
                                        Biografía
                                      </p>
                                      <p className="mt-2 font-body text-sm leading-relaxed text-foreground/75">
                                        {person.bio || 'Perfil académico asociado a esta publicación.'}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

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
                    Clasificación por área
                  </span>
                  <div className="divide-y divide-border border border-border">
                    {book.classifications.map((cl, i) => (
                      <div key={i} className="flex items-start gap-3 px-4 py-2.5">
                        <span className="font-body text-xs text-muted-foreground font-medium w-[140px] flex-shrink-0">
                          {cl.system}
                        </span>
                        <span className="min-w-0 flex-1 font-body text-xs text-foreground/80 font-light">
                          {cl.label}
                        </span>
                        <span className="font-body text-xs text-muted-foreground font-light">
                          {cl.code}
                        </span>
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
            <div id="purchase-options" className="order-2 scroll-mt-[132px] lg:order-3 lg:self-start lg:sticky lg:top-[120px] lg:scroll-mt-0">
              <div className="border border-border bg-card p-5 shadow-sm">
                {/* Format selector */}
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-semibold mb-3 block">
                  Formato
                </span>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {book.formats.map(f => {
                    const cfg = fmtCfg[f];
                    const Icon = cfg.icon;
                    const isSelected = effectiveFormat === f;
                    const detail = book.formatDetails?.find(d => d.format === f);
                    const fPrice = detail?.price;
                    const formatColor = `hsl(var(${formatCssVar[f]}))`;
                    const formatSoftColor = `hsl(var(${formatCssVar[f]}) / 0.08)`;
                    const formatSelectedColor = `hsl(var(${formatCssVar[f]}) / 0.18)`;

                    return (
                      <button
                        key={f}
                        onClick={() => { setSelectedFormat(f); setSelectedEbookSub(null); setShowNotifyForm(false); }}
                        aria-pressed={isSelected}
                        className={`relative min-h-[60px] overflow-hidden border px-2.5 py-2 text-left transition-all hover:-translate-y-0.5 hover:shadow-sm ${
                          isSelected
                            ? 'shadow-sm ring-1'
                            : 'border-border bg-card hover:border-foreground/30'
                        }`}
                        style={isSelected
                          ? { borderColor: formatColor, backgroundColor: formatSelectedColor, ['--tw-ring-color' as string]: formatColor }
                          : { backgroundColor: formatSoftColor }}
                      >
                        <span className="absolute left-0 top-0 h-1.5 w-full" style={{ backgroundColor: formatColor, opacity: isSelected ? 1 : 0.45 }} />
                        <span className="flex items-start gap-2">
                          <span className="flex min-w-0 items-start gap-1.5">
                            <Icon className="mt-0.5 h-3 w-3 flex-shrink-0" style={{ color: formatColor }} />
                            <span className="min-w-0">
                        <span className={`font-body text-[11px] font-semibold block leading-tight whitespace-normal break-words ${isSelected ? 'text-foreground' : 'text-foreground/75'}`}>
                          {cfg.label}
                        </span>
                        <span className={`font-body text-[10px] block mt-0.5 whitespace-normal ${isSelected ? 'font-medium text-muted-foreground' : 'text-muted-foreground font-light'}`}>
                          {fPrice && fPrice > 0 ? formatPrice(fPrice) : f === 'open-access' ? 'Sin costo' : '—'}
                        </span>
                            </span>
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mb-4 border-b border-border pb-4">
                  <div className="mb-3">
                    {currentPrice > 0 ? (
                      <div>
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="font-body text-2xl font-bold tracking-wide" style={{ color: currentFormatColor }}>
                            {formatPrice(currentPrice)}
                          </span>
                          <span className="font-body text-xs text-muted-foreground font-light">COP</span>
                          {visibleOriginalPrice && visibleOriginalPrice > currentPrice && (
                            <span className="font-body text-sm text-muted-foreground line-through font-light">{formatPrice(visibleOriginalPrice)}</span>
                          )}
                        </div>
                        {savingsAmount > 0 && (
                          <p className="mt-1 font-body text-[11px] font-semibold" style={{ color: currentFormatColor }}>
                            Ahorras {formatPrice(savingsAmount)}
                          </p>
                        )}
                      </div>
                    ) : isOpenAccess ? (
                      null
                    ) : null}
                  </div>

                  {(isPrinted || isIBD) && !isOutOfStock && !isComingSoon && (
                    <div className="mb-3 flex items-center gap-3">
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

                  {isOpenAccess ? (
                    <div className="space-y-2">
                      <Button size="lg" className="w-full font-body font-semibold hover:opacity-90 text-white uppercase text-sm tracking-[0.08em]" style={{ backgroundColor: currentFormatColor }}>
                        <Unlock className="h-4 w-4 mr-2" /> Abrir acceso
                      </Button>
                      <div className="border border-[hsl(var(--format-open)/0.18)] bg-[hsl(var(--format-open)/0.06)] px-3 py-2">
                        <p className="font-body text-[10px] font-bold uppercase tracking-[0.14em] text-[hsl(var(--format-open))]">
                          Qué recibes
                        </p>
                        <p className="mt-1 font-body text-xs font-medium leading-relaxed text-foreground/80">
                          Abre un repositorio institucional o un archivo autorizado, según la configuración de esta obra.
                        </p>
                      </div>
                    </div>
                  ) : isAudiobook && audioStatus === 'coming-soon' ? (
                    <Button size="lg" disabled className="w-full font-body font-semibold bg-muted text-muted-foreground uppercase text-sm tracking-[0.08em]">
                      <Clock className="h-4 w-4 mr-2" /> Próximamente
                    </Button>
                  ) : isAudiobook && audioStatus === 'free-listen' ? (
                    <Button size="lg" className="w-full font-body font-semibold hover:opacity-90 text-white uppercase text-sm tracking-[0.08em]" style={{ backgroundColor: currentFormatColor }}>
                      <Headphones className="h-4 w-4 mr-2" /> Escuchar ahora
                    </Button>
                  ) : isOutOfStock ? (
                    <div className="space-y-2">
                      <Button size="lg" disabled className="w-full font-body font-semibold bg-muted text-muted-foreground uppercase text-sm tracking-[0.08em]">
                        <AlertTriangle className="h-4 w-4 mr-2" /> Sin stock
                      </Button>
                      <Button size="lg" variant="outline" onClick={() => setShowNotifyForm(true)}
                        className="w-full font-body font-semibold hover:opacity-90 uppercase text-sm tracking-[0.08em] text-[var(--format-color)] hover:bg-[var(--format-color)] hover:text-white"
                        style={{ borderColor: currentFormatColor, ['--format-color' as string]: currentFormatColor, backgroundColor: showNotifyForm ? currentFormatSoftColor : undefined }}>
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
                    </div>
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

                {/* Format-specific details box */}
                {!isOpenAccess && (
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
                )}

                {false && !isOpenAccess && (
                <div className="mb-3 border px-3 py-2" style={{ borderColor: `hsl(var(${formatCssVar[effectiveFormat]}) / 0.22)`, backgroundColor: currentFormatSoftColor }}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-body text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: currentFormatColor }}>
                      {availabilityState.label}
                    </span>
                    {savingsAmount > 0 && (
                      <span className="font-body text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                        {savingsPercent > 0 ? `${savingsPercent}% de descuento` : 'Promoción'}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 font-body text-[11px] leading-relaxed text-muted-foreground">
                    {availabilityState.helper}
                  </p>
                </div>
                )}

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
                        Lee en navegador web o apps multidispositivo.
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
                <div className="hidden">
                  {currentPrice > 0 ? (
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-body text-2xl font-bold text-primary tracking-wide">{formatPrice(currentPrice)}</span>
                        <span className="font-body text-xs text-muted-foreground font-light">COP</span>
                        {visibleOriginalPrice && visibleOriginalPrice > currentPrice && (
                          <span className="font-body text-base text-muted-foreground line-through font-light ml-2">{formatPrice(visibleOriginalPrice)}</span>
                        )}
                      </div>
                      {savingsAmount > 0 && (
                        <p className="mt-1 font-body text-[11px] font-semibold text-primary">
                          Ahorras {formatPrice(savingsAmount)}
                        </p>
                      )}
                    </div>
                  ) : isOpenAccess ? (
                    <div className="border border-[hsl(var(--format-open)/0.18)] bg-[hsl(var(--format-open)/0.06)] px-3 py-3">
                      <p className="font-body text-[10px] font-bold uppercase tracking-[0.16em] text-[hsl(var(--format-open))]">
                        Acceso abierto
                      </p>
                      <p className="mt-1 font-body text-2xl font-bold leading-tight text-secondary">
                        Acceso sin costo
                      </p>
                      <p className="mt-1 font-body text-[11px] leading-relaxed text-muted-foreground">
                        Abre el repositorio de acceso abierto o descarga el archivo autorizado, segun la obra.
                      </p>
                    </div>
                  ) : null}
                </div>

                {/* CTA */}
                <div className="hidden">
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
                    <div className="space-y-2">
                      <Button size="lg" className="w-full font-body font-semibold hover:opacity-90 text-white uppercase text-sm tracking-[0.08em]" style={{ backgroundColor: currentFormatColor }}>
                        <Unlock className="h-4 w-4 mr-2" /> Abrir acceso
                      </Button>
                      <p className="font-body text-[11px] leading-relaxed text-muted-foreground">
                        Independiente de la disponibilidad de los demas formatos.
                      </p>
                    </div>
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
                        className="w-full font-body font-semibold hover:opacity-90 uppercase text-sm tracking-[0.08em] text-[var(--format-color)] hover:bg-[var(--format-color)] hover:text-white"
                        style={{ borderColor: currentFormatColor, ['--format-color' as string]: currentFormatColor, backgroundColor: showNotifyForm ? currentFormatSoftColor : undefined }}>
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
                {false && isOpenAccess && (
                  <div className="border border-border bg-card p-4 shadow-sm">
                    <span className="font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-semibold block mb-2">
                      Acceso incluido
                    </span>
                    <ul className="space-y-1.5">
                      <li className="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
                        <Check className="h-3 w-3 text-secondary flex-shrink-0" /> Consulta sin costo
                      </li>
                      <li className="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
                        <Check className="h-3 w-3 text-secondary flex-shrink-0" /> Repositorio o archivo directo
                      </li>
                      <li className="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
                        <Check className="h-3 w-3 text-secondary flex-shrink-0" /> Los demas formatos pueden seleccionarse aparte
                      </li>
                    </ul>
                  </div>
                )}

                {!isOpenAccess && currentPrice > 0 && (
                  <div className="border border-border bg-card p-4 shadow-sm">
                    <span className="font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-semibold block mb-2">
                      Qué recibes
                    </span>
                    <ul className="space-y-1.5">
                      {isEbook && (
                        <>
                          <li className="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
                            <Check className="h-3 w-3 text-primary flex-shrink-0" /> Acceso en navegador y app oficial
                          </li>
                          <li className="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
                            <Check className="h-3 w-3 text-primary flex-shrink-0" /> Apps para Windows, Mac, iOS y Android
                          </li>
                          <li className="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
                            <Check className="h-3 w-3 text-primary flex-shrink-0" /> {book.drmType || 'DRM propietario'} - acceso personal en plataforma
                          </li>
                          <li className="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
                            <Check className="h-3 w-3 text-primary flex-shrink-0" /> Lectura en navegador y apps multidispositivo
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
                <div className="flex gap-2 mt-4 pt-4">
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
      {false && (
      <section className="border-t border-border/70 bg-card/70 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <span className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
              Detalle editorial
            </span>
            <div className="mt-4 mb-7 inline-flex flex-wrap gap-1 border border-border bg-background/70 p-1">
            {[
              { key: 'desc' as const, label: 'Sobre la obra' },
              { key: 'author' as const, label: 'Sobre el autor' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2.5 font-body text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-muted-foreground font-light hover:bg-muted hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="max-w-4xl">
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

              {false && (
                <div className="space-y-6">
                  {/* Summary */}
                  {book.ratingAvg && (
                    <div className="flex items-center gap-6 p-5 bg-card border border-border">
                      <div className="text-center">
                        <span className="font-heading text-4xl font-bold text-foreground">{book.ratingAvg.toFixed(1)}</span>
                        <div className="mt-1" />
                        <p className="font-body text-xs text-muted-foreground mt-1 font-light">{book.ratingCount}</p>
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

      )}

      <section className="border-t border-border py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="font-body text-[11px] tracking-[0.2em] uppercase text-primary font-semibold mb-1">Misma área</p>
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

      <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-4 py-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-300 md:hidden ${showMobileCta ? 'translate-y-0' : 'pointer-events-none translate-y-full'}`}>
        <div className="mx-auto flex max-w-md items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="font-body text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
              Opciones de compra:
            </p>
            {lowestPurchasePrice > 0 ? (
              <p className="font-body text-base font-bold leading-tight text-foreground">
                Desde {formatPrice(lowestPurchasePrice)}
              </p>
            ) : (
              <p className="font-body text-base font-bold leading-tight text-foreground">
                Acceso abierto
              </p>
            )}
          </div>
          <Button
            size="sm"
            onClick={() => {
              document.getElementById('purchase-options')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="shrink-0 bg-foreground px-4 font-body text-xs font-bold uppercase tracking-[0.08em] text-background hover:bg-foreground/90"
          >
            Ver opciones
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
