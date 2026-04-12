import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BookCard from './BookCard';
import type { Book } from '@/data/books';

interface Props {
  title: string;
  subtitle?: string;
  books: Book[];
  ctaLabel?: string;
}

const BookSection = ({ title, subtitle, books, ctaLabel = 'Ver todo' }: Props) => (
  <section className="py-16 md:py-20">
    <div className="container mx-auto px-4">
      <div className="flex items-end justify-between mb-10">
        <div>
          {subtitle && (
            <p className="font-body text-sm tracking-widest uppercase text-muted-foreground mb-2">{subtitle}</p>
          )}
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
        </div>
        <Button variant="ghost" className="font-body text-sm text-primary font-semibold hover:text-primary/80 uppercase tracking-wider">
          {ctaLabel} <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
        {books.map((book, i) => (
          <BookCard key={book.id} book={book} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default BookSection;
