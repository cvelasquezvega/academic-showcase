import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  BookMarked,
  ChevronDown,
  ChevronRight,
  Heart,
  MapPin,
  Menu,
  Package,
  Search,
  ShoppingCart,
  Smartphone,
  Ticket,
  Unlock,
  User,
  X,
} from 'lucide-react';
import SearchOverlay from '@/components/SearchOverlay';
import RedeemCodeModal from '@/components/RedeemCodeModal';

const templateCssFiles = [
  '/prototipo-producto/assets/Header-UNAL/css/frontend.css',
  '/prototipo-producto/assets/Header-UNAL/css/accesibilidad.css',
  '/prototipo-producto/assets/Header-UNAL/css/bootstrap.min.css',
  '/prototipo-producto/assets/Header-UNAL/css/bootstrap-theme.min.css',
  '/prototipo-producto/assets/Header-UNAL/css/reset.css',
  '/prototipo-producto/assets/Header-UNAL/css/unal.css',
  '/prototipo-producto/assets/Header-UNAL/css/base.css',
  '/prototipo-producto/assets/Header-UNAL/css/tablet.css',
  '/prototipo-producto/assets/Header-UNAL/css/phone.css',
  '/prototipo-producto/assets/Header-UNAL/css/small.css',
  '/prototipo-producto/assets/Header-UNAL/css/printer.css',
];

const institutionalProfiles = ['Aspirantes', 'Estudiantes', 'Egresados', 'Docentes', 'Administrativos'];

