import { useState } from 'react';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = ['Books', 'New Releases', 'Subjects', 'Open Access', 'About'];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-[72px]">
        <a href="#" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-heading text-lg font-bold">U</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-heading text-xl font-bold text-foreground tracking-tight">
              Editorial UN
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="font-body text-sm font-medium text-foreground hover:text-primary transition-colors tracking-wide uppercase"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground hover:text-primary hidden sm:flex">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground hover:text-primary relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
              2
            </span>
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden bg-background border-t border-border px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <a key={link} href="#" className="block font-body text-sm font-medium text-foreground hover:text-primary uppercase tracking-wide">
              {link}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
