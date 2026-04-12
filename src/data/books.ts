export type BookFormat = 'printed' | 'ebook' | 'audiobook' | 'open-access' | 'ibd';

export type PrintStatus = 'available' | 'coming-soon' | 'out-of-stock';
export type EbookSubFormat = 'pdf' | 'epub';

export interface FormatDetail {
  format: BookFormat;
  price?: number;
  originalPrice?: number;
  /** Only for 'printed' */
  printStatus?: PrintStatus;
  /** Only for 'ebook' — which sub-formats are available */
  ebookFormats?: EbookSubFormat[];
  /** Only for 'audiobook' */
  audioStatus?: 'coming-soon' | 'free-listen';
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverColor: string;
  /** Legacy price for backwards compat — prefer formatDetails */
  price?: number;
  originalPrice?: number;
  formats: BookFormat[];
  formatDetails?: FormatDetail[];
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
  discount?: number;
}

// Helper: is a book multi-format (needs "Ver opciones" instead of direct add-to-cart)
export const isMultiFormat = (book: Book): boolean => {
  const sellableFormats = book.formats.filter(f => f !== 'audiobook' && f !== 'open-access');
  return sellableFormats.length > 1;
};

// Helper: get primary CTA for mini-card
export const getMiniCardCTA = (book: Book): { label: string; icon: 'download' | 'cart' | 'options' | 'notify' | 'coming-soon' } => {
  // Open access only
  if (book.formats.length === 1 && book.formats[0] === 'open-access') {
    return { label: 'Descargar gratis', icon: 'download' };
  }
  // Check out-of-stock for single printed
  const printDetail = book.formatDetails?.find(d => d.format === 'printed');
  if (book.formats.length === 1 && book.formats[0] === 'printed') {
    if (printDetail?.printStatus === 'out-of-stock') return { label: 'Avíseme disponibilidad', icon: 'notify' };
    if (printDetail?.printStatus === 'coming-soon') return { label: 'Próximamente', icon: 'coming-soon' };
    return { label: 'Agregar al carrito', icon: 'cart' };
  }
  // Single ebook
  if (book.formats.length === 1 && book.formats[0] === 'ebook') {
    return { label: 'Comprar eBook', icon: 'cart' };
  }
  // Single IBD
  if (book.formats.length === 1 && book.formats[0] === 'ibd') {
    return { label: 'Solicitar impresión', icon: 'cart' };
  }
  // Multiple purchasable formats
  if (isMultiFormat(book)) {
    return { label: 'Ver opciones', icon: 'options' };
  }
  // Fallback for open-access + audiobook combo etc
  if (book.formats.includes('open-access')) {
    return { label: 'Descargar gratis', icon: 'download' };
  }
  return { label: 'Ver opciones', icon: 'options' };
};

export const featuredBooks: Book[] = [
  {
    id: '1',
    title: 'El principio de la descentralización territorial',
    author: 'María Angélica Sánchez Álvarez',
    coverColor: 'from-teal-700 to-teal-900',
    price: 62000,
    formats: ['printed', 'ebook', 'ibd'],
    formatDetails: [
      { format: 'printed', price: 62000, printStatus: 'available' },
      { format: 'ebook', price: 35000, ebookFormats: ['pdf', 'epub'] },
      { format: 'ibd', price: 58000 },
    ],
    category: 'Derecho',
    isNew: true,
  },
  {
    id: '2',
    title: 'Mujeres, hombres y cambio social',
    author: 'Luz Gabriela Arango y otros',
    coverColor: 'from-amber-100 to-amber-300',
    price: 45000,
    formats: ['printed', 'ebook'],
    formatDetails: [
      { format: 'printed', price: 45000, printStatus: 'available' },
      { format: 'ebook', price: 28000, ebookFormats: ['pdf'] },
    ],
    category: 'Ciencias Sociales',
    isNew: true,
  },
  {
    id: '3',
    title: 'La representación del vacío',
    author: 'Francisco Pérez Muñoz',
    coverColor: 'from-slate-700 to-slate-900',
    price: 0,
    formats: ['open-access'],
    formatDetails: [
      { format: 'open-access' },
    ],
    category: 'Arte y Cultura',
    isNew: true,
  },
  {
    id: '4',
    title: 'Cuentos del mundo viviente',
    author: 'Camila Ernesto López Carrascal',
    coverColor: 'from-sky-400 to-sky-600',
    price: 38000,
    formats: ['printed', 'ebook', 'audiobook'],
    formatDetails: [
      { format: 'printed', price: 38000, printStatus: 'available' },
      { format: 'ebook', price: 22000, ebookFormats: ['pdf', 'epub'] },
      { format: 'audiobook', audioStatus: 'coming-soon' },
    ],
    category: 'Literatura',
    isNew: true,
  },
  {
    id: '5',
    title: 'Navegar por hileros y recodos',
    author: 'Grupo de investigación',
    coverColor: 'from-emerald-600 to-emerald-800',
    price: 55000,
    formats: ['printed'],
    formatDetails: [
      { format: 'printed', price: 55000, printStatus: 'out-of-stock' },
    ],
    category: 'Ciencias',
    isNew: true,
  },
  {
    id: '6',
    title: 'Espacio urbano en la historia',
    author: 'Felipe López Vargas',
    coverColor: 'from-rose-400 to-rose-600',
    price: 48000,
    formats: ['printed', 'ebook'],
    formatDetails: [
      { format: 'printed', price: 48000, printStatus: 'coming-soon' },
      { format: 'ebook', price: 30000, ebookFormats: ['epub'] },
    ],
    category: 'Arquitectura',
  },
];

