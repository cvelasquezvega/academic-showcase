export type BookFormat = 'printed' | 'ebook' | 'audiobook' | 'open-access' | 'ibd';

export interface Book {
  id: string;
  title: string;
  author: string;
  coverColor: string;
  price?: number;
  originalPrice?: number;
  formats: BookFormat[];
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
  discount?: number;
}

export const featuredBooks: Book[] = [
  {
    id: '1',
    title: 'El principio de la descentralización territorial',
    author: 'María Angélica Sánchez Álvarez',
    coverColor: 'from-teal-700 to-teal-900',
    price: 62000,
    formats: ['printed', 'ebook', 'ibd'],
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
