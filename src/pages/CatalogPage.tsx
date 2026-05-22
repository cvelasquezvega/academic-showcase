import { ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CatalogExplorer from '@/components/CatalogExplorer';

const CatalogPage = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <Header />
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto flex items-center gap-2 px-4 py-3 font-body text-[11px] font-light text-muted-foreground">
        <a href="/" className="transition-colors hover:text-primary">Inicio</a>
        <ChevronRight className="h-3 w-3 flex-shrink-0" />
        <span className="font-medium text-foreground">Todo el catálogo</span>
      </div>
    </nav>
    <CatalogExplorer />
    <Footer />
  </div>
);

export default CatalogPage;
