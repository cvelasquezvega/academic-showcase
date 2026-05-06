export type BookFormat = 'printed' | 'ebook' | 'audiobook' | 'open-access' | 'ibd';

export type PrintStatus = 'available' | 'coming-soon' | 'out-of-stock';
export type EbookSubFormat = 'pdf' | 'epub';

export interface FormatDetail {
  format: BookFormat;
  price?: number;
  originalPrice?: number;
  printStatus?: PrintStatus;
  ebookFormats?: EbookSubFormat[];
  audioStatus?: 'coming-soon' | 'free-listen';
}

export interface Classification {
  system: 'BISAC' | 'THEMA' | 'Dewey';
  label: string;
  code: string;
}

export interface TocItem {
  title: string;
  page?: number;
}

export interface MultimediaResource {
  type: 'mp3' | 'mp4';
  title: string;
  description: string;
  duration?: string;
  size?: string;
  provider?: 'spotify' | 'youtube' | 'file';
  embedUrl?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  coAuthors?: string[];
  coverColor: string;
  coverImage?: string;
  price?: number;
  originalPrice?: number;
  formats: BookFormat[];
  formatDetails?: FormatDetail[];
  category: string;
  collection?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  discount?: number;
  // Extended metadata
  year?: number;
  pages?: number;
  dimensions?: string;
  illustrations?: string;
  language?: string;
  sede?: string;
  edition?: string;
  publishCity?: string;
  doi?: string;
  isbnPrint?: string;
  isbnPdf?: string;
  isbnEpub?: string;
  isbnIbd?: string;
  keywords?: string[];
  classifications?: Classification[];
  toc?: TocItem[];
  description?: string;
  aboutAuthor?: string;
  targetAudience?: string;
  fileSize?: string;
  drmType?: string;
  ratingAvg?: number;
  ratingCount?: number;
  multimediaResources?: MultimediaResource[];
}

// Helpers
export const isMultiFormat = (book: Book): boolean => {
  const sellableFormats = book.formats.filter(f => f !== 'audiobook' && f !== 'open-access');
  return sellableFormats.length > 1;
};

export const getMiniCardCTA = (book: Book): { label: string; icon: 'download' | 'cart' | 'options' | 'notify' | 'coming-soon' } => {
  if (book.formats.length === 1 && book.formats[0] === 'open-access') return { label: 'Ver opciones', icon: 'options' };
  const printDetail = book.formatDetails?.find(d => d.format === 'printed');
  if (book.formats.length === 1 && book.formats[0] === 'printed') {
    if (printDetail?.printStatus === 'out-of-stock') return { label: 'Avíseme disponibilidad', icon: 'notify' };
    if (printDetail?.printStatus === 'coming-soon') return { label: 'Próximamente', icon: 'coming-soon' };
    return { label: 'Ver opciones', icon: 'options' };
  }
  if (book.formats.length === 1 && book.formats[0] === 'ebook') return { label: 'Ver opciones', icon: 'options' };
  if (book.formats.length === 1 && book.formats[0] === 'ibd') return { label: 'Ver opciones', icon: 'options' };
  if (isMultiFormat(book)) return { label: 'Ver opciones', icon: 'options' };
  if (book.formats.includes('open-access')) return { label: 'Ver opciones', icon: 'options' };
  return { label: 'Ver opciones', icon: 'options' };
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);
};

/* ═══════════════════════════════════════════════════════════════
   SAMPLE DATA — enriched with full metadata
   ═══════════════════════════════════════════════════════════════ */

