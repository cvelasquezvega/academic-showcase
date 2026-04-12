import { useState, useRef, useEffect } from 'react';
import { Search, User, ShoppingCart, Menu, X, Heart, BookMarked, ChevronDown, ChevronRight, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchOverlay from '@/components/SearchOverlay';
import RedeemCodeModal from '@/components/RedeemCodeModal';

const areas = [
  'Artes', 'Ciencias', 'Ciencias agrarias y veterinaria', 'Ciencias de la salud',
  'Ciencias económicas', 'Ciencias Humanas y Sociales', 'Derecho y ciencias políticas',
  'Ingeniería', 'Literatura',
];

const sedes = [
  'Sede Bogotá', 'Sede Caribe', 'Sede Medellín', 'Sede Nivel nacional',
  'Sede Palmira', 'Sede Amazonía', 'Sede La Paz', 'Sede Manizales',
];

const colecciones = [
  'Biblioteca abierta', 'Ciencias naturales', 'Clásicos del pensamiento',
  'Colección CES', 'Estadísticas e indicadores', 'Estudios afrocolombianos',
  'Geografía y ordenamiento territorial', 'Historia y memoria',
  'Lenguas aborígenes', 'Medio ambiente', 'Obra selecta', 'Salud pública',
  'Semillas', 'Textos universitarios', 'Vigilada MinEducación',
];

const noticiasCategorias = [
  'Ferias del libro', 'Boletines', 'Reseñas', 'Presentación de libros',
  'Sede Palmira', 'Libros recomendados', 'Sede Medellín',
];

const noticiasTemas = [
  'Acceso abierto', 'Códice Abierto', 'Botánica', 'Literatura infantil',
  'Literatura no ficción', 'Fac. Ciencias Humanas', 'Fac. Ciencias Agrarias',
  'Editorial UNAL',
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [redeemOpen, setRedeemOpen] = useState(false);
  const menuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const openMenu = (menu: string) => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
    setActiveMenu(menu);
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

  return (
    <>
      <header ref={headerRef} className="sticky top-0 z-50">
        {/* Top accent line */}
        <div className="h-1 bg-primary" />

        {/* Main header bar */}
        <div className="bg-header-dark">
          <div className="container mx-auto px-4 flex items-center justify-between h-[72px]">
            {/* Left: UNAL shield logo */}
            <a href="#" className="flex items-center gap-3 flex-shrink-0">
              <div className="w-[56px] h-[56px] bg-[hsl(220,20%,28%)] flex items-center justify-center p-1.5 border border-white/10">
                <div className="text-center leading-none">
                  <span className="text-white font-heading text-[9px] block font-bold tracking-tight">UNIVERSIDAD</span>
                  <span className="text-white font-heading text-[9px] block font-bold tracking-tight">NACIONAL</span>
                  <span className="text-white/70 font-heading text-[7px] block tracking-tight">DE COLOMBIA</span>
                </div>
              </div>
            </a>

            {/* Center: Editorial UNAL title + nav */}
            <div className="hidden lg:flex items-center gap-10">
              <a href="#" className="flex items-baseline gap-1.5">
                <span className="font-heading text-xl font-bold text-white tracking-tight italic">
                  Editorial
                </span>
                <span className="font-body text-base font-bold bg-primary text-primary-foreground px-2 py-0.5 tracking-wide">
                  UNAL
                </span>
              </a>
              <nav className="flex items-center gap-1">
                <div
                  className="relative"
                  onMouseEnter={() => openMenu('catalogo')}
                  onMouseLeave={closeMenu}
                >
                  <button className="font-body text-[13px] font-semibold text-white/80 hover:text-primary transition-colors tracking-wider px-3 py-5 flex items-center gap-1">
                    CATÁLOGO <ChevronDown className="h-3 w-3" />
                  </button>
                </div>

                <a href="#" className="font-body text-[13px] font-semibold text-white/80 hover:text-primary transition-colors tracking-wider px-3 py-5">
                  LIBRERÍAS UNAL
                </a>

                <div
                  className="relative"
                  onMouseEnter={() => openMenu('noticias')}
                  onMouseLeave={closeMenu}
                >
                  <button className="font-body text-[13px] font-semibold text-white/80 hover:text-primary transition-colors tracking-wider px-3 py-5 flex items-center gap-1">
                    NOTICIAS <ChevronDown className="h-3 w-3" />
                  </button>
                </div>

                <a href="#" className="font-body text-[13px] font-semibold text-white/80 hover:text-primary transition-colors tracking-wider px-3 py-5">
                  NOSOTROS
                </a>
              </nav>
            </div>

            {/* Right: icons */}
            <div className="flex items-center gap-0.5">
              {/* Redeem code */}
              <Button
                variant="ghost"
                size="icon"
                className="text-white/80 hover:text-primary hover:bg-white/10 relative group/redeem"
                onClick={() => setRedeemOpen(true)}
                title="Redimir código de acceso"
              >
                <Ticket className="h-5 w-5" />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-body text-[10px] text-white/70 whitespace-nowrap opacity-0 group-hover/redeem:opacity-100 transition-opacity pointer-events-none">
                  Redimir código
                </span>
              </Button>

              <Button variant="ghost" size="icon" className="text-white/80 hover:text-primary hover:bg-white/10">
                <BookMarked className="h-5 w-5" />
              </Button>

              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                className="text-white/80 hover:text-primary hover:bg-white/10"
                onClick={() => setSearchOpen(true)}
                title="Buscar"
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="icon" className="text-white/80 hover:text-primary hover:bg-white/10">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-primary hover:bg-white/10 hidden sm:flex">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-primary hover:bg-white/10 relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  2
                </span>
              </Button>
              <Button variant="ghost" size="icon" className="lg:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* ==================== MEGA MENUS (desktop) ==================== */}
        {activeMenu === 'catalogo' && (
          <div
            className="hidden lg:block absolute left-0 right-0 bg-white border-b border-border shadow-lg z-50 animate-in fade-in slide-in-from-top-1 duration-200"
            onMouseEnter={keepMenu}
            onMouseLeave={closeMenu}
          >
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-3 gap-10">
                <div>
                  <h3 className="font-body text-xs font-bold tracking-widest uppercase text-secondary mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full" /> Áreas
                  </h3>
                  <ul className="space-y-2">
                    {areas.map((area) => (
                      <li key={area}><a href="#" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">{area}</a></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-body text-xs font-bold tracking-widest uppercase text-secondary mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full" /> Sedes
                  </h3>
                  <ul className="space-y-2">
                    {sedes.map((sede) => (
                      <li key={sede}><a href="#" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">{sede}</a></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-body text-xs font-bold tracking-widest uppercase text-secondary mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full" /> Colecciones
                  </h3>
                  <ul className="space-y-2">
                    {colecciones.map((col) => (
                      <li key={col}><a href="#" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">{col}</a></li>
                    ))}
                  </ul>
                  <a href="#" className="inline-flex items-center gap-1 mt-4 font-body text-xs font-bold text-primary hover:underline uppercase tracking-wider">
                    Ver todas las colecciones <ChevronRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                <p className="font-body text-sm text-muted-foreground">
                  Explora más de <strong className="text-foreground">2.300 publicaciones</strong> académicas en todos los formatos.
                </p>
                <Button className="font-body font-semibold text-xs uppercase tracking-wider">
                  Ver catálogo completo <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeMenu === 'noticias' && (
          <div
            className="hidden lg:block absolute left-0 right-0 bg-white border-b border-border shadow-lg z-50 animate-in fade-in slide-in-from-top-1 duration-200"
            onMouseEnter={keepMenu}
            onMouseLeave={closeMenu}
          >
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <h3 className="font-body text-xs font-bold tracking-widest uppercase text-secondary mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full" /> Categorías
                  </h3>
                  <ul className="space-y-2">
                    {noticiasCategorias.map((cat) => (
                      <li key={cat}><a href="#" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">{cat}</a></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-body text-xs font-bold tracking-widest uppercase text-secondary mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full" /> Temas
                  </h3>
                  <ul className="space-y-2">
                    {noticiasTemas.map((tema) => (
                      <li key={tema}><a href="#" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">{tema}</a></li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                <p className="font-body text-sm text-muted-foreground">
                  Mantente al día con las novedades de la Editorial UNAL.
                </p>
                <Button className="font-body font-semibold text-xs uppercase tracking-wider">
                  Ver todas las noticias <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== MOBILE MENU ==================== */}
        {mobileOpen && (
          <nav className="lg:hidden bg-header-dark border-t border-white/10 px-4 py-6 space-y-1 max-h-[80vh] overflow-y-auto">
            <a href="#" className="block font-heading text-lg text-white italic mb-4">
              Editorial <span className="text-primary font-body not-italic font-bold bg-primary/20 px-1.5">UNAL</span>
            </a>

            {/* Quick actions */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => { setMobileOpen(false); setSearchOpen(true); }}
                className="flex-1 flex items-center justify-center gap-2 font-body text-xs font-semibold text-white/90 bg-white/10 py-2.5 hover:bg-white/20 transition-colors"
              >
                <Search className="h-4 w-4" /> Buscar
              </button>
              <button
                onClick={() => { setMobileOpen(false); setRedeemOpen(true); }}
                className="flex-1 flex items-center justify-center gap-2 font-body text-xs font-semibold text-white/90 bg-white/10 py-2.5 hover:bg-white/20 transition-colors"
              >
                <Ticket className="h-4 w-4" /> Redimir código
              </button>
            </div>

            {/* CATÁLOGO accordion */}
            <div>
              <button
                onClick={() => setMobileExpanded(mobileExpanded === 'catalogo' ? null : 'catalogo')}
                className="w-full flex items-center justify-between font-body text-sm font-semibold text-white/90 hover:text-primary tracking-wider py-3 border-b border-white/10"
              >
                CATÁLOGO
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === 'catalogo' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded === 'catalogo' && (
                <div className="py-3 space-y-4">
                  <div>
                    <span className="font-body text-[11px] font-bold tracking-widest uppercase text-secondary-light flex items-center gap-1.5 mb-2">
                      <span className="w-1.5 h-1.5 bg-secondary-light rounded-full" /> Áreas
                    </span>
                    {areas.map((a) => (
                      <a key={a} href="#" className="block font-body text-sm text-white/60 hover:text-primary py-1 pl-4">{a}</a>
                    ))}
                  </div>
                  <div>
                    <span className="font-body text-[11px] font-bold tracking-widest uppercase text-secondary-light flex items-center gap-1.5 mb-2">
                      <span className="w-1.5 h-1.5 bg-secondary-light rounded-full" /> Sedes
                    </span>
                    {sedes.map((s) => (
                      <a key={s} href="#" className="block font-body text-sm text-white/60 hover:text-primary py-1 pl-4">{s}</a>
                    ))}
                  </div>
                  <div>
                    <span className="font-body text-[11px] font-bold tracking-widest uppercase text-secondary-light flex items-center gap-1.5 mb-2">
                      <span className="w-1.5 h-1.5 bg-secondary-light rounded-full" /> Colecciones
                    </span>
                    {colecciones.slice(0, 8).map((c) => (
                      <a key={c} href="#" className="block font-body text-sm text-white/60 hover:text-primary py-1 pl-4">{c}</a>
                    ))}
                    <a href="#" className="block font-body text-xs font-bold text-primary pl-4 mt-2">Ver todas →</a>
                  </div>
                </div>
              )}
            </div>

            <a href="#" className="block font-body text-sm font-semibold text-white/90 hover:text-primary tracking-wider py-3 border-b border-white/10">
              LIBRERÍAS UNAL
            </a>

            {/* NOTICIAS accordion */}
            <div>
              <button
                onClick={() => setMobileExpanded(mobileExpanded === 'noticias' ? null : 'noticias')}
                className="w-full flex items-center justify-between font-body text-sm font-semibold text-white/90 hover:text-primary tracking-wider py-3 border-b border-white/10"
              >
                NOTICIAS
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === 'noticias' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded === 'noticias' && (
                <div className="py-3 space-y-4">
                  <div>
                    <span className="font-body text-[11px] font-bold tracking-widest uppercase text-secondary-light flex items-center gap-1.5 mb-2">
                      <span className="w-1.5 h-1.5 bg-secondary-light rounded-full" /> Categorías
                    </span>
                    {noticiasCategorias.map((c) => (
                      <a key={c} href="#" className="block font-body text-sm text-white/60 hover:text-primary py-1 pl-4">{c}</a>
                    ))}
                  </div>
                  <div>
                    <span className="font-body text-[11px] font-bold tracking-widest uppercase text-secondary-light flex items-center gap-1.5 mb-2">
                      <span className="w-1.5 h-1.5 bg-secondary-light rounded-full" /> Temas
                    </span>
                    {noticiasTemas.map((t) => (
                      <a key={t} href="#" className="block font-body text-sm text-white/60 hover:text-primary py-1 pl-4">{t}</a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a href="#" className="block font-body text-sm font-semibold text-white/90 hover:text-primary tracking-wider py-3 border-b border-white/10">
              NOSOTROS
            </a>

            <div className="pt-4">
              <Button className="w-full font-body font-semibold uppercase text-sm tracking-wider">
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
