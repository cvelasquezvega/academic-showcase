import { useState, useRef, useEffect } from 'react';
import { Search, User, ShoppingCart, Menu, X, Heart, BookMarked, ChevronDown, ChevronRight, Ticket, Smartphone, Unlock, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchOverlay from '@/components/SearchOverlay';
import RedeemCodeModal from '@/components/RedeemCodeModal';
import AuthModal, { type AuthView } from '@/components/AuthModal';
import editorialLogo from '@/assets/logo-editorial_unal.png';
import unalLogo from '@/assets/logo-unal.svg';

/* ── Catálogo: categorías con subcategorías ── */
const catalogoSections: { label: string; items: string[] }[] = [
  {
    label: 'Áreas',
    items: [
      'Artes', 'Ciencias', 'Ciencias agrarias y veterinaria', 'Ciencias de la salud',
      'Ciencias económicas', 'Ciencias Humanas y Sociales', 'Derecho y ciencias políticas',
      'Ingeniería', 'Literatura',
    ],
  },
  {
    label: 'Sedes',
    items: [
      'Sede Bogotá', 'Sede Caribe', 'Sede Medellín', 'Sede Nivel nacional',
      'Sede Palmira', 'Sede Amazonía', 'Sede La Paz', 'Sede Manizales',
    ],
  },
  {
    label: 'Colecciones',
    items: [
      'Biblioteca abierta', 'Ciencias naturales', 'Clásicos del pensamiento',
      'Colección CES', 'Estadísticas e indicadores', 'Estudios afrocolombianos',
      'Geografía y ordenamiento territorial', 'Historia y memoria',
      'Lenguas aborígenes', 'Medio ambiente', 'Obra selecta', 'Salud pública',
      'Semillas', 'Textos universitarios', 'Vigilada MinEducación',
    ],
  },
  {
    label: 'Impreso',
    items: ['Todos los impresos', 'Novedades impresas', 'Más vendidos impresos', 'Disponibles para envío'],
  },
  {
    label: 'E-books',
    items: ['Todos los E-books', 'Compra inmediata', 'PDF', 'EPUB', 'Acceso abierto', 'Descargas gratuitas'],
  },
  {
    label: 'Impreso bajo demanda',
    items: ['Catálogo IBD', 'Novedades IBD', 'Solicitar impresión bajo demanda', 'Cómo funciona IBD', 'Tiempos de producción'],
  },
];

const noticiasSections: { label: string; items: string[] }[] = [
  {
    label: 'Categorías',
    items: ['Ferias del libro', 'Boletines', 'Reseñas', 'Presentación de libros', 'Sede Palmira', 'Libros recomendados', 'Sede Medellín'],
  },
  {
    label: 'Temas',
    items: ['Acceso abierto', 'Códice Abierto', 'Botánica', 'Literatura infantil', 'Literatura no ficción', 'Fac. Ciencias Humanas', 'Fac. Ciencias Agrarias', 'Editorial UNAL'],
  },
];

const formatNavIcons: Record<string, { icon: typeof Search; color: string }> = {
  Impreso: { icon: BookMarked, color: 'text-format-print' },
  'Todos los impresos': { icon: BookMarked, color: 'text-format-print' },
  'Novedades impresas': { icon: BookMarked, color: 'text-format-print' },
  'Más vendidos impresos': { icon: BookMarked, color: 'text-format-print' },
  'Disponibles para envío': { icon: BookMarked, color: 'text-format-print' },
  'Todos los E-books': { icon: Smartphone, color: 'text-format-ebook' },
  'Compra inmediata': { icon: Smartphone, color: 'text-format-ebook' },
  PDF: { icon: Smartphone, color: 'text-format-ebook' },
  EPUB: { icon: Smartphone, color: 'text-format-ebook' },
  'Acceso abierto': { icon: Unlock, color: 'text-format-open' },
  'Descargas gratuitas': { icon: Unlock, color: 'text-format-open' },
  'Catálogo IBD': { icon: Package, color: 'text-format-ibd' },
  'Novedades IBD': { icon: Package, color: 'text-format-ibd' },
  'Solicitar impresión bajo demanda': { icon: Package, color: 'text-format-ibd' },
  'Cómo funciona IBD': { icon: Package, color: 'text-format-ibd' },
  'Tiempos de producción': { icon: Package, color: 'text-format-ibd' },
};

/* ── arrays for mobile ── */
const areas = catalogoSections[0].items;
const sedes = catalogoSections[1].items;
const colecciones = catalogoSections[2].items;
const noticiasCategorias = noticiasSections[0].items;
const noticiasTemas = noticiasSections[1].items;

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hoveredSection, setHoveredSection] = useState<number>(0);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authView, setAuthView] = useState<AuthView>('login');
  const openAuth = (v: AuthView) => { setAuthView(v); setAuthOpen(true); };
  const menuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const openMenu = (menu: string) => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
    setActiveMenu(menu);
    setHoveredSection(0);
  };

  const closeMenu = () => {
    menuTimeout.current = setTimeout(() => setActiveMenu(null), 200);
  };

  const keepMenu = () => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLinkClass = (isActive: boolean) =>
    `font-nav text-[13px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap transition-colors relative px-1 py-2 ${
      isActive
        ? 'text-primary'
        : 'text-foreground hover:text-primary'
    }`;

  const navLinkUnderline = (isActive: boolean) =>
    `absolute -bottom-[1px] left-0 right-0 h-[2px] bg-primary transition-transform origin-left ${
      isActive ? 'scale-x-100' : 'scale-x-0'
    }`;

  return (
    <>
      <header ref={headerRef} className="sticky top-0 z-50">
        {/* ── Top institutional strip ── */}
        <div className="bg-header-dark">
          <div className="container mx-auto px-4 flex items-center justify-end h-9">
            <div className="flex items-center gap-3">
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setRedeemOpen(true)}
                className="font-nav text-[11px] text-white/70 hover:text-white font-light tracking-wide transition-colors flex items-center gap-1"
              >
                <Ticket className="h-3.5 w-3.5" /> Redimir código
              </button>
              <span className="text-white/20 hidden sm:inline">|</span>
              <button onClick={() => openAuth('login')} className="hidden bg-secondary px-3 py-1 font-nav text-[11px] font-medium tracking-wide text-secondary-foreground transition-opacity hover:opacity-90 sm:inline">
                Iniciar sesión
              </button>
              <button onClick={() => openAuth('register')} className="font-nav text-[11px] bg-primary text-primary-foreground px-3 py-1 font-medium tracking-wide hover:opacity-90 transition-opacity hidden sm:inline">
                Crear cuenta
              </button>
            </div>
          </div>
        </div>

        {/* ── Main navigation bar ── */}
        <div className="bg-white border-b border-border/60">
          <div className="container mx-auto px-4 flex items-center gap-3 lg:gap-5 h-[74px] lg:h-[86px] relative">
            {/* Logo */}
            <div className="flex min-w-0 items-center gap-2 sm:gap-4 flex-shrink-0">
              <a href="https://unal.edu.co/" target="_blank" rel="noopener noreferrer" aria-label="Ir al portal de la Universidad Nacional de Colombia">
                <img src={unalLogo} alt="Universidad Nacional de Colombia" className="h-11 w-auto object-contain sm:h-[58px] lg:h-[64px]" />
              </a>
              <span className="hidden h-9 w-px bg-border lg:block" aria-hidden="true" />
              <a href="/" aria-label="Ir al inicio de Editorial UNAL">
                <img src={editorialLogo} alt="Editorial UNAL" className="h-7 w-auto max-w-[118px] object-contain sm:h-9 sm:max-w-none lg:h-10" />
              </a>
            </div>

            {/* Center nav links */}
            <nav className="hidden lg:flex flex-1 items-center justify-center gap-6">
              <div
                className="relative"
                onMouseEnter={() => openMenu('catalogo')}
                onMouseLeave={closeMenu}
              >
                <button className={navLinkClass(activeMenu === 'catalogo')}>
                  Catálogo
                  <ChevronDown className="inline h-3 w-3 ml-0.5 opacity-50" />
                  <span className={navLinkUnderline(activeMenu === 'catalogo')} />
                </button>
              </div>

              <a href="#" className={navLinkClass(false)}>
                Librerías UNAL
                <span className={navLinkUnderline(false)} />
              </a>

              <div
                className="relative"
                onMouseEnter={() => openMenu('noticias')}
                onMouseLeave={closeMenu}
              >
                <button className={navLinkClass(activeMenu === 'noticias')}>
                  Noticias
                  <ChevronDown className="inline h-3 w-3 ml-0.5 opacity-50" />
                  <span className={navLinkUnderline(activeMenu === 'noticias')} />
                </button>
              </div>

              <a href="#" className={navLinkClass(false)}>
                Nosotros
                <span className={navLinkUnderline(false)} />
              </a>
            </nav>

            {/* Right section: search + icons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Inline search (desktop) */}
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden xl:flex items-center gap-2 bg-muted/60 hover:bg-muted px-4 py-2 transition-colors group w-[180px]"
              >
                <Search className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="font-nav text-sm text-muted-foreground font-light">Buscar...</span>
              </button>

              {/* Icon buttons */}
              <div className="flex items-center gap-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground/60 hover:text-primary hover:bg-transparent lg:hidden"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => openAuth('login')} className="text-foreground/60 hover:text-primary hover:bg-transparent hidden sm:flex">
                  <User className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-foreground/60 hover:text-primary hover:bg-transparent hidden sm:flex">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-foreground/60 hover:text-primary hover:bg-transparent relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full">
                    2
                  </span>
                </Button>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:text-primary lg:hidden"
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
                >
                  {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== MEGA MENUS (desktop) ==================== */}
        {activeMenu === 'catalogo' && (
          <div
            className="hidden lg:block absolute left-0 right-0 bg-white border-b border-border/40 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1)] z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            onMouseEnter={keepMenu}
            onMouseLeave={closeMenu}
          >
            <div className="container mx-auto px-0">
              <div className="flex min-h-[340px]">
                {/* Left sidebar */}
                <div className="w-[260px] bg-[hsl(var(--background))] border-r border-border/40 flex-shrink-0 py-2">
                  {catalogoSections.map((section, idx) => (
                    <button
                      key={section.label}
                      onMouseEnter={() => setHoveredSection(idx)}
                      className={`w-full flex items-center justify-between px-6 py-3.5 font-nav text-sm text-left transition-all ${
                        hoveredSection === idx
                          ? 'text-primary font-medium bg-white'
                          : 'text-foreground/80 font-light hover:text-foreground hover:bg-white/60'
                      }`}
                    >
                      {section.label}
                      <ChevronRight className={`h-4 w-4 transition-all ${hoveredSection === idx ? 'text-primary translate-x-0.5' : 'text-muted-foreground/40'}`} />
                    </button>
                  ))}
                </div>

                {/* Right panel */}
                <div className="flex-1 px-10 py-8">
                  <div className="grid grid-cols-3 gap-x-10 gap-y-0">
                    {catalogoSections[hoveredSection]?.items.map((item) => {
                      const FormatIcon = formatNavIcons[item]?.icon;
                      const formatIconColor = formatNavIcons[item]?.color;

                      return (
                        <a
                          key={item}
                          href="#"
                          className="font-nav text-sm text-foreground/70 font-light hover:text-primary transition-colors py-3 border-b border-dashed border-border/40 flex items-center gap-2"
                        >
                          {FormatIcon && <FormatIcon className={`h-4 w-4 ${formatIconColor}`} />}
                          {item}
                        </a>
                      );
                    })}
                  </div>
                  {catalogoSections[hoveredSection]?.label === 'Colecciones' && (
                    <a href="#" className="inline-flex items-center gap-1 mt-6 font-nav text-xs font-medium text-primary hover:underline tracking-wide">
                      Ver todas las colecciones <ChevronRight className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeMenu === 'noticias' && (
          <div
            className="hidden lg:block absolute left-0 right-0 bg-white border-b border-border/40 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1)] z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            onMouseEnter={keepMenu}
            onMouseLeave={closeMenu}
          >
            <div className="container mx-auto px-0">
              <div className="flex min-h-[240px]">
                {/* Left sidebar */}
                <div className="w-[260px] bg-[hsl(var(--background))] border-r border-border/40 flex-shrink-0 py-2">
                  {noticiasSections.map((section, idx) => (
                    <button
                      key={section.label}
                      onMouseEnter={() => setHoveredSection(idx)}
                      className={`w-full flex items-center justify-between px-6 py-3.5 font-nav text-sm text-left transition-all ${
                        hoveredSection === idx
                          ? 'text-primary font-medium bg-white'
                          : 'text-foreground/80 font-light hover:text-foreground hover:bg-white/60'
                      }`}
                    >
                      {section.label}
                      <ChevronRight className={`h-4 w-4 transition-all ${hoveredSection === idx ? 'text-primary translate-x-0.5' : 'text-muted-foreground/40'}`} />
                    </button>
                  ))}
                </div>

                {/* Right panel */}
                <div className="flex-1 px-10 py-8">
                  <div className="grid grid-cols-3 gap-x-10 gap-y-0">
                    {noticiasSections[hoveredSection]?.items.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="font-nav text-sm text-foreground/70 font-light hover:text-primary transition-colors py-3 border-b border-dashed border-border/40"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== MOBILE MENU ==================== */}
        {mobileOpen && (
          <nav className="fixed inset-x-0 bottom-0 top-[110px] z-40 overflow-y-auto overscroll-contain border-b border-border bg-white px-4 py-5 pb-10 shadow-xl lg:hidden">
            {/* Quick actions */}
            <div className="mb-5 grid grid-cols-4 gap-1.5">
              <button
                onClick={() => { setMobileOpen(false); setSearchOpen(true); }}
                className="flex min-h-10 items-center justify-center gap-1.5 bg-muted px-2 py-2 font-nav text-[11px] font-medium leading-tight text-foreground hover:bg-muted/80"
              >
                <Search className="h-3.5 w-3.5 shrink-0" /> Buscar
              </button>
              <button
                onClick={() => { setMobileOpen(false); setRedeemOpen(true); }}
                className="flex min-h-10 items-center justify-center gap-1.5 bg-muted px-2 py-2 font-nav text-[11px] font-medium leading-tight text-foreground hover:bg-muted/80"
              >
                <Ticket className="h-3.5 w-3.5 shrink-0" /> Redimir
              </button>
              <button onClick={() => { setMobileOpen(false); openAuth('login'); }} className="flex min-h-10 items-center justify-center bg-secondary px-2 py-2 text-center font-nav text-[11px] font-medium leading-tight text-secondary-foreground hover:bg-secondary/90">
                Ingresar
              </button>
              <button onClick={() => { setMobileOpen(false); openAuth('register'); }} className="flex min-h-10 items-center justify-center bg-primary px-2 py-2 text-center font-nav text-[11px] font-medium leading-tight text-primary-foreground hover:opacity-90">
                Registro
              </button>
            </div>

            {/* CATÁLOGO accordion */}
            <div>
              <button
                onClick={() => setMobileExpanded(mobileExpanded === 'catalogo' ? null : 'catalogo')}
                className="w-full flex items-center justify-between font-nav text-sm font-medium text-foreground py-3 border-b border-border/60"
              >
                Catálogo
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${mobileExpanded === 'catalogo' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded === 'catalogo' && (
                <div className="py-3 space-y-4">
                  {catalogoSections.map((section) => (
                    <div key={section.label}>
                      <span className="font-nav text-[11px] font-semibold tracking-widest uppercase text-primary flex items-center gap-1.5 mb-2">
                        {section.label}
                      </span>
                      {section.items.map((item) => {
                        const FormatIcon = formatNavIcons[item]?.icon;
                        const formatIconColor = formatNavIcons[item]?.color;

                        return (
                          <a key={item} href="#" className="flex min-w-0 items-start gap-2 py-1.5 pl-4 font-nav text-sm font-light leading-snug text-foreground/60 hover:text-primary">
                            {FormatIcon && <FormatIcon className={`mt-0.5 h-4 w-4 shrink-0 ${formatIconColor}`} />}
                            <span className="min-w-0 break-words">{item}</span>
                          </a>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <a href="#" className="block font-nav text-sm font-medium text-foreground py-3 border-b border-border/60">
              Librerías UNAL
            </a>

            {/* NOTICIAS accordion */}
            <div>
              <button
                onClick={() => setMobileExpanded(mobileExpanded === 'noticias' ? null : 'noticias')}
                className="w-full flex items-center justify-between font-nav text-sm font-medium text-foreground py-3 border-b border-border/60"
              >
                Noticias
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${mobileExpanded === 'noticias' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded === 'noticias' && (
                <div className="py-3 space-y-4">
                  {noticiasSections.map((section) => (
                    <div key={section.label}>
                      <span className="font-nav text-[11px] font-semibold tracking-widest uppercase text-primary flex items-center gap-1.5 mb-2">
                        {section.label}
                      </span>
                      {section.items.map((item) => (
                        <a key={item} href="#" className="block break-words py-1.5 pl-4 font-nav text-sm font-light leading-snug text-foreground/60 hover:text-primary">{item}</a>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <a href="#" className="block font-nav text-sm font-medium text-foreground py-3 border-b border-border/60">
              Nosotros
            </a>

            <div className="hidden pt-4 space-y-2">
              <a href="#" className="block font-nav text-sm font-light text-foreground/70 py-2">Iniciar sesión</a>
              <Button className="w-full font-nav font-medium text-sm tracking-wide">
                Crear cuenta gratis
              </Button>
            </div>
          </nav>
        )}
      </header>

      {/* Overlays rendered outside header */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <RedeemCodeModal open={redeemOpen} onClose={() => setRedeemOpen(false)} />
      <AuthModal open={authOpen} view={authView} onClose={() => setAuthOpen(false)} onChangeView={setAuthView} />
    </>
  );
};

export default Header;