const catalogoSections: { label: string; items: string[] }[] = [
  {
    label: 'Áreas',
    items: ['Artes', 'Ciencias', 'Ciencias agrarias y veterinaria', 'Ciencias de la salud', 'Ciencias económicas', 'Ciencias Humanas y Sociales', 'Derecho y ciencias políticas', 'Ingeniería', 'Literatura'],
  },
  {
    label: 'Sedes',
    items: ['Sede Bogotá', 'Sede Caribe', 'Sede Medellín', 'Sede Nivel nacional', 'Sede Palmira', 'Sede Amazonía', 'Sede La Paz', 'Sede Manizales'],
  },
  {
    label: 'Colecciones',
    items: ['Biblioteca abierta', 'Ciencias naturales', 'Clásicos del pensamiento', 'Colección CES', 'Estadísticas e indicadores', 'Estudios afrocolombianos', 'Geografía y ordenamiento territorial', 'Historia y memoria', 'Lenguas aborígenes', 'Medio ambiente', 'Obra selecta', 'Salud pública', 'Semillas', 'Textos universitarios', 'Vigilada MinEducación'],
  },
  {
    label: 'Impreso',
    items: ['Todos los impresos', 'Novedades impresas', 'Más vendidos impresos', 'Disponibles para envío'],
  },
  {
    label: 'E-books',
    items: ['Todos los E-books', 'Lectura en línea', 'Apps multidispositivo', 'EPUB', 'Acceso abierto', 'Consulta gratuita'],
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
  Impreso: { icon: BookMarked, color: '#2FAE73' },
  'Todos los impresos': { icon: BookMarked, color: '#2FAE73' },
  'Novedades impresas': { icon: BookMarked, color: '#2FAE73' },
  'Más vendidos impresos': { icon: BookMarked, color: '#2FAE73' },
  'Disponibles para envío': { icon: BookMarked, color: '#2FAE73' },
  'Todos los E-books': { icon: Smartphone, color: '#2F80ED' },
  'Lectura en línea': { icon: Smartphone, color: '#2F80ED' },
  'Apps multidispositivo': { icon: Smartphone, color: '#2F80ED' },
  EPUB: { icon: Smartphone, color: '#2F80ED' },
  'Acceso abierto': { icon: Unlock, color: '#EE7E11' },
  'Consulta gratuita': { icon: Unlock, color: '#EE7E11' },
  'Catálogo IBD': { icon: Package, color: '#D98A12' },
  'Novedades IBD': { icon: Package, color: '#D98A12' },
  'Solicitar impresión bajo demanda': { icon: Package, color: '#D98A12' },
  'Cómo funciona IBD': { icon: Package, color: '#D98A12' },
  'Tiempos de producción': { icon: Package, color: '#D98A12' },
};

const shadowOverrides = `
  :host {
    display: block;
  }

  .unal-portal-host {
    position: sticky;
    top: 0;
    z-index: 70;
    background: #ffffff;
  }

  .unal-portal-host * {
    box-sizing: border-box;
  }

  #unalTop {
    position: relative;
    min-height: 96px;
  }

  #unalTop .logo {
    z-index: 4;
  }

  .unal-portal-logo-image {
    width: 93%;
    height: 93%;
    object-fit: contain;
  }

  .unal-portal-desktop-offset {
    margin-left: 228px;
  }

  .unal-portal-top-row {
    display: flex;
    min-height: 24px;
    align-items: stretch;
    justify-content: flex-end;
    background: #5f5f5f;
    border-top: 3px solid #87a0aa;
  }

  .unal-portal-top-right {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
  }

  .unal-portal-top-row #profiles ul {
    display: flex;
    align-items: stretch;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .unal-portal-top-row #profiles li {
    margin: 0;
  }

  .unal-portal-top-row #profiles a {
    display: inline-flex;
    min-height: 24px;
    align-items: center;
    border-left: 1px solid rgba(255,255,255,0.14);
    padding: 0 11px;
    color: #ffffff;
    font-size: 11px;
    font-weight: 700;
    text-decoration: none;
  }

  .unal-portal-top-row #profiles a:hover {
    background: rgba(255,255,255,0.08);
    text-decoration: none;
  }

  .unal-portal-social-links {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-left: 10px;
    padding-right: 8px;
  }

  .unal-portal-social-link {
    display: inline-flex;
    width: 18px;
    height: 18px;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 999px;
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.62);
    text-decoration: none;
  }

  .unal-portal-social-link:hover {
    color: rgba(255,255,255,0.88);
    text-decoration: none;
    background: rgba(255,255,255,0.1);
  }

  .unal-portal-middle-row {
    display: flex;
    min-height: 70px;
    align-items: center;
    justify-content: space-between;
    background: #666666;
    padding: 0 16px 0 34px;
  }

  .unal-portal-site-url {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
    text-decoration: none;
    line-height: 1;
  }

  .unal-portal-site-url:hover {
    color: #ffffff;
    text-decoration: none;
  }

  .unal-portal-site-url-icon {
    display: inline-flex;
    color: rgba(255,255,255,0.48);
  }

  .unal-portal-commercial-menu {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: auto;
  }

  .unal-portal-commercial-button {
    display: inline-flex;
    min-height: 30px;
    align-items: center;
    justify-content: center;
    gap: 6px;
    border: 1px solid rgba(255,255,255,0.14);
    padding: 7px 14px;
    background: #4f4f4f;
    color: #ffffff;
    font-size: 12px;
    font-weight: 600;
    text-decoration: none;
    line-height: 1;
    cursor: pointer;
  }

  .unal-portal-commercial-button:hover {
    color: #ffffff;
    text-decoration: none;
    opacity: 0.93;
  }

  .unal-portal-commercial-button--login {
    background: #4c962e;
    border-color: #4c962e;
  }

  .unal-portal-commercial-button--signup {
    background: #ff7757;
    border-color: #ff7757;
  }

  .unal-portal-commercial-separator {
    color: rgba(255,255,255,0.4);
    font-size: 12px;
  }

  .unal-portal-commercial-button:focus-visible,
  .unal-portal-catalog-link:focus-visible,
  .unal-portal-catalog-search:focus-visible,
  .unal-portal-icon-button:focus-visible,
  .unal-portal-mobile-trigger:focus-visible,
  .unal-portal-mobile-link:focus-visible,
  .unal-portal-mobile-action:focus-visible,
  .unal-portal-mobile-search:focus-visible,
  .unal-portal-site-url:focus-visible {
    outline: 2px solid #ff7757;
    outline-offset: 2px;
  }

  .unal-portal-catalog-shell {
    background: #ffffff;
    padding: 12px 0;
  }

  .unal-portal-desktop-sticky {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 95;
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: transform 180ms ease, opacity 180ms ease;
  }

  .unal-portal-desktop-sticky--visible {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .unal-portal-desktop-sticky .unal-portal-catalog-shell {
    padding: 10px 0;
    border-bottom: 1px solid rgba(0,0,0,0.08);
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  }

  .unal-portal-desktop-sticky .unal-portal-catalog-wrap {
    padding-left: 16px;
  }

  .unal-portal-desktop-sticky .unal-portal-catalog-bar {
    min-height: 48px;
  }

  .unal-portal-catalog-wrap {
    width: 100%;
    max-width: 1380px;
    margin: 0 auto;
    padding: 0 12px 0 180px;
  }

  .unal-portal-catalog-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    min-height: 54px;
    background: #ffffff;
    padding: 0 18px;
  }

  .unal-portal-catalog-nav {
    display: flex;
    align-items: center;
    gap: 40px;
    margin: 0 auto;
  }

  .unal-portal-catalog-item {
    position: relative;
    display: flex;
    align-items: center;
  }

  .unal-portal-catalog-link {
    display: inline-flex;
    min-height: 28px;
    align-items: center;
    gap: 4px;
    border: 0;
    background: transparent;
    appearance: none;
    padding: 0;
    color: #595959;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.02em;
    line-height: 1;
    vertical-align: middle;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
  }

  .unal-portal-catalog-link span,
  .unal-portal-catalog-link svg {
    display: block;
  }

  .unal-portal-catalog-link:hover,
  .unal-portal-catalog-link--active {
    color: #2e2e2e;
    text-decoration: none;
  }

  .unal-portal-catalog-tools {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: auto;
    flex-shrink: 0;
  }

  .unal-portal-catalog-search {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    width: 190px;
    border: 1px solid #efeae0;
    background: #f5f1eb;
    padding: 8px 10px;
    color: #8a8a8a;
    font-size: 12px;
    cursor: pointer;
  }

  .unal-portal-icon-row {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .unal-portal-icon-button {
    position: relative;
    display: inline-flex;
    height: 28px;
    width: 28px;
    align-items: center;
    justify-content: center;
    border: 0;
    background: transparent;
    color: #868686;
    cursor: pointer;
  }

  .unal-portal-icon-button:hover {
    color: #3c3c3c;
  }

  .unal-portal-cart-badge {
    position: absolute;
    top: -1px;
    right: -2px;
    display: inline-flex;
    height: 16px;
    width: 16px;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    background: #ff7757;
    color: #fff;
    font-size: 10px;
    font-weight: 700;
  }

  .unal-portal-dropdown {
    width: 100%;
    max-width: 1380px;
    margin: 0 auto;
    padding: 0 12px 0 180px;
  }

  .unal-portal-dropdown-panel {
    display: flex;
    background: #fff;
    border-top: 1px solid #ece6dd;
    box-shadow: 0 10px 32px rgba(0,0,0,0.14);
  }

  .unal-portal-dropdown-sidebar {
    width: 245px;
    border-right: 1px solid #ece6dd;
    background: #f5f1eb;
    padding: 12px 0;
  }

  .unal-portal-dropdown-sidebutton {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    border: 0;
    background: transparent;
    padding: 10px 20px;
    color: #606060;
    font-size: 13px;
    text-align: left;
    cursor: pointer;
  }

  .unal-portal-dropdown-sidebutton:hover,
  .unal-portal-dropdown-sidebutton--active {
    background: #ffffff;
    color: #2f2f2f;
    font-weight: 700;
  }

  .unal-portal-dropdown-content {
    flex: 1;
    padding: 22px 28px;
  }

  .unal-portal-dropdown-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px 20px;
  }

  .unal-portal-dropdown-item {
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px dashed #e8dfd4;
    padding-bottom: 8px;
    color: #606060;
    font-size: 13px;
    text-decoration: none;
  }

  .unal-portal-dropdown-item:hover {
    color: #2f2f2f;
    text-decoration: none;
  }

  .unal-portal-mobile-nav,
  .unal-portal-mobile-actions,
  .unal-portal-mobile-menu,
  .unal-portal-mobile-stickybar {
    display: none;
  }

  @media (max-width: 991px) {
    .unal-portal-desktop-offset,
    .unal-portal-catalog-shell,
    .unal-portal-desktop-sticky {
      display: none !important;
    }

    #unalTop {
      min-height: 0;
      background: #3f3f3f;
    }

    #unalTop .logo {
      position: relative;
      width: 100%;
      min-height: 84px;
      background: #3f3f3f;
      box-shadow: none;
    }

    #unalTop .logo a {
      display: inline-flex;
      height: 84px;
      align-items: center;
      padding-left: 16px;
    }

    .unal-portal-mobile-nav {
      display: block;
      margin-bottom: 0;
      border: 0;
      padding: 0;
      background: #ffffff;
    }

    .unal-portal-mobile-topline {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      background: #5f5f5f;
      padding: 12px 16px 10px;
    }

    .unal-portal-mobile-url {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: #ffffff;
      font-size: 16px;
      font-weight: 800;
      line-height: 1.15;
      text-decoration: none;
    }

    .unal-portal-mobile-url-icon {
      display: inline-flex;
      color: rgba(255,255,255,0.5);
      flex-shrink: 0;
    }

    .unal-portal-mobile-trigger {
      display: inline-flex;
      height: 42px;
      width: 42px;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(255,255,255,0.2);
      background: transparent;
      color: #ffffff;
    }

    .unal-portal-mobile-actions,
    .unal-portal-mobile-menu {
      display: grid;
    }

    .unal-portal-mobile-actions {
      gap: 10px;
      background: #5f5f5f;
      padding: 0 16px 16px;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .unal-portal-mobile-action,
    .unal-portal-mobile-search {
      display: inline-flex;
      min-height: 44px;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border: 1px solid rgba(255,255,255,0.16);
      background: #4d4d4d;
      color: #ffffff;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 10px;
    }

    .unal-portal-mobile-action--login {
      background: #4c962e;
      border-color: #4c962e;
    }

    .unal-portal-mobile-action--signup {
      background: #ff7757;
      border-color: #ff7757;
    }

    .unal-portal-mobile-search {
      background: #f5f1eb;
      border-color: #efeae0;
      color: #646464;
      grid-column: 1 / -1;
    }

    .unal-portal-mobile-menu {
      gap: 0;
      background: #ffffff;
      padding: 0 16px 92px;
    }

    .unal-portal-mobile-link,
    .unal-portal-mobile-accordion-trigger {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      border: 0;
      border-bottom: 1px solid #ece6dd;
      background: transparent;
      padding: 13px 0;
      color: #4f4f4f;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      text-decoration: none;
      cursor: pointer;
    }

    .unal-portal-mobile-accordion-content {
      display: grid;
      gap: 14px;
      border-bottom: 1px solid #ece6dd;
      padding: 12px 0 14px;
    }

    .unal-portal-mobile-group-title {
      margin: 0 0 6px;
      color: #ff7757;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .unal-portal-mobile-subitem {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 4px 0 4px 12px;
      color: #5e5e5e;
      font-size: 13px;
      text-decoration: none;
    }

    .unal-portal-mobile-stickybar {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 80;
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      border-top: 1px solid rgba(0,0,0,0.08);
      background: rgba(255,255,255,0.98);
      backdrop-filter: blur(10px);
      box-shadow: 0 -8px 24px rgba(0,0,0,0.08);
    }

    .unal-portal-mobile-stickyitem {
      display: flex;
      min-height: 58px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      border: 0;
      background: transparent;
      color: #4f4f4f;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      cursor: pointer;
    }

    .unal-portal-mobile-stickyitem--active,
    .unal-portal-mobile-stickyitem:hover {
      color: #2f2f2f;
      background: rgba(0,0,0,0.02);
    }

    .unal-portal-mobile-stickybadge {
      position: absolute;
      top: -6px;
      right: -10px;
      display: inline-flex;
      height: 16px;
      width: 16px;
      align-items: center;
      justify-content: center;
      border-radius: 999px;
      background: #ff7757;
      color: #ffffff;
      font-size: 10px;
      font-weight: 700;
    }
  }
`;

const Header = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [desktopStickyVisible, setDesktopStickyVisible] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(0);
  const menuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useLayoutEffect(() => {
    if (!hostRef.current || hostRef.current.shadowRoot) return;
    const shadowRoot = hostRef.current.attachShadow({ mode: 'open' });
    const mountNode = document.createElement('div');
    shadowRoot.appendChild(mountNode);
    setPortalContainer(mountNode);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (hostRef.current && !hostRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  useEffect(() => {
    if (!mobileOpen) setMobileExpanded(null);
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 991) {
        setDesktopStickyVisible(false);
        return;
      }
      setDesktopStickyVisible(window.scrollY > 180);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const openMenu = (menu: string) => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
    setHoveredSection(0);
    setActiveMenu(menu);
  };

  const closeMenu = () => {
    menuTimeout.current = setTimeout(() => setActiveMenu(null), 180);
  };

  const keepMenuOpen = () => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
  };

  const renderDropdown = (sections: { label: string; items: string[] }[]) => (
    <div className="unal-portal-dropdown" onMouseEnter={keepMenuOpen} onMouseLeave={closeMenu}>
      <div className="unal-portal-dropdown-panel">
        <div className="unal-portal-dropdown-sidebar">
          {sections.map((section, idx) => (
            <button
              key={section.label}
              type="button"
              onMouseEnter={() => setHoveredSection(idx)}
              className={`unal-portal-dropdown-sidebutton ${hoveredSection === idx ? 'unal-portal-dropdown-sidebutton--active' : ''}`}
            >
              <span>{section.label}</span>
              <ChevronRight size={15} />
            </button>
          ))}
        </div>
        <div className="unal-portal-dropdown-content">
          <div className="unal-portal-dropdown-grid">
            {sections[hoveredSection]?.items.map((item) => {
              const Icon = formatNavIcons[item]?.icon;
              const color = formatNavIcons[item]?.color;
              return (
                <a key={item} href="#" className="unal-portal-dropdown-item">
                  {Icon ? <Icon size={15} color={color} /> : null}
                  <span>{item}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCatalogBar = (sticky = false) => (
    <div className={sticky ? `unal-portal-desktop-sticky${desktopStickyVisible ? ' unal-portal-desktop-sticky--visible' : ''}` : ''}>
      <div className="unal-portal-catalog-shell d-none d-md-block">
        <div className="unal-portal-catalog-wrap">
          <div className="unal-portal-catalog-bar">
            <nav className="unal-portal-catalog-nav" aria-label="Menú principal del catálogo">
              <div className="unal-portal-catalog-item" onMouseEnter={() => openMenu('catalogo')} onMouseLeave={closeMenu}>
                <Link to="/catalogo" className={`unal-portal-catalog-link ${activeMenu === 'catalogo' ? 'unal-portal-catalog-link--active' : ''}`}>
                  <span>CATÁLOGO</span>
                  <ChevronDown size={12} />
                </Link>
              </div>
              <a href="#" className="unal-portal-catalog-link">LIBRERÍAS UNAL</a>
              <div className="unal-portal-catalog-item" onMouseEnter={() => openMenu('noticias')} onMouseLeave={closeMenu}>
                <button type="button" className={`unal-portal-catalog-link ${activeMenu === 'noticias' ? 'unal-portal-catalog-link--active' : ''}`}>
                  <span>NOTICIAS</span>
                  <ChevronDown size={12} />
                </button>
              </div>
              <a href="#" className="unal-portal-catalog-link">NOSOTROS</a>
            </nav>

            <div className="unal-portal-catalog-tools">
              <button type="button" onClick={() => setSearchOpen(true)} className="unal-portal-catalog-search">
                <Search size={14} />
                <span>Buscar...</span>
              </button>
              <div className="unal-portal-icon-row">
                <button type="button" className="unal-portal-icon-button" aria-label="Usuario">
                  <User size={15} />
                </button>
                <button type="button" className="unal-portal-icon-button" aria-label="Favoritos">
                  <Heart size={15} />
                </button>
                <button type="button" className="unal-portal-icon-button" aria-label="Carrito">
                  <ShoppingCart size={15} />
                  <span className="unal-portal-cart-badge">2</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {activeMenu === 'catalogo' ? renderDropdown(catalogoSections) : null}
        {activeMenu === 'noticias' ? renderDropdown(noticiasSections) : null}
      </div>
    </div>
  );

  const portalContent = (
    <>
      {templateCssFiles.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
      <style>{shadowOverrides}</style>

      <div className="unal-portal-host">
        <header id="unalTop">
          <div className="logo">
            <Link to="/" aria-label="Ir al inicio del portal de libros UNAL">
              <img
                src="/prototipo-producto/assets/Header-UNAL/images/escudoUnal.svg"
                alt="Universidad Nacional de Colombia"
                className="unal-portal-logo-image"
              />
            </Link>
          </div>

          <div className="unal-portal-desktop-offset d-none d-md-block">
            <div className="unal-portal-top-row">
              <div className="unal-portal-top-right">
                <nav id="profiles">
                  <ul className="mr-auto nav justify-content-end">
                    {institutionalProfiles.map((profile) => (
                      <li key={profile} className="nav-item">
                        <a href="#">{profile}</a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="unal-portal-social-links" aria-label="Redes institucionales">
                  <a href="https://www.facebook.com/UNALOficial" target="_blank" rel="noreferrer" className="unal-portal-social-link" aria-label="Facebook">
                    <svg viewBox="0 0 24 24" width="10" height="10" aria-hidden="true">
                      <path fill="currentColor" d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6h1.7V4.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.4V11H8v3h2.6v8h2.9Z" />
                    </svg>
                  </a>
                  <a href="https://twitter.com/UNALOficial" target="_blank" rel="noreferrer" className="unal-portal-social-link" aria-label="Twitter">
                    <svg viewBox="0 0 24 24" width="10" height="10" aria-hidden="true">
                      <path fill="currentColor" d="M18.9 7.1c.8-.1 1.5-.5 2.1-1-.3.8-.9 1.4-1.7 1.8.8-.1 1.4-.3 2-.8-.5.7-1.1 1.2-1.8 1.6v.5c0 5.1-3.9 11-11 11-2.2 0-4.2-.6-5.9-1.8h.8c1.8 0 3.4-.6 4.7-1.6-1.7 0-3.1-1.1-3.6-2.6.2 0 .5.1.7.1.4 0 .7 0 1-.1-1.8-.4-3.1-2-3.1-3.9v-.1c.5.3 1.1.5 1.8.5-1.1-.7-1.8-1.9-1.8-3.2 0-.7.2-1.4.5-2 .9 1.1 2.3 2 3.8 2.6 1.5.6 3.1 1 4.7 1.1-.1-.3-.1-.6-.1-.9 0-2.2 1.8-3.9 4-3.9 1.1 0 2.1.4 2.9 1.2Z" />
                    </svg>
                  </a>
                  <a href="https://www.youtube.com/channel/UCnE6Zj2llVxcvL5I38B0Ceg" target="_blank" rel="noreferrer" className="unal-portal-social-link" aria-label="YouTube">
                    <svg viewBox="0 0 24 24" width="10" height="10" aria-hidden="true">
                      <path fill="currentColor" d="M21.6 7.2c-.2-.8-.8-1.4-1.6-1.6C18.6 5.2 12 5.2 12 5.2s-6.6 0-8 .4c-.8.2-1.4.8-1.6 1.6C2 8.6 2 12 2 12s0 3.4.4 4.8c.2.8.8 1.4 1.6 1.6 1.4.4 8 .4 8 .4s6.6 0 8-.4c.8-.2 1.4-.8 1.6-1.6.4-1.4.4-4.8.4-4.8s0-3.4-.4-4.8ZM10 15.2V8.8L15.2 12 10 15.2Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="unal-portal-middle-row">
              <a href="https://portaldelibros.unal.edu.co/" className="unal-portal-site-url">
                <span className="unal-portal-site-url-icon" aria-hidden="true">
                  <MapPin size={16} />
                </span>
                <span>portaldelibros.unal.edu.co</span>
              </a>

              <div className="unal-portal-commercial-menu">
                <button type="button" onClick={() => setRedeemOpen(true)} className="unal-portal-commercial-button">
                  <Ticket size={13} />
                  <span>Redimir código</span>
                </button>
                <span className="unal-portal-commercial-separator">|</span>
                <a href="#" className="unal-portal-commercial-button unal-portal-commercial-button--login">
                  Iniciar sesión
                </a>
                <a href="#" className="unal-portal-commercial-button unal-portal-commercial-button--signup">
                  Crear cuenta
                </a>
              </div>
            </div>
          </div>

          {renderCatalogBar()}
          {renderCatalogBar(true)}

          <nav className="navbar navbar-light light-blue lighten-4 main_menu unal-portal-mobile-nav">
            <div className="unal-portal-mobile-topline">
              <Link to="/" className="unal-portal-mobile-url">
                <span className="unal-portal-mobile-url-icon" aria-hidden="true">
                  <MapPin size={15} />
                </span>
                <span>portaldelibros.unal.edu.co</span>
              </Link>
              <button
                type="button"
                className="unal-portal-mobile-trigger"
                onClick={() => setMobileOpen((value) => !value)}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>

            {mobileOpen ? (
              <>
                <div className="unal-portal-mobile-actions">
                  <button type="button" onClick={() => setSearchOpen(true)} className="unal-portal-mobile-search">
                    <Search size={15} />
                    <span>Buscar en el catálogo</span>
                  </button>
                  <button type="button" onClick={() => setRedeemOpen(true)} className="unal-portal-mobile-action">
                    <Ticket size={15} />
                    <span>Redimir código</span>
                  </button>
                  <a href="#" className="unal-portal-mobile-action unal-portal-mobile-action--login">Iniciar sesión</a>
                  <a href="#" className="unal-portal-mobile-action unal-portal-mobile-action--signup">Crear cuenta</a>
                </div>

                <div className="unal-portal-mobile-menu">
                  <div>
                    <button
                      type="button"
                      className="unal-portal-mobile-accordion-trigger"
                      onClick={() => setMobileExpanded((value) => (value === 'catalogo' ? null : 'catalogo'))}
                    >
                      <span>CATÁLOGO</span>
                      <ChevronDown size={15} />
                    </button>
                    {mobileExpanded === 'catalogo' ? (
                      <div className="unal-portal-mobile-accordion-content">
                        {catalogoSections.map((group) => (
                          <div key={group.label}>
                            <p className="unal-portal-mobile-group-title">{group.label}</p>
                            {group.items.map((item) => {
                              const Icon = formatNavIcons[item]?.icon;
                              const color = formatNavIcons[item]?.color;
                              return (
                                <a key={item} href="#" className="unal-portal-mobile-subitem">
                                  {Icon ? <Icon size={14} color={color} /> : null}
                                  <span>{item}</span>
                                </a>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <a href="#" className="unal-portal-mobile-link">LIBRERÍAS UNAL</a>

                  <div>
                    <button
                      type="button"
                      className="unal-portal-mobile-accordion-trigger"
                      onClick={() => setMobileExpanded((value) => (value === 'noticias' ? null : 'noticias'))}
                    >
                      <span>NOTICIAS</span>
                      <ChevronDown size={15} />
                    </button>
                    {mobileExpanded === 'noticias' ? (
                      <div className="unal-portal-mobile-accordion-content">
                        {noticiasSections.map((group) => (
                          <div key={group.label}>
                            <p className="unal-portal-mobile-group-title">{group.label}</p>
                            {group.items.map((item) => (
                              <a key={item} href="#" className="unal-portal-mobile-subitem">
                                <span>{item}</span>
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <a href="#" className="unal-portal-mobile-link">NOSOTROS</a>
                </div>
              </>
            ) : null}
          </nav>

          <div className="unal-portal-mobile-stickybar">
            <button
              type="button"
              className={`unal-portal-mobile-stickyitem ${mobileOpen ? 'unal-portal-mobile-stickyitem--active' : ''}`}
              onClick={() => setMobileOpen((value) => !value)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Cerrar navegación' : 'Abrir navegación'}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              <span>Menú</span>
            </button>
            <button
              type="button"
              className="unal-portal-mobile-stickyitem"
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar en el catálogo"
            >
              <Search size={18} />
              <span>Buscar</span>
            </button>
            <button
              type="button"
              className="unal-portal-mobile-stickyitem"
              aria-label="Cuenta"
            >
              <User size={18} />
              <span>Cuenta</span>
            </button>
            <button
              type="button"
              className="unal-portal-mobile-stickyitem"
              aria-label="Carrito"
            >
              <span style={{ position: 'relative', display: 'inline-flex' }}>
                <ShoppingCart size={18} />
                <span className="unal-portal-mobile-stickybadge">2</span>
              </span>
              <span>Carrito</span>
            </button>
          </div>
        </header>
      </div>
    </>
  );

  return (
    <>
      <div ref={hostRef} />
      {portalContainer ? createPortal(portalContent, portalContainer) : null}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <RedeemCodeModal open={redeemOpen} onClose={() => setRedeemOpen(false)} />
    </>
  );
};

export default Header;