export const featuredBooks: Book[] = [
  {
    id: '1',
    title: 'El principio de la descentralización territorial',
    subtitle: 'Fundamentos jurídicos y análisis comparado',
    author: 'María Angélica Sánchez Álvarez',
    coverColor: 'from-teal-700 to-teal-900',
    coverImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80',
    price: 62000,
    formats: ['printed', 'ebook', 'ibd'],
    formatDetails: [
      { format: 'printed', price: 62000, printStatus: 'available' },
      { format: 'ebook', price: 35000, ebookFormats: ['pdf', 'epub'] },
      { format: 'ibd', price: 58000 },
    ],
    category: 'Derecho',
    collection: 'Colección CES',
    isNew: true,
    year: 2025,
    pages: 384,
    dimensions: '17 × 24 cm',
    language: 'Español',
    sede: 'Sede Bogotá',
    edition: 'Primera edición',
    publishCity: 'Bogotá, Colombia',
    doi: '10.15446/unal.desc.2025',
    isbnPrint: '978-958-794-321-0',
    isbnPdf: '978-958-794-322-7',
    isbnEpub: '978-958-794-323-4',
    isbnIbd: '978-958-794-324-1',
    keywords: ['descentralización', 'derecho administrativo', 'ordenamiento territorial', 'autonomía territorial', 'gobierno local'],
    classifications: [
      { system: 'BISAC', label: 'Derecho / Gobierno y derecho administrativo', code: 'LAW034000' },
      { system: 'THEMA', label: 'Derecho público y administrativo', code: 'LNF' },
      { system: 'Dewey', label: 'Derecho administrativo', code: '342.06' },
    ],
    toc: [
      { title: 'Introducción', page: 1 },
      { title: 'Capítulo 1. Fundamentos teóricos de la descentralización', page: 15 },
      { title: 'Capítulo 2. Modelos comparados', page: 78 },
      { title: 'Capítulo 3. El caso colombiano', page: 145 },
      { title: 'Capítulo 4. Retos y perspectivas', page: 220 },
      { title: 'Conclusiones', page: 310 },
      { title: 'Bibliografía', page: 345 },
    ],
    description: 'Esta obra analiza en profundidad los fundamentos jurídicos y políticos de la descentralización territorial en Colombia y América Latina. A través de un riguroso marco teórico y un estudio comparado de modelos internacionales, la autora presenta una investigación que aporta nuevas perspectivas al debate sobre la autonomía de los entes territoriales.\n\nEl libro examina la evolución histórica del principio de descentralización, sus implicaciones constitucionales y las tensiones entre centralismo y autonomía local. Con un enfoque interdisciplinario, la obra articula derecho público, ciencia política y administración pública para ofrecer una visión integral del fenómeno descentralizador.',
    aboutAuthor: 'María Angélica Sánchez Álvarez es profesora asociada de la Facultad de Derecho, Ciencias Políticas y Sociales de la Universidad Nacional de Colombia. Doctora en Derecho Público por la Universidad de París 1 Panthéon-Sorbonne. Investigadora del grupo "Estado y Constitución" clasificado A1 por MinCiencias.',
    targetAudience: 'Especialistas e investigadores en derecho público, ciencia política y administración pública, estudiantes de posgrado.',
    fileSize: '4.2 MB',
    drmType: 'Social DRM',
    ratingAvg: 4.5,
    ratingCount: 18,
    multimediaResources: [
      {
        type: 'mp3',
        title: 'Presentación sonora',
        description: 'Comentario de lectura y contexto académico del título.',
        duration: '08:42',
        size: '7.8 MB',
        provider: 'file',
        mediaUrl: '/media/presentacion-sonora.mp3',
      },
      {
        type: 'mp4',
        title: 'Video de presentación',
        description: 'Introducción audiovisual a los principales aportes de la obra.',
        duration: '03:16',
        size: '42 MB',
        provider: 'file',
        mediaUrl: '/media/video-presentacion.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  {
    id: '2',
    title: 'Mujeres, hombres y cambio social',
    subtitle: 'Perspectivas de género en la sociedad contemporánea',
    author: 'Luz Gabriela Arango',
    coAuthors: ['Mara Viveros Vigoya', 'Rosa Inés Ospina Robledo'],
    coverColor: 'from-amber-100 to-amber-300',
    coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    price: 45000,
    formats: ['printed', 'ebook'],
    formatDetails: [
      { format: 'printed', price: 45000, printStatus: 'available' },
      { format: 'ebook', price: 28000, ebookFormats: ['pdf'] },
    ],
    category: 'Ciencias Sociales',
    collection: 'Biblioteca abierta',
    isNew: true,
    year: 2024,
    pages: 248,
    language: 'Español',
    sede: 'Sede Bogotá',
    edition: 'Segunda edición',
    publishCity: 'Bogotá, Colombia',
    isbnPrint: '978-958-794-330-2',
    isbnPdf: '978-958-794-331-9',
    keywords: ['género', 'sociología', 'feminismo', 'identidad', 'cambio social'],
    classifications: [
      { system: 'BISAC', label: 'Ciencias Sociales / Estudios de género', code: 'SOC032000' },
      { system: 'THEMA', label: 'Estudios de género', code: 'JBSF' },
    ],
    description: 'Una investigación fundamental sobre las transformaciones en las relaciones de género en la sociedad colombiana contemporánea. Las autoras presentan hallazgos empíricos y marcos teóricos innovadores que iluminan las dinámicas de poder, identidad y cambio social.',
    aboutAuthor: 'Luz Gabriela Arango es profesora titular del Departamento de Sociología de la Universidad Nacional de Colombia. Investigadora principal del Centro de Estudios Sociales (CES).',
    ratingAvg: 4.2,
    ratingCount: 24,
  },
  {
    id: '3',
    title: 'La representación del vacío',
    subtitle: 'Arte contemporáneo y ausencia en la obra de Doris Salcedo',
    author: 'Francisco Pérez Muñoz',
    coverColor: 'from-slate-700 to-slate-900',
    coverImage: 'https://images.unsplash.com/photo-1545989253-02cc26577f88?auto=format&fit=crop&w=800&q=80',
    price: 0,
    formats: ['open-access'],
    formatDetails: [{ format: 'open-access' }],
    category: 'Arte y Cultura',
    collection: 'Obra selecta',
    isNew: true,
    year: 2024,
    pages: 196,
    language: 'Español',
    sede: 'Sede Bogotá',
    edition: 'Primera edición',
    doi: '10.15446/unal.arte.2024',
    keywords: ['arte contemporáneo', 'vacío', 'memoria', 'Doris Salcedo', 'escultura'],
    classifications: [
      { system: 'BISAC', label: 'Arte / Crítica e historia del arte', code: 'ART015000' },
      { system: 'Dewey', label: 'Artes plásticas', code: '730' },
    ],
    description: 'Un análisis profundo de la noción de vacío y ausencia en el arte contemporáneo colombiano, con especial énfasis en la obra de Doris Salcedo. El texto explora cómo la representación del vacío se convierte en un poderoso medio de expresión sobre la memoria, la pérdida y la violencia.',
    ratingAvg: 4.8,
    ratingCount: 7,
  },
  {
    id: '4',
    title: 'Cuentos del mundo viviente',
    subtitle: 'Relatos sobre biodiversidad y ecosistemas colombianos',
    author: 'Camila Ernesto López Carrascal',
    coverColor: 'from-sky-400 to-sky-600',
    coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    price: 38000,
    formats: ['printed', 'ebook', 'audiobook'],
    formatDetails: [
      { format: 'printed', price: 38000, printStatus: 'available' },
      { format: 'ebook', price: 22000, ebookFormats: ['pdf', 'epub'] },
      { format: 'audiobook', audioStatus: 'coming-soon' },
    ],
    category: 'Literatura',
    isNew: true,
    year: 2025,
    pages: 180,
    language: 'Español',
    sede: 'Sede Medellín',
    keywords: ['literatura', 'biodiversidad', 'cuentos', 'naturaleza', 'Colombia'],
    description: 'Una colección de relatos que entrelazan ficción literaria con conocimiento científico sobre la biodiversidad colombiana. Cada cuento ilumina un ecosistema diferente, invitando al lector a descubrir la riqueza natural del país.',
    ratingAvg: 4.0,
    ratingCount: 15,
  },
  {
    id: '5',
    title: 'Navegar por hileros y recodos',
    subtitle: 'Geografía fluvial del Pacífico colombiano',
    author: 'Grupo de investigación',
    coAuthors: ['Carlos Andrés Meza', 'Patricia Vargas Silva'],
    coverColor: 'from-emerald-600 to-emerald-800',
    coverImage: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
    price: 55000,
    formats: ['printed'],
    formatDetails: [
      { format: 'printed', price: 55000, printStatus: 'out-of-stock' },
    ],
    category: 'Ciencias',
    isNew: true,
    year: 2023,
    pages: 420,
    language: 'Español',
    sede: 'Sede Bogotá',
    isbnPrint: '978-958-794-340-1',
    keywords: ['geografía', 'Pacífico', 'ríos', 'Colombia', 'ecosistemas'],
    ratingAvg: 3.8,
    ratingCount: 5,
  },
  {
    id: '6',
    title: 'Espacio urbano en la historia',
    subtitle: 'Transformaciones de la ciudad latinoamericana',
    author: 'Felipe López Vargas',
    coverColor: 'from-rose-400 to-rose-600',
    coverImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000f?auto=format&fit=crop&w=800&q=80',
    price: 48000,
    formats: ['printed', 'ebook'],
    formatDetails: [
      { format: 'printed', price: 48000, printStatus: 'coming-soon' },
      { format: 'ebook', price: 30000, ebookFormats: ['epub'] },
    ],
    category: 'Arquitectura',
    collection: 'Historia y memoria',
    year: 2025,
    pages: 310,
    language: 'Español',
    sede: 'Sede Manizales',
    keywords: ['urbanismo', 'historia', 'ciudad', 'Latinoamérica', 'arquitectura'],
    ratingAvg: 4.3,
    ratingCount: 9,
  },
];

export const bestsellerBooks: Book[] = [
  {
    id: '7',
    title: 'Contra el racismo',
    subtitle: 'Movilizaci?n para el cambio social en Am?rica Latina',
    author: 'Krisna Ruette Orihuela',
    coAuthors: ['Peter Wade'],
    coverColor: 'from-stone-300 to-stone-600',
    coverImage: 'https://simehbucket.s3.amazonaws.com/images/eddd43784f33cbf88423343c356cb3dd-large.jpg',
    price: 48000,
    originalPrice: 60000,
    formats: ['printed'],
    formatDetails: [{ format: 'printed', price: 48000, originalPrice: 60000, printStatus: 'available' }],
    category: 'Racismo y discriminaci?n racial',
    collection: 'T?ndem Coediciones',
    isBestseller: true,
    discount: 20,
    year: 2024,
    pages: 285,
    dimensions: '17 x 23 x 2.3 cm',
    language: 'Espa?ol',
    sede: 'Sede Nivel Nacional',
    edition: 'Primera edici?n',
    publishCity: 'Bogot?, Colombia',
    doi: '10.51573/%20Andes.9789587984286.9789587984293',
    isbnPrint: '9789587984286',
    keywords: ['Racismo', 'Lucha', 'Poder', 'Discriminaci?n'],
    classifications: [
      { system: 'BISAC', label: 'CIENCIAS SOCIALES / Sociolog?a / General', code: 'SOC026000' },
      { system: 'THEMA', label: 'Racismo y discriminaci?n racial', code: 'JBFA1' },
      { system: 'Dewey', label: 'Sociolog?a y Antropolog?a / Ciencias Sociales / Sociolog?a y antropolog?a', code: '301' },
    ],
    description: `?Basado en una ambiciosa investigaci?n, Contra el racismo es el producto de una profunda colaboraci?n entre acad?micos radicados en Am?rica Latina y en el Norte global, con diferentes identificaciones raciales y de distintas generaciones... Nos obliga a enfrentar preguntas complejas que no tienen respuestas f?ciles y tendr? un impacto significativo en c?mo se estudian la raza, el racismo y los movimientos antirracistas, no solo en Am?rica Latina sino tambi?n en otras partes del mundo.? - Joanne Rappaport, Universidad de Georgetown

Las narrativas dominantes a menudo describen a las naciones latinoamericanas como fundamentalmente mestizas, lo que ha dificultado reconocer el racismo en la regi?n. Las reformas multiculturales recientes han contribuido al reconocimiento de las identidades y culturas negras e ind?genas. Aunque el multiculturalismo puede centrarse en la identidad y la visibilidad y abordar formas m?s casuales y sociales de racismo, tambi?n puede distraer la atenci?n del racismo estructural y la inequidad racial, y limitar iniciativas antirracistas m?s amplias.

Adicionalmente, las diversas formas de comprender el modo en que el racismo y el antirracismo encajan en proyectos de transformaci?n social los convierten en fen?menos complejos y polifac?ticos. Los ensayos que conforman Contra el racismo examinan actores y pr?cticas de Brasil, Colombia, Ecuador y M?xico que van m?s all? de la pol?tica del reconocimiento y que abordan las inequidades estructurales y los conflictos materiales, para as? tender puentes y construir puntos de encuentro con otros grupos marginados. Las organizaciones estudiadas en el libro abogan por un enfoque de una profunda transformaci?n estructural social que sea incluyente, fomente alianzas y est? inspirado en una visi?n y una imaginaci?n radicales que inspiren la solidaridad y la acci?n colectiva para crear un presente vivible.
`,
    aboutAuthor: `Krisna Ruette Orihuela es antrop?loga y profesora asociada de Justicia Social en la Escuela de Pol?tica Social, Trabajo Social y Justicia Social del University College Dublin.

Peter Wade es antrop?logo social, doctor por la Universidad de Cambridge y profesor en la Universidad de Manchester. Es autor de numerosos libros y art?culos sobre raza, etnicidad y sexualidad en Am?rica Latina.`,
    ratingAvg: 4.7,
    ratingCount: 31,
  },
  {
    id: '8',
    title: 'El derecho frente al poder',
    subtitle: 'Constitucionalismo y democracia en Colombia',
    author: 'Juan Fernando Jaramillo',
    coverColor: 'from-indigo-800 to-indigo-950',
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    price: 80000,
    originalPrice: 95000,
    formats: ['printed', 'ebook'],
    formatDetails: [
      { format: 'printed', price: 80000, originalPrice: 95000, printStatus: 'available' },
      { format: 'ebook', price: 50000, ebookFormats: ['pdf', 'epub'] },
    ],
    category: 'Derecho',
    collection: 'Clásicos del pensamiento',
    isBestseller: true,
    discount: 15,
    year: 2024,
    pages: 520,
    language: 'Español',
    sede: 'Sede Bogotá',
    isbnPrint: '978-958-794-360-9',
    isbnPdf: '978-958-794-361-6',
    isbnEpub: '978-958-794-362-3',
    keywords: ['constitucionalismo', 'democracia', 'poder', 'derecho público'],
    classifications: [
      { system: 'BISAC', label: 'Derecho / Derecho constitucional', code: 'LAW018000' },
      { system: 'THEMA', label: 'Derecho constitucional y administrativo', code: 'LNF' },
    ],
    description: 'Un análisis magistral de las tensiones entre el constitucionalismo y el ejercicio del poder político en Colombia. Esta obra traza la evolución del derecho constitucional colombiano desde sus orígenes hasta los desafíos contemporáneos de la democracia.',
    aboutAuthor: 'Juan Fernando Jaramillo es profesor emérito de la Facultad de Derecho de la Universidad Nacional de Colombia. Ex magistrado auxiliar de la Corte Constitucional.',
    ratingAvg: 4.6,
    ratingCount: 42,
  },
  {
    id: '9',
    title: 'Martha Nussbaum y la justicia compasiva',
    subtitle: 'Emociones, liberalismo político y educación',
    author: 'Iván Alfonso Pinedo Cantillo',
    coverColor: 'from-yellow-600 to-yellow-800',
    coverImage: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80',
    price: 60000,
    formats: ['printed', 'ebook'],
    formatDetails: [
      { format: 'printed', price: 60000, printStatus: 'available' },
      { format: 'ebook', price: 35000, ebookFormats: ['pdf'] },
    ],
    category: 'Filosofía',
    isBestseller: true,
    year: 2024,
    pages: 290,
    language: 'Español',
    sede: 'Sede Bogotá',
    keywords: ['filosofía', 'Nussbaum', 'justicia', 'emociones', 'liberalismo'],
    ratingAvg: 4.1,
    ratingCount: 16,
  },
  {
    id: '10',
    title: 'El Catatumbo: tensiones y prospectiva',
    subtitle: 'Conflicto, territorio y desarrollo en el nororiente colombiano',
    author: 'Luis Humberto Hernández',
    coverColor: 'from-orange-500 to-orange-700',
    coverImage: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=800&q=80',
    price: 33000,
    formats: ['printed'],
    formatDetails: [{ format: 'printed', price: 33000, printStatus: 'available' }],
    category: 'Ciencias Políticas',
    isBestseller: true,
    discount: 20,
    year: 2023,
    pages: 210,
    language: 'Español',
    sede: 'Sede Bogotá',
    keywords: ['Catatumbo', 'conflicto', 'territorio', 'Colombia'],
    ratingAvg: 4.4,
    ratingCount: 22,
  },
  {
    id: '11',
    title: 'Crisis ambiental y cambios globales',
    subtitle: 'Derecho ambiental y derechos de la naturaleza',
    author: 'Gregorio Mesa Cuadros',
    coverColor: 'from-green-700 to-green-900',
    coverImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
    price: 155000,
    formats: ['printed', 'ebook'],
    formatDetails: [
      { format: 'printed', price: 155000, printStatus: 'available' },
      { format: 'ebook', price: 90000, ebookFormats: ['pdf', 'epub'] },
    ],
    category: 'Medio Ambiente',
    collection: 'Medio ambiente',
    isBestseller: true,
    year: 2024,
    pages: 680,
    language: 'Español',
    sede: 'Sede Bogotá',
    keywords: ['medio ambiente', 'crisis ambiental', 'derechos de la naturaleza', 'cambio climático'],
    ratingAvg: 4.3,
    ratingCount: 19,
  },
  {
    id: '12',
    title: 'Las promesas de la paz',
    subtitle: 'Justicia transicional y construcción de memoria',
    author: 'Camilo Alberto Borrero',
    coverColor: 'from-purple-600 to-purple-800',
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80',
    price: 112000,
    formats: ['printed', 'ebook', 'audiobook'],
    formatDetails: [
      { format: 'printed', price: 112000, printStatus: 'available' },
      { format: 'ebook', price: 65000, ebookFormats: ['pdf'] },
      { format: 'audiobook', audioStatus: 'free-listen' },
    ],
    category: 'Ciencias Políticas',
    isBestseller: true,
    year: 2024,
    pages: 450,
    language: 'Español',
    sede: 'Sede Bogotá',
    keywords: ['paz', 'justicia transicional', 'memoria', 'Colombia', 'conflicto'],
    ratingAvg: 4.5,
    ratingCount: 28,
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
