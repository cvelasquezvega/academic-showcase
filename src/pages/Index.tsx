import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import SearchBar from '@/components/SearchBar';
import FormatAccess from '@/components/FormatAccess';
import ImageBannerSlider from '@/components/ImageBannerSlider';
import BookSection from '@/components/BookSection';
import PromoBanner from '@/components/PromoBanner';
import ConvocatoriaBanner from '@/components/ConvocatoriaBanner';
import CatalogExplorer from '@/components/CatalogExplorer';
import CollectionsGrid from '@/components/CollectionsGrid';
import InternalLinksBar from '@/components/InternalLinksBar';
import MultimediaSection from '@/components/MultimediaSection';
import TrustSignals from '@/components/TrustSignals';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import StickyRegisterCTA from '@/components/StickyRegisterCTA';
import { featuredBooks, bestsellerBooks } from '@/data/books';

const Index = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <HeroBanner />
    <SearchBar />
    <FormatAccess />
    <ImageBannerSlider />
    <BookSection title="Novedades editoriales" subtitle="Nuevos lanzamientos" books={featuredBooks} />
    <PromoBanner />
    <BookSection title="Los más vendidos" subtitle="Bestsellers" books={bestsellerBooks} ctaLabel="Ver más" />
    <ConvocatoriaBanner />
    <CatalogExplorer />
    <CollectionsGrid />
    <InternalLinksBar />
    <MultimediaSection />
    <TrustSignals />
    <Newsletter />
    <Footer />
    <StickyRegisterCTA />
  </div>
);

export default Index;
