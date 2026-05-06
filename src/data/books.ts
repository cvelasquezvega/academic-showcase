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
    subtitle: 'Análisis de la institución jurídica de la certificación en educación',
    author: 'María Angélica Sánchez Álvarez',
    coverColor: 'from-slate-200 to-slate-400',
    coverImage: 'https://simehbucket.s3.amazonaws.com/images/415ebe2115322046c17eea7182300794-medium.jpg',
    price: 27000,
    formats: ['printed', 'ebook', 'ibd'],
    formatDetails: [
      { format: 'printed', price: 62000, printStatus: 'out-of-stock' },
      { format: 'ebook', price: 27000, ebookFormats: ['epub'] },
      { format: 'ibd', price: 133433 },
    ],
    category: 'Políticas del Gobierno central',
    collection: 'Colección Gerardo Molina',
    isNew: true,
    year: 2026,
    pages: 292,
    dimensions: '17 x 24 x 1.8 cm',
    language: 'Español',
    sede: 'Sede Bogotá',
    edition: 'Primera edición',
    publishCity: 'Bogotá, Colombia',
    doi: '10.15446/edunal.1400',
    isbnPrint: '9789585058835',
    isbnEpub: '9789585058842',
    isbnIbd: '9789585058859',
    keywords: ['descentralización territorial', 'certificación municipal', 'servicio educación', 'influencia', 'mecanismo', 'prestación', 'descentralización'],
    classifications: [
      { system: 'BISAC', label: 'CIENCIAS POLÍTICAS / Globalización', code: 'POL033000' },
      { system: 'THEMA', label: 'Políticas del Gobierno central', code: 'JPQB' },
      { system: 'Dewey', label: 'Sociología y Antropología / Ciencias Políticas / Ciencias Políticas', code: '320' },
    ],
    description: `La investigación tiene el objetivo de conocer la influencia real del mecanismo de la certificación municipal en la prestación del servicio de educación para así determinar si este logró tener una incidencia positiva en los estándares de calidad y cobertura de los municipios certificados respecto de aquellos que no lo están.

En otras palabras, se busca establecer si realmente este mecanismo genera que los municipios adquieran competencias técnicas, administrativas y financieras suficientes para la autogestión de los recursos y el mejoramiento de los niveles de calidad y cobertura en la prestación del servicio público mencionado.

Lo anterior, con base en un análisis integral de la figura de la certificación municipal en educación que involucra un estudio cuantitativo y cualitativo del departamento de Cundinamarca, en especial, de los municipios de Madrid y Facatativá junto con el análisis de diferentes discusiones como: la influencia del sistema económico y político en las estructuras administrativas; la tensión entre los postulados descentralizadores y las tendencias centralizadoras; los factores generales que pueden influir en la calidad y cobertura de la educación y, finalmente, el estudio de la percepción de los estudiantes frente a la calidad de su proceso educativo.`,
    aboutAuthor: 'María Angélica Sánchez Álvarez figura en la publicación como editora general de la obra.',
    fileSize: '8 MB',
    drmType: 'DRM propietario',
    ratingAvg: 4.5,
    ratingCount: 18,
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
    subtitle: 'Movilización para el cambio social en América Latina',
    author: 'Krisna Ruette Orihuela',
    coAuthors: ['Peter Wade'],
    coverColor: 'from-stone-300 to-stone-600',
    coverImage: 'https://simehbucket.s3.amazonaws.com/images/eddd43784f33cbf88423343c356cb3dd-medium.jpg',
    price: 48000,
    originalPrice: 60000,
    formats: ['printed'],
    formatDetails: [{ format: 'printed', price: 48000, originalPrice: 60000, printStatus: 'available' }],
    category: 'Racismo y discriminación racial',
    collection: 'Tándem Coediciones',
    isBestseller: true,
    discount: 20,
    year: 2024,
    pages: 285,
    dimensions: '17 x 23 x 2.3 cm',
    language: 'Español',
    sede: 'Sede Nivel Nacional',
    edition: 'Primera edición',
    publishCity: 'Bogotá, Colombia',
    doi: '10.51573/%20Andes.9789587984286.9789587984293',
    isbnPrint: '9789587984286',
    keywords: ['Racismo', 'Lucha', 'Poder', 'Discriminación'],
    classifications: [
      { system: 'BISAC', label: 'CIENCIAS SOCIALES / Sociología / General', code: 'SOC026000' },
      { system: 'THEMA', label: 'Racismo y discriminación racial', code: 'JBFA1' },
      { system: 'Dewey', label: 'Sociología y Antropología / Ciencias Sociales / Sociología y antropología', code: '301' },
    ],
    description: `«Basado en una ambiciosa investigación, Contra el racismo es el producto de una profunda colaboración entre académicos radicados en América Latina y en el Norte global, con diferentes identificaciones raciales y de distintas generaciones... Nos obliga a enfrentar preguntas complejas que no tienen respuestas fáciles y tendrá un impacto significativo en cómo se estudian la raza, el racismo y los movimientos antirracistas, no solo en América Latina sino también en otras partes del mundo.» - Joanne Rappaport, Universidad de Georgetown

Las narrativas dominantes a menudo describen a las naciones latinoamericanas como fundamentalmente mestizas, lo que ha dificultado reconocer el racismo en la región. Las reformas multiculturales recientes han contribuido al reconocimiento de las identidades y culturas negras e indígenas. Aunque el multiculturalismo puede centrarse en la identidad y la visibilidad y abordar formas más casuales y sociales de racismo, también puede distraer la atención del racismo estructural y la inequidad racial, y limitar iniciativas antirracistas más amplias.

Adicionalmente, las diversas formas de comprender el modo en que el racismo y el antirracismo encajan en proyectos de transformación social los convierten en fenómenos complejos y polifacéticos. Los ensayos que conforman Contra el racismo examinan actores y prácticas de Brasil, Colombia, Ecuador y México que van más allá de la política del reconocimiento y que abordan las inequidades estructurales y los conflictos materiales, para así tender puentes y construir puntos de encuentro con otros grupos marginados. Las organizaciones estudiadas en el libro abogan por un enfoque de una profunda transformación estructural social que sea incluyente, fomente alianzas y esté inspirado en una visión y una imaginación radicales que inspiren la solidaridad y la acción colectiva para crear un presente vivible.
`,
    aboutAuthor: `Krisna Ruette Orihuela es antropóloga y profesora asociada de Justicia Social en la Escuela de Política Social, Trabajo Social y Justicia Social del University College Dublin.

Peter Wade es antropólogo social, doctor por la Universidad de Cambridge y profesor en la Universidad de Manchester. Es autor de numerosos libros y artículos sobre raza, etnicidad y sexualidad en América Latina.`,
    ratingAvg: 4.7,
    ratingCount: 31,
  },
  {
    id: '8',
    title: 'El derecho frente al poder',
    subtitle: 'Surgimiento, desarrollo y crítica del constitucionalismo moderno',
    author: 'Juan Fernando Jaramillo Pérez',
    coAuthors: [
      'Mauricio García Villegas',
      'Andrés Abel Rodríguez Villabona',
      'Rodrigo Uprimny Yepes',
    ],
    coverColor: 'from-indigo-800 to-slate-950',
    coverImage: 'https://simehbucket.s3.amazonaws.com/images/d358c2f3b76d34d9fa80e58a2e75f214-medium.jpg',
    price: 22410,
    formats: ['printed', 'ebook'],
    formatDetails: [
      { format: 'printed', price: 64000, originalPrice: 80000, printStatus: 'out-of-stock' },
      { format: 'ebook', price: 22410, originalPrice: 24900, ebookFormats: ['epub'] },
    ],
    category: 'Constitución: Gobierno y Estado',
    collection: 'Serie Investigación Jurídico-Políticas',
    isBestseller: true,
    year: 2018,
    pages: 976,
    dimensions: '17.5 x 25 x 3.0 cm',
    language: 'Español',
    sede: 'Sede Bogotá',
    edition: 'Primera edición',
    publishCity: 'Bogotá, Colombia',
    isbnPrint: '9789587834468',
    isbnEpub: '9789587834451',
    keywords: ['Constitución', 'derechos', 'libertades', 'Derecho constitucional', 'Carta Otorgada', 'Locke', 'Rousseau', 'Montesquieu', 'Jefferson'],
    classifications: [
      { system: 'BISAC', label: 'LEY / Constitucional', code: 'LAW018000' },
      { system: 'BISAC', label: 'LEY / General', code: 'LAW000000' },
      { system: 'THEMA', label: 'Constitución: Gobierno y Estado', code: 'JPHC' },
      { system: 'Dewey', label: 'Sociología y Antropología / Ley / Derecho constitucional y administrativo', code: '342' },
    ],
    description: `El concepto de constitución es un concepto fronterizo entre lo normativo y lo institucional, por un lado, y el poder y los actores políticos, por el otro. Este carácter híbrido explica muchas de las tensiones interinas del constitucionalismo y también indica la necesidad de asumir una concepción comprensiva e interdisciplinaria para su estudio.

Inspirado en estas ideas, este libro articula el análisis histórico del surgimiento del constitucionalismo moderno de talante liberal, y de la promulgación de las primeras constituciones escritas, con un examen teórico y conceptual sobre su sentido, sus funciones y sus conceptos básicos.

Mientras que el primer proceso, el del surgimiento del constitucionalismo moderno, se dio principalmente en Francia de la segunda mitad del siglo XVI y en Inglaterra durante el siglo XVII, el segundo, la promulgación de las primeras constituciones escritas, inició a finales del siglo XVIII en Estados Unidos y en Francia, extendiéndose después a muchos países, incluyendo los de América Latina, que de todas formas tienen destacables peculiaridades.

Ahora bien, esta delimitación no desconoce los aportes al constitucionalismo desarrollados desde otras perspectivas y experiencias, ni deja de lado los antecedentes que configuran el contexto del surgimiento de este modelo constitucional, al igual que su destino posterior durante el siglo XIX, frente a la reacción del conservadurismo, la crítica democrática y el desafío del socialismo.

El derecho frente al poder es una obra fundamental para el estudio del constitucionalismo porque incluye traducciones originales de textos y documentos jurídico-constitucionales clásicos, ampliamente contextualizadas y anotadas, que son una herramienta extraordinaria de consulta y de apoyo investigativo.`,
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
    title: 'La vivienda',
    subtitle: 'Temporalidades y realidades',
    author: 'Marco Ernesto Cortés Díaz',
    coverColor: 'from-stone-300 to-stone-500',
    coverImage: 'https://simehbucket.s3.amazonaws.com/images/68079111bf0656a1cb72cb3afd0707ed-medium.jpg',
    price: 20000,
    formats: ['ebook'],
    formatDetails: [
      { format: 'ebook', price: 20000, ebookFormats: ['epub'] },
    ],
    category: 'Vivienda y personas sin hogar',
    collection: undefined,
    isBestseller: true,
    year: 2026,
    pages: 93,
    language: 'Español',
    sede: 'Sede Nivel Nacional',
    edition: 'Primera edición',
    publishCity: 'Bogotá, Colombia',
    isbnEpub: '9786285030178',
    keywords: ['vivienda', 'desarrollo urbano', 'derecho inmobiliario', 'personas sin hogar', 'políticas de vivienda', 'asistencia social', 'propiedad', 'arrendamientos'],
    classifications: [
      { system: 'BISAC', label: 'LEY / Vivienda y desarrollo urbano', code: 'LAW047000' },
      { system: 'THEMA', label: 'Vivienda y personas sin hogar', code: 'JBFD' },
      { system: 'Dewey', label: 'Sociología y Antropología / Servicios sociales; asociaciones / Otros problemas y servicios sociales / Alojamiento', code: '363.5' },
    ],
    description: `Este libro ofrece una mirada crítica y reflexiva sobre la vivienda urbana colectiva en América Latina, con especial énfasis en la vivienda de interés social. A través del análisis de tipologías, formas de habitar y transformaciones en el tiempo, el autor cuestiona los modelos heredados de la arquitectura moderna europea, cuyo ideal de vivienda compacta, funcional y rígidamente organizada, mostró limitaciones al ser trasladado a contextos sociales, económicos y culturales profundamente distintos.

El texto plantea que la vivienda, lejos de ser un producto terminado, debe entenderse como un proceso dinámico, atravesado por la apropiación, el crecimiento progresivo y las necesidades cambiantes de sus habitantes. Para demostrarlo, se estudian dos experiencias emblemáticas: Ciudad Bachué, en Bogotá, y el Proyecto Experimental de Vivienda (PREVI), en Lima. Ambos casos revelan cómo los habitantes han resignificado y transformado los espacios originales, creando realidades urbanas que trascienden las premisas del diseño moderno.

Más allá de la revisión histórica y técnica, este libro abre la discusión sobre el futuro de la vivienda social en América Latina, invitando a repensar sus fundamentos desde la flexibilidad, la diversidad y el reconocimiento de las prácticas cotidianas que hacen de la vivienda un espacio vivo.`,
    aboutAuthor: `Arquitecto y magíster en Urbanismo de la Universidad Nacional de Colombia. Ha trabajado como arquitecto proyectista de variados edificios institucionales y educativos, así como de viviendas unifamiliares y de conjuntos cerrados. Asimismo, ha participado en el diseño de espacios públicos y de parques.

Entre sus publicaciones se destacan el libro La anexión de los municipios vecinos a Bogotá en 1954 (2006), de la colección Punto Aparte de la Facultad de Artes, La casa en el edificio: reconocimiento topológico del inquilinato (2022), de la Colección Sin Condición, y varios artículos académicos sobre vivienda y urbanismo.

Actualmente, se desempeña como profesor asociado de tiempo completo en la Escuela de Arquitectura y Urbanismo de la Universidad Nacional de Colombia y es el coordinador de la Maestría en Arquitectura de la Vivienda de la misma universidad.`,
    drmType: 'DRM propietario',
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
    title: 'Le Corbusier y Gottfried Semper',
    subtitle: 'En el espíritu de una época maquinista',
    author: 'José Miguel Mantilla Salgado',
    coverColor: 'from-stone-200 to-stone-400',
    coverImage: 'https://simehbucket.s3.amazonaws.com/images/9642b10f7eea41b0cf16130fcc334817-medium.jpg',
    formats: ['open-access'],
    formatDetails: [
      { format: 'open-access' },
    ],
    category: 'Arquitectos y estudios de arquitectura',
    collection: 'Doctorado en Artes y Arquitectura',
    isBestseller: true,
    year: 2026,
    pages: 332,
    language: 'Español',
    sede: 'Sede Bogotá',
    edition: 'Primera edición',
    publishCity: 'Bogotá, Colombia',
    isbnEpub: '9786285030383',
    keywords: ['Le Corbusier', 'Gottfried Semper', 'arquitectura', 'teoría de la arquitectura', 'historia de la arquitectura', 'diseño arquitectónico', 'arquitectura moderna', 'arquitectura clásica', 'arquitectura del siglo XIX', 'arquitectura del siglo XX'],
    classifications: [
      { system: 'BISAC', label: 'ARQUITECTURA / Arquitectos y empresas individuales / Monografías', code: 'ARC006020' },
      { system: 'THEMA', label: 'Arquitectos y estudios de arquitectura', code: 'AMB' },
      { system: 'Dewey', label: 'Las artes / Arquitectura / Arquitectura', code: '720' },
    ],
    description: `Gottfried Semper (1803-1879) y Le Corbusier (1887-1965) fueron dos arquitectos que optaron por descubrir los fundamentos de la arquitectura por sus propios medios, renunciando a las oportunidades de la formación académica. Gracias a la publicación y a la puesta en práctica de sus descubrimientos, en poco tiempo se convirtieron en dos de los pensadores más influyentes de la cultura arquitectónica de los últimos siglos.

El presente estudio analiza el pensamiento y la obra de Le Corbusier a la luz de las teorías de Semper; sin embargo, también puede leerse como un examen de las teorías de Semper a través de la obra de Le Corbusier. El propósito es indagar, más allá de sus diferencias, para conocer en qué aspectos coincidieron en materia de teorización arquitectónica.

Nos motiva la posibilidad de encontrar indicios del carácter genuino de la arquitectura en el campo, aún poco explorado, que vincula a estos dos destacados personajes.

En el Capítulo 1 se analizan los encuentros de Le Corbusier, durante sus años de formación, con los remanentes del legado teórico de Semper. En el Capítulo 2 se exploran las coincidencias significativas entre los postulados de ambos arquitectos en torno al concepto de estilo. Finalmente, en el Capítulo 3 se examinan aspectos específicos de la obra de Le Corbusier a la luz de las teorías de Semper. Así, el primer capítulo adopta un enfoque histórico; el segundo, un enfoque basado en la teoría del arte y la arquitectura; y el tercero, un enfoque centrado en la crítica del proyecto arquitectónico.`,
    drmType: 'DRM propietario',
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
