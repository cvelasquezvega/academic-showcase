import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import SearchBar from '@/components/SearchBar';
import FormatAccess from '@/components/FormatAccess';
import BookSection from '@/components/BookSection';
import PromoBanner from '@/components/PromoBanner';
import CollectionsGrid from '@/components/CollectionsGrid';
import TrustSignals from '@/components/TrustSignals';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { featuredBooks, bestsellerBooks } from '@/data/books';

const Index = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <HeroBanner />
    <SearchBar />
    <FormatAccess />
    <BookSection title="Novedades editoriales" subtitle="Nuevos lanzamientos" books={featuredBooks} />
    <PromoBanner />
    <BookSection title="Los más vendidos" subtitle="Bestsellers" books={bestsellerBooks} ctaLabel="Ver más" />
    <CollectionsGrid />
    <TrustSignals />
    <Newsletter />
    <Footer />
  </div>
);

export default Index;
