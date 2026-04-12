import { useState } from 'react';
import { Search, User, ShoppingCart, Menu, X, Heart, BookMarked } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'CATÁLOGO', href: '#' },
  { label: 'LIBRERÍAS UNAL', href: '#' },
  { label: 'NOTICIAS', href: '#' },
  { label: 'NOSOTROS', href: '#' },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar — dark, with UNAL logo */}
      <div className="bg-header-dark">
        <div className="container mx-auto px-4 flex items-center justify-between h-[72px]">
          {/* Left: UNAL shield logo */}
          <a href="#" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-[52px] h-[52px] bg-foreground flex items-center justify-center p-1">
              <div className="text-center leading-none">
                <span className="text-primary-foreground font-heading text-[10px] block font-bold tracking-tight">UNIVERSIDAD</span>
                <span className="text-primary-foreground font-heading text-[10px] block font-bold tracking-tight">NACIONAL</span>
                <span className="text-primary-foreground font-heading text-[8px] block tracking-tight">DE COLOMBIA</span>
              </div>
            </div>
          </a>

          {/* Center: Editorial UNAL title + nav */}
          <div className="hidden lg:flex items-center gap-10">
            <a href="#" className="flex items-baseline gap-1.5">
              <span className="font-heading text-xl font-bold text-white tracking-tight italic">
                Editorial
              </span>
              <span className="font-body text-lg font-bold text-primary tracking-wide">
                UNAL
              </span>
            </a>
            <nav className="flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-[13px] font-semibold text-white/80 hover:text-primary transition-colors tracking-wider"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right: icons */}
          <div className="flex items-center gap-0.5">
            <Button variant="ghost" size="icon" className="text-white/80 hover:text-primary hover:bg-white/10">
              <BookMarked className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white/80 hover:text-primary hover:bg-white/10">
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

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="lg:hidden bg-header-dark border-t border-white/10 px-4 py-6 space-y-4">
          <a href="#" className="block font-heading text-lg text-white italic mb-4">
            Editorial <span className="text-primary font-body not-italic font-bold">UNAL</span>
          </a>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="block font-body text-sm font-semibold text-white/80 hover:text-primary tracking-wider">
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-white/10">
            <Button className="w-full font-body font-semibold uppercase text-sm tracking-wider">
              Crear cuenta gratis
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