export const bestsellerBooks: Book[] = [
  {
    id: '7',
    title: 'Contra el racismo',
    author: 'Krisna Ruette Orihuela y otros',
    coverColor: 'from-red-700 to-red-900',
    price: 60000,
    formats: ['printed'],
    formatDetails: [
      { format: 'printed', price: 60000, printStatus: 'available' },
    ],
    category: 'Ciencias Sociales',
    isBestseller: true,
  },
  {
    id: '8',
    title: 'El derecho frente al poder',
    author: 'Juan Fernando Jaramillo',
    coverColor: 'from-indigo-800 to-indigo-950',
    price: 80000,
    originalPrice: 95000,
    formats: ['printed', 'ebook'],
    formatDetails: [
      { format: 'printed', price: 80000, originalPrice: 95000, printStatus: 'available' },
      { format: 'ebook', price: 50000, ebookFormats: ['pdf', 'epub'] },
    ],
    category: 'Derecho',
    isBestseller: true,
    discount: 15,
  },
  {
    id: '9',
    title: 'Martha Nussbaum y la justicia compasiva',
    author: 'Iván Alfonso Pinedo Cantillo',
    coverColor: 'from-yellow-600 to-yellow-800',
    price: 60000,
    formats: ['printed', 'ebook'],
    formatDetails: [
      { format: 'printed', price: 60000, printStatus: 'available' },
      { format: 'ebook', price: 35000, ebookFormats: ['pdf'] },
    ],
    category: 'Filosofía',
    isBestseller: true,
  },
  {
    id: '10',
    title: 'El Catatumbo: tensiones y prospectiva',
    author: 'Luis Humberto Hernández',
    coverColor: 'from-orange-500 to-orange-700',
    price: 33000,
    formats: ['printed'],
    formatDetails: [
      { format: 'printed', price: 33000, printStatus: 'available' },
    ],
    category: 'Ciencias Políticas',
    isBestseller: true,
    discount: 20,
  },
  {
    id: '11',
    title: 'Crisis ambiental y cambios globales',
    author: 'Gregorio Mesa Cuadros',
    coverColor: 'from-green-700 to-green-900',
    price: 155000,
    formats: ['printed', 'ebook'],
    formatDetails: [
      { format: 'printed', price: 155000, printStatus: 'available' },
      { format: 'ebook', price: 90000, ebookFormats: ['pdf', 'epub'] },
    ],
    category: 'Medio Ambiente',
    isBestseller: true,
  },
  {
    id: '12',
    title: 'Las promesas de la paz',
    author: 'Camilo Alberto Borrero',
    coverColor: 'from-purple-600 to-purple-800',
    price: 112000,
    formats: ['printed', 'ebook', 'audiobook'],
    formatDetails: [
      { format: 'printed', price: 112000, printStatus: 'available' },
      { format: 'ebook', price: 65000, ebookFormats: ['pdf'] },
      { format: 'audiobook', audioStatus: 'free-listen' },
    ],
    category: 'Ciencias Políticas',
    isBestseller: true,
  },
];

export const collections = [
  { name: 'Derecho y Política', count: 342, icon: '⚖️' },
  { name: 'Ciencias Sociales', count: 518, icon: '🌍' },
  { name: 'Arte y Cultura', count: 215, icon: '🎨' },
  { name: 'Ciencias Exactas', count: 189, icon: '🔬' },
  { name: 'Literatura', count: 276, icon: '📖' },
  { name: 'Medio Ambiente', count: 134, icon: '🌿' },
  { name: 'Ingeniería', count: 167, icon: '⚙️' },
  { name: 'Salud y Medicina', count: 203, icon: '🏥' },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);
};
