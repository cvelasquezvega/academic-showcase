import type { ReactNode } from 'react';
import type { Book } from '@/data/books';

type BookCoverProps = {
  book: Book;
  className?: string;
  imageClassName?: string;
  fallbackClassName?: string;
  fillImage?: boolean;
  showBackground?: boolean;
  showOverlay?: boolean;
  children?: ReactNode;
};

const BookCover = ({
  book,
  className = '',
  imageClassName = '',
  fallbackClassName = '',
  fillImage = true,
  showBackground = true,
  showOverlay = true,
  children,
}: BookCoverProps) => (
  <div className={`relative overflow-hidden ${showBackground ? `bg-gradient-to-br ${book.coverColor}` : ''} ${className}`}>
    {book.coverImage ? (
      <img
        src={book.coverImage}
        alt={`Portada de ${book.title}`}
        className={fillImage
          ? `absolute inset-0 h-full w-full object-cover ${imageClassName}`
          : `block h-auto w-full ${imageClassName}`}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.style.display = 'none';
        }}
      />
    ) : (
      <div className={`absolute inset-0 flex items-center justify-center p-3 ${fallbackClassName}`}>
        <span className="font-heading text-xs text-white font-bold text-center leading-tight line-clamp-3">
          {book.title}
        </span>
      </div>
    )}
    {showOverlay && <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />}
    {children}
  </div>
);

export default BookCover;
