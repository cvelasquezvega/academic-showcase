import { useState } from 'react';
import { Search, User, Heart, ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = ['Catálogo', 'Novedades', 'Colecciones', 'Acceso Abierto', 'Nosotros'];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center">
            <span className="text-card font-heading text-sm font-bold">EU</span>
          </div>
          <span className="font-heading text-lg font-bold text-foreground hidden sm:block">
            Editorial <span className="text-primary">Académica</span>
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link} href="#" className="font-body text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hidden sm:flex">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hidden sm:flex">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
              2
            </span>
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden text-muted-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden bg-card border-t border-border px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a key={link} href="#" className="block font-body text-sm font-medium text-muted-foreground hover:text-primary">
              {link}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
