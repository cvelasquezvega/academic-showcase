import { useState, useRef, useEffect } from 'react';
import { Search, User, ShoppingCart, Menu, X, Heart, BookMarked, ChevronDown, ChevronRight, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchOverlay from '@/components/SearchOverlay';
import RedeemCodeModal from '@/components/RedeemCodeModal';

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
    label: 'E-books',
    items: ['PDF', 'EPUB', 'Acceso abierto'],
  },
  {
    label: 'Impreso bajo demanda',
    items: ['Catálogo IBD', 'Novedades IBD'],
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
    `font-nav text-sm font-medium transition-colors relative px-1 py-1 ${
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
          <div className="container mx-auto px-4 flex items-center justify-between h-10">
            <div className="flex items-center gap-3">
              {/* UNAL shield placeholder */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-white/10 flex items-center justify-center">
                  <span className="font-nav text-[7px] text-white font-bold leading-none text-center">UN</span>
                </div>
                <span className="font-nav text-[11px] text-white/80 font-light tracking-wide hidden sm:inline">
                  Universidad Nacional de Colombia
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setRedeemOpen(true)}
                className="font-nav text-[11px] text-white/70 hover:text-white font-light tracking-wide transition-colors flex items-center gap-1"
              >
                <Ticket className="h-3.5 w-3.5" /> Redimir código
              </button>
              <span className="text-white/20 hidden sm:inline">|</span>
              <a href="#" className="font-nav text-[11px] text-white/70 hover:text-white font-light tracking-wide transition-colors hidden sm:inline">
                Iniciar sesión
              </a>
              <a href="#" className="font-nav text-[11px] bg-primary text-primary-foreground px-3 py-1 font-medium tracking-wide hover:opacity-90 transition-opacity hidden sm:inline">
                Crear cuenta
              </a>
            </div>
          </div>
        </div>

        {/* ── Main navigation bar ── */}
        <div className="bg-white border-b border-border/60">
          <div className="container mx-auto px-4 flex items-center justify-between h-[71px]">
            {/* Logo */}
            <a href="#" className="flex items-baseline gap-1.5 flex-shrink-0">
              <span className="font-heading text-xl font-bold text-foreground tracking-tight italic">
                Editorial
              </span>
              <span className="font-nav text-sm font-extrabold bg-primary text-primary-foreground px-2 py-0.5 tracking-wider">
                UNAL
              </span>
            </a>

            {/* Center nav links */}
            <nav className="hidden lg:flex items-center gap-6">
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
            <div className="flex items-center gap-2">
              {/* Inline search (desktop) */}
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden lg:flex items-center gap-2 bg-muted/60 hover:bg-muted px-4 py-2 transition-colors group w-[200px]"
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
                <Button variant="ghost" size="icon" className="text-foreground/60 hover:text-primary hover:bg-transparent hidden sm:flex">
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
                <Button variant="ghost" size="icon" className="lg:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
                  {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
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
                    {catalogoSections[hoveredSection]?.items.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="font-nav text-sm text-foreground/70 font-light hover:text-primary transition-colors py-3 border-b border-dashed border-border/40"
                      >
                        {item}
                      </a>
                    ))}
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
          <nav className="lg:hidden bg-white border-b border-border px-4 py-6 space-y-1 max-h-[80vh] overflow-y-auto">
            {/* Quick actions */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => { setMobileOpen(false); setSearchOpen(true); }}
                className="flex-1 flex items-center justify-center gap-2 font-nav text-xs font-medium text-foreground bg-muted py-2.5 hover:bg-muted/80 transition-colors"
              >
                <Search className="h-4 w-4" /> Buscar
              </button>
              <button
                onClick={() => { setMobileOpen(false); setRedeemOpen(true); }}
                className="flex-1 flex items-center justify-center gap-2 font-nav text-xs font-medium text-foreground bg-muted py-2.5 hover:bg-muted/80 transition-colors"
              >
                <Ticket className="h-4 w-4" /> Redimir código
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
                      {section.items.map((item) => (
                        <a key={item} href="#" className="block font-nav text-sm text-foreground/60 font-light hover:text-primary py-1.5 pl-4">{item}</a>
                      ))}
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
                        <a key={item} href="#" className="block font-nav text-sm text-foreground/60 font-light hover:text-primary py-1.5 pl-4">{item}</a>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <a href="#" className="block font-nav text-sm font-medium text-foreground py-3 border-b border-border/60">
              Nosotros
            </a>

            <div className="pt-4 space-y-2">
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
    </>
  );
};

export default Header;
