const icons = {
  search: `<svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3.5-3.5"></path></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none"><path d="M20 21a8 8 0 0 0-16 0"></path><circle cx="12" cy="8" r="4"></circle></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 21s-6.7-4.5-9.1-8.2A5.4 5.4 0 0 1 12 5.6a5.4 5.4 0 0 1 9.1 7.2C18.7 16.5 12 21 12 21z"></path></svg>`,
  "shopping-cart": `<svg viewBox="0 0 24 24" fill="none"><circle cx="9" cy="20" r="1.4"></circle><circle cx="18" cy="20" r="1.4"></circle><path d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 8H7"></path></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12"></path></svg>`,
  ticket: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 9V6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v3a2 2 0 0 0 0 6v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a2 2 0 0 0 0-6z"></path><path d="M13 5v14"></path></svg>`,
  "chevron-down": `<svg viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6"></path></svg>`,
  "chevron-right": `<svg viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6"></path></svg>`,
  "share-2": `<svg viewBox="0 0 24 24" fill="none"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="M8.6 13.5l6.8 3.9M15.4 6.6L8.6 10.5"></path></svg>`,
  copy: `<svg viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="11" height="11" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
  "external-link": `<svg viewBox="0 0 24 24" fill="none"><path d="M14 3h7v7"></path><path d="M10 14L21 3"></path><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"></path></svg>`,
  leaf: `<svg viewBox="0 0 24 24" fill="none"><path d="M11 20A7 7 0 0 1 4 13C4 6 12 3 20 4c1 8-2 16-9 16Z"></path><path d="M11 20c-1.5-4.5.5-8.5 6-12"></path></svg>`,
  "book-marked": `<svg viewBox="0 0 24 24" fill="none"><path d="M12 17l-4 2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14l-4-2-4 2Z"></path><path d="M8 5H6a2 2 0 0 0-2 2v14l4-2"></path></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"></path></svg>`,
  "book-open": `<svg viewBox="0 0 24 24" fill="none"><path d="M2 3h6a4 4 0 0 1 4 4v14a4 4 0 0 0-4-4H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a4 4 0 0 1 4-4h6z"></path></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
  "file-text": `<svg viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>`,
  "log-in": `<svg viewBox="0 0 24 24" fill="none"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><path d="M10 17l5-5-5-5"></path><path d="M15 12H3"></path></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none"><path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5"></path><path d="M9 17a3 3 0 0 0 6 0"></path></svg>`,
  unlock: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="10" rx="2"></rect><path d="M7 11V8a5 5 0 0 1 9.9-1"></path></svg>`,
  monitor: `<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2"></rect><path d="M8 21h8"></path><path d="M12 17v4"></path></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"></path></svg>`,
  package: `<svg viewBox="0 0 24 24" fill="none"><path d="M16.5 9.4 7.5 4.2"></path><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="M3.3 7 12 12l8.7-5"></path><path d="M12 22V12"></path></svg>`,
  truck: `<svg viewBox="0 0 24 24" fill="none"><path d="M10 17h4V5H2v12h3"></path><path d="M14 8h4l4 4v5h-3"></path><circle cx="7.5" cy="17.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>`,
  smartphone: `<svg viewBox="0 0 24 24" fill="none"><rect x="7" y="2" width="10" height="20" rx="2"></rect><path d="M11 18h2"></path></svg>`,
  headphones: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 13a9 9 0 0 1 18 0"></path><path d="M21 13v4a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2Z"></path><path d="M3 13v4a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2Z"></path></svg>`,
  "alert-triangle": `<svg viewBox="0 0 24 24" fill="none"><path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.1l-8-14a2 2 0 0 0-3.4 0Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5"></path></svg>`,
};

const catalogoSections = [
  { label: "Áreas", items: ["Artes", "Ciencias", "Ciencias agrarias y veterinaria", "Ciencias de la salud", "Ciencias económicas", "Ciencias Humanas y Sociales", "Derecho y ciencias políticas", "Ingeniería", "Literatura"] },
  { label: "Sedes", items: ["Sede Bogotá", "Sede Caribe", "Sede Medellín", "Sede Nivel nacional", "Sede Palmira", "Sede Amazonía", "Sede La Paz", "Sede Manizales"] },
  { label: "Colecciones", items: ["Biblioteca abierta", "Ciencias naturales", "Clásicos del pensamiento", "Colección CES", "Estadísticas e indicadores", "Estudios afrocolombianos", "Geografía y ordenamiento territorial", "Historia y memoria", "Lenguas aborígenes", "Medio ambiente", "Obra selecta", "Salud pública", "Semillas", "Textos universitarios", "Vigilada MinEducación"] },
  { label: "Impreso", items: ["Todos los impresos", "Novedades impresas", "Más vendidos impresos", "Disponibles para envío"] },
  { label: "E-books", items: ["Todos los E-books", "Lectura en línea", "Apps multidispositivo", "EPUB", "Acceso abierto", "Consulta gratuita"] },
  { label: "Impreso bajo demanda", items: ["Catálogo IBD", "Novedades IBD", "Solicitar impresión bajo demanda", "Cómo funciona IBD", "Tiempos de producción"] },
];

const noticiasSections = [
  { label: "Categorías", items: ["Ferias del libro", "Boletines", "Reseñas", "Presentación de libros", "Sede Palmira", "Libros recomendados", "Sede Medellín"] },
  { label: "Temas", items: ["Acceso abierto", "Códice Abierto", "Botánica", "Literatura infantil", "Literatura no ficción", "Fac. Ciencias Humanas", "Fac. Ciencias Agrarias", "Editorial UNAL"] },
];

const allBooks = [
  {
    id: "1",
    title: "El principio de la descentralización territorial",
    author: "María Angélica Sánchez Álvarez",
    category: "Políticas del Gobierno central",
    formats: ["printed", "ebook", "ibd"],
    formatDetails: [
      { format: "printed", price: 62000, printStatus: "out-of-stock" },
      { format: "ebook", price: 27000, ebookFormats: ["epub"] },
      { format: "ibd", price: 133433 },
    ],
  },
  {
    id: "2",
    title: "Mujeres, hombres y cambio social",
    author: "Luz Gabriela Arango",
    category: "Ciencias Sociales",
    formats: ["printed", "ebook"],
    formatDetails: [
      { format: "printed", price: 45000, printStatus: "available" },
      { format: "ebook", price: 28000, ebookFormats: ["pdf"] },
    ],
  },
  {
    id: "3",
    title: "La representación del vacío",
    author: "Francisco Pérez Muñoz",
    category: "Arte y Cultura",
    formats: ["open-access"],
    formatDetails: [{ format: "open-access" }],
  },
  {
    id: "7",
    title: "Contra el racismo",
    author: "Luz Gabriela Arango",
    category: "Ciencias Humanas y Sociales",
    formats: ["printed", "ebook", "open-access"],
    formatDetails: [
      { format: "printed", price: 58000, printStatus: "available" },
      { format: "ebook", price: 32000, ebookFormats: ["epub"] },
      { format: "open-access" },
    ],
  },
];

const product = {
  id: "1",
  title: "El principio de la descentralización territorial",
  subtitle: "Análisis de la institución jurídica de la certificación en educación",
  author: "María Angélica Sánchez Álvarez",
  coAuthors: [],
  coverImage: "https://simehbucket.s3.amazonaws.com/images/415ebe2115322046c17eea7182300794-medium.jpg",
  category: "Políticas del Gobierno central",
  collection: "Colección Gerardo Molina",
  discount: 0,
  formats: ["printed", "ebook", "ibd"],
  formatDetails: [
    { format: "printed", price: 62000, printStatus: "out-of-stock" },
    { format: "ebook", price: 27000, ebookFormats: ["epub"] },
    { format: "ibd", price: 133433 },
  ],
  year: 2026,
  pages: 292,
  dimensions: "17 x 24 x 1.8 cm",
  language: "Español",
  sede: "Sede Bogotá",
  edition: "Primera edición",
  publishCity: "Bogotá, Colombia",
  doi: "10.15446/edunal.1400",
  isbnPrint: "9789585058835",
  isbnEpub: "9789585058842",
  isbnIbd: "9789585058859",
  fileSize: "8 MB",
  drmType: "DRM propietario",
  keywords: ["descentralización territorial", "certificación municipal", "servicio educación", "prestación", "descentralización"],
  classifications: [
    { system: "BISAC", label: "CIENCIAS POLÍTICAS / Globalización", code: "POL033000" },
    { system: "THEMA", label: "Políticas del Gobierno central", code: "JPQB" },
    { system: "Dewey", label: "Sociología y Antropología / Ciencias Políticas / Ciencias Políticas", code: "320" },
  ],
  toc: [
    { title: "Presentación", page: 9 },
    { title: "Marco constitucional de la descentralización", page: 23 },
    { title: "La certificación municipal en educación", page: 67 },
    { title: "Estudio del caso Cundinamarca", page: 121 },
    { title: "Percepción de estudiantes y calidad", page: 201 },
    { title: "Conclusiones", page: 271 },
  ],
  description: `La investigación tiene el objetivo de conocer la influencia real del mecanismo de la certificación municipal en la prestación del servicio de educación para así determinar si este logró tener una incidencia positiva en los estándares de calidad y cobertura de los municipios certificados respecto de aquellos que no lo están.

En otras palabras, se busca establecer si realmente este mecanismo genera que los municipios adquieran competencias técnicas, administrativas y financieras suficientes para la autogestión de los recursos y el mejoramiento de los niveles de calidad y cobertura en la prestación del servicio público mencionado.

Lo anterior, con base en un análisis integral de la figura de la certificación municipal en educación que involucra un estudio cuantitativo y cualitativo del departamento de Cundinamarca, en especial, de los municipios de Madrid y Facatativá junto con el análisis de diferentes discusiones como: la influencia del sistema económico y político en las estructuras administrativas; la tensión entre los postulados descentralizadores y las tendencias centralizadoras; los factores generales que pueden influir en la calidad y cobertura de la educación y, finalmente, el estudio de la percepción de los estudiantes frente a la calidad de su proceso educativo.`,
  aboutAuthor: "María Angélica Sánchez Álvarez figura en la publicación como editora general de la obra.",
  multimediaResources: [
    { type: "youtube", title: "Presentación editorial", description: "Video de lanzamiento de la obra con contexto de investigación.", embedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4" },
    { type: "spotify", title: "Podcast asociado", description: "Conversación sobre descentralización y política educativa.", embedUrl: "https://open.spotify.com/embed/episode/4KxuaAheLCNM48Raj83jV9?utm_source=generator" },
  ],
};

const odsItems = [
  { number: "10", color: "#DF1683", title: "Reducción de las Desigualdades", description: "Impulsa liderazgos inclusivos y equitativos" },
  { number: "11", color: "#F99D26", title: "Ciudades y Comunidades Sostenibles", description: "Aporta al diseño urbano inclusivo, seguro y resiliente" },
  { number: "16", color: "#00689D", title: "Paz, Justicia e Instituciones", description: "Fortalece el Estado de derecho y las instituciones democráticas" },
];

const analyticsVisits = [0, 3, 0, 1, 1, 0, 1, 1, 0, 1, 0, 2, 2, 1, 1, 0, 0, 0, 1, 0, 0, 0, 3, 1, 4, 0, 2, 0, 1, 0];

const formatMeta = {
  printed: { label: "Impreso", colorVar: "--format-print", badgeClass: "badge-print", icon: "book-open" },
  ebook: { label: "E-book", colorVar: "--format-ebook", badgeClass: "badge-ebook", icon: "smartphone" },
  "open-access": { label: "Acceso Abierto", colorVar: "--format-open", badgeClass: "badge-open-access", icon: "unlock" },
  ibd: { label: "IBD", colorVar: "--format-ibd", badgeClass: "badge-ibd", icon: "package" },
  audiobook: { label: "Audiolibro", colorVar: "--format-audio", badgeClass: "badge-audio", icon: "smartphone" },
};

const detailCardTitle = {
  printed: "Características del impreso",
  ebook: "Características del E-book",
  "open-access": "Acceso abierto disponible",
  ibd: "Características del impreso bajo demanda",
  audiobook: "Características del audiolibro",
};

const detailLinkLabel = {
  printed: "Detalles de entrega",
  ebook: "Detalles de lectura",
  "open-access": "Condiciones de acceso",
  ibd: "Detalles de entrega",
  audiobook: "Detalles de escucha",
};

const detailPopover = {
  printed: { title: "Compra de impreso", body: "Recibirás un ejemplar físico. La entrega depende de disponibilidad, preparación del pedido y destino de envío.", note: "Libro físico con envío a domicilio." },
  ebook: { title: "Lectura digital", body: "Puedes leer en navegador web o en apps oficiales para Windows, Mac, iOS y Android. No se envía PDF/EPUB por correo ni queda como descarga directa. No compatible con Linux ni Kindle.", note: "Lee en navegador web o apps multidispositivo." },
  "open-access": { title: "Acceso abierto", body: "Este formato puede abrir un repositorio institucional de acceso abierto o descargar un archivo directo, según la configuración de la obra.", note: "Acceso sin costo desde repositorio o archivo autorizado." },
  ibd: { title: "Impreso bajo demanda", body: "Primero se produce el ejemplar bajo pedido y luego se envía como libro físico. El tiempo total incluye producción más envío según destino.", note: "Producción bajo demanda + envío físico." },
};

let activeMenu = null;
let activeMenuSection = 0;
let mobileMenuOpen = false;
let selectedFormat = "ebook";
let quantity = 1;
let descriptionExpanded = false;
let searchFormat = "all";
const knownAuthorOrcids = {
  "María Angélica Sánchez Álvarez": "0000-0002-4897-7940",
};
const authorPortraits = {
  "María Angélica Sánchez Álvarez": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80",
};

function injectIcons() {
  document.querySelectorAll("[data-icon]").forEach((node) => {
    const key = node.getAttribute("data-icon");
    node.innerHTML = icons[key] || "";
  });
}

function formatPrice(price) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(price);
}

function hslVar(varName, alpha) {
  return alpha === undefined ? `hsl(var(${varName}))` : `hsl(var(${varName}) / ${alpha})`;
}

function getCurrentDetail() {
  return product.formatDetails.find((detail) => detail.format === selectedFormat);
}

function lowestPurchasePrice() {
  return product.formatDetails.map((detail) => detail.price).filter((price) => price && price > 0).sort((a, b) => a - b)[0] || 0;
}

function renderHeaderMenu(menuKey, sectionIndex = 0) {
  const source = menuKey === "catalogo" ? catalogoSections : noticiasSections;
  const root = document.getElementById("megaMenuInner");
  root.innerHTML = `
    <div class="w-[260px] bg-[hsl(var(--background))] border-r border-border/40 flex-shrink-0 py-2">
      ${source.map((section, index) => `
        <button class="w-full flex items-center justify-between px-6 py-3.5 font-nav text-sm text-left transition-all ${index === sectionIndex ? "text-primary font-medium bg-white" : "text-foreground/80 font-light hover:text-foreground hover:bg-white/60"}" data-mega-section="${index}">
          ${section.label}
          <span data-icon="chevron-right" class="h-4 w-4 transition-all ${index === sectionIndex ? "text-primary translate-x-0.5" : "text-muted-foreground/40"}"></span>
        </button>
      `).join("")}
    </div>
    <div class="flex-1 px-10 py-8">
      <div class="grid grid-cols-3 gap-x-10 gap-y-0">
        ${source[sectionIndex].items.map((item) => `
          <a href="#" class="font-nav text-sm text-foreground/70 font-light hover:text-primary transition-colors py-3 border-b border-dashed border-border/40 flex items-center gap-2">
            ${renderFormatIcon(item)}
            ${item}
          </a>
        `).join("")}
      </div>
      ${menuKey === "catalogo" && source[sectionIndex].label === "Colecciones" ? `<a href="#" class="inline-flex items-center gap-1 mt-6 font-nav text-xs font-medium text-primary hover:underline tracking-wide">Ver todas las colecciones <span data-icon="chevron-right" class="h-3 w-3"></span></a>` : ""}
    </div>
  `;
  injectIcons();
  root.querySelectorAll("[data-mega-section]").forEach((button) => {
    button.addEventListener("mouseenter", () => {
      activeMenuSection = Number(button.getAttribute("data-mega-section"));
      renderHeaderMenu(activeMenu, activeMenuSection);
    });
  });
}

function renderFormatIcon(item) {
  if (/impreso/i.test(item)) return `<span data-icon="book-open" class="h-4 w-4 text-format-print"></span>`;
  if (/ebook|e-book|epub|lectura|apps/i.test(item)) return `<span data-icon="smartphone" class="h-4 w-4 text-format-ebook"></span>`;
  if (/abierto|consulta/i.test(item)) return `<span data-icon="unlock" class="h-4 w-4 text-format-open"></span>`;
  if (/demanda|ibd|impresión|producción/i.test(item)) return `<span data-icon="package" class="h-4 w-4 text-format-ibd"></span>`;
  return "";
}

function openMenu(menuKey) {
  activeMenu = menuKey;
  activeMenuSection = 0;
  document.getElementById("desktopMegaMenu").classList.remove("hidden");
  document.getElementById("desktopMegaMenu").classList.add("menu-enter");
  document.querySelectorAll("[data-menu-trigger]").forEach((button) => {
    const active = button.getAttribute("data-menu-trigger") === menuKey;
    button.classList.toggle("menu-active", active);
  });
  document.querySelectorAll("[data-menu-underline]").forEach((line) => {
    const active = line.getAttribute("data-menu-underline") === menuKey;
    line.classList.toggle("menu-active-line", active);
  });
  renderHeaderMenu(menuKey, 0);
}

function closeMenu() {
  activeMenu = null;
  document.getElementById("desktopMegaMenu").classList.add("hidden");
  document.querySelectorAll("[data-menu-trigger]").forEach((button) => button.classList.remove("menu-active"));
  document.querySelectorAll("[data-menu-underline]").forEach((line) => line.classList.remove("menu-active-line"));
}

function renderMobileMenu() {
  const root = document.getElementById("mobileMenuSections");
  root.innerHTML = `
    <div>
      <button class="w-full flex items-center justify-between font-nav text-sm font-medium text-foreground py-3 border-b border-border/60" data-mobile-group="catalogo">
        Catálogo
        <span data-icon="chevron-down" class="h-4 w-4 text-muted-foreground transition-transform" data-mobile-chevron="catalogo"></span>
      </button>
      <div class="py-3 space-y-4 hidden" data-mobile-panel="catalogo">
        ${catalogoSections.map((section) => `
          <div>
            <span class="font-nav text-[11px] font-semibold tracking-widest uppercase text-primary flex items-center gap-1.5 mb-2">${section.label}</span>
            ${section.items.map((item) => `<a href="#" class="flex min-w-0 items-start gap-2 py-1.5 pl-4 font-nav text-sm font-light leading-snug text-foreground/60 hover:text-primary">${renderFormatIcon(item)}<span class="min-w-0 break-words">${item}</span></a>`).join("")}
          </div>
        `).join("")}
      </div>
    </div>
    <a href="#" class="block font-nav text-sm font-medium text-foreground py-3 border-b border-border/60">Librerías UNAL</a>
    <div>
      <button class="w-full flex items-center justify-between font-nav text-sm font-medium text-foreground py-3 border-b border-border/60" data-mobile-group="noticias">
        Noticias
        <span data-icon="chevron-down" class="h-4 w-4 text-muted-foreground transition-transform" data-mobile-chevron="noticias"></span>
      </button>
      <div class="py-3 space-y-4 hidden" data-mobile-panel="noticias">
        ${noticiasSections.map((section) => `
          <div>
            <span class="font-nav text-[11px] font-semibold tracking-widest uppercase text-primary flex items-center gap-1.5 mb-2">${section.label}</span>
            ${section.items.map((item) => `<a href="#" class="block break-words py-1.5 pl-4 font-nav text-sm font-light leading-snug text-foreground/60 hover:text-primary">${item}</a>`).join("")}
          </div>
        `).join("")}
      </div>
    </div>
    <a href="#" class="block font-nav text-sm font-medium text-foreground py-3 border-b border-border/60">Nosotros</a>
  `;
  injectIcons();
}

function renderProduct() {
  const discountPercent = product.discount || 0;
  const coAuthorsText = product.coAuthors && product.coAuthors.length ? ` y ${product.coAuthors.join(", ")}` : "";
  const metaLine = [product.year, product.edition].filter(Boolean).join(" · ");

  ["mobileBookCover", "desktopBookCover"].forEach((id) => {
    const img = document.getElementById(id);
    img.src = product.coverImage;
    img.alt = `Portada de ${product.title}`;
  });

  document.getElementById("mobileCategory").textContent = product.category;
  document.getElementById("mobileTitle").textContent = product.title;
  document.getElementById("mobileSubtitle").textContent = product.subtitle || "";
  document.getElementById("mobileAuthor").textContent = product.author;
  document.getElementById("mobileSede").textContent = product.sede || "";
  document.getElementById("mobileMeta").textContent = metaLine;
  document.getElementById("desktopCategory").textContent = product.category;
  document.getElementById("desktopCollection").textContent = product.collection || "";
  document.getElementById("desktopTitle").textContent = product.title;
  document.getElementById("desktopSubtitle").textContent = product.subtitle || "";
  document.getElementById("desktopAuthor").textContent = product.author;
  document.getElementById("desktopCoauthors").textContent = coAuthorsText;
  document.getElementById("desktopSede").textContent = product.sede || "";
  document.getElementById("desktopYear").textContent = product.year ? `· ${product.year}` : "";
  document.getElementById("desktopEdition").textContent = product.edition ? `· ${product.edition}` : "";
  document.getElementById("breadcrumbCategory").textContent = product.category;
  document.getElementById("breadcrumbTitle").textContent = product.title;
  document.getElementById("openAlexLink").href = `https://doi.org/${product.doi}`;

  if (discountPercent > 0) {
    document.getElementById("mobileDiscountBadge").classList.remove("hidden");
    document.getElementById("desktopDiscountBadge").classList.remove("hidden");
    document.getElementById("mobileDiscountBadge").textContent = `-${discountPercent}%`;
    document.getElementById("desktopDiscountBadge").textContent = `-${discountPercent}%`;
  }

  document.getElementById("availableFormats").innerHTML = product.formats.map((format) => {
    const meta = formatMeta[format];
    return `<span class="badge-format ${meta.badgeClass} text-[10px] gap-1"><span data-icon="${meta.icon}" class="h-3 w-3"></span> ${meta.label}</span>`;
  }).join("");

  document.getElementById("odsItems").innerHTML = odsItems.map((item) => `
    <div class="flex items-center gap-3 px-4 py-3">
      <div class="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg text-white" style="background-color:${item.color}">
        <span class="font-body text-[9px] font-bold uppercase leading-none">ODS</span>
        <span class="font-body text-lg font-bold leading-none">${item.number}</span>
      </div>
      <div class="min-w-0">
        <p class="font-body text-xs font-bold leading-snug" style="color:${item.color}">${item.title}</p>
        <p class="mt-1 font-body text-[11px] leading-relaxed text-muted-foreground">${item.description}</p>
      </div>
    </div>
  `).join("");

  renderAnalytics();
  renderDescription();
  renderToc();
  renderCollaborators();
  renderMultimedia();
  renderKeywords();
  renderClassifications();
  renderBiblio();
  renderFormatButtons();
  renderPurchasePanel();
  injectIcons();
}

function renderAnalytics() {
  const width = 320;
  const height = 130;
  const maxValue = Math.max(...analyticsVisits, 1);
  const points = analyticsVisits.map((value, index) => {
    const x = (index / (analyticsVisits.length - 1)) * width;
    const y = height - (value / maxValue) * (height - 18) - 9;
    return `${x},${y}`;
  }).join(" ");
  const areaPoints = `0,${height} ${points} ${width},${height}`;
  const total = analyticsVisits.reduce((sum, v) => sum + v, 0);
  document.getElementById("totalVisits").textContent = total;
  document.getElementById("analyticsArea").setAttribute("points", areaPoints);
  document.getElementById("analyticsLine").setAttribute("points", points);
  document.getElementById("analyticsGrid").innerHTML = [0, 1, 2, 3].map((step) => {
    const y = 12 + (step * (height - 24)) / 3;
    return `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="rgba(60, 90, 130, 0.12)" stroke-dasharray="3 5"></line>`;
  }).join("");
}

function renderDescription() {
  const node = document.getElementById("descriptionText");
  const fade = document.getElementById("descriptionFade");
  const button = document.getElementById("descriptionToggle");
  const shouldClamp = product.description.length > 520;
  node.textContent = product.description;
  node.classList.toggle("desc-clamped", shouldClamp && !descriptionExpanded);
  fade.classList.toggle("hidden", !(shouldClamp && !descriptionExpanded));
  button.classList.toggle("hidden", !shouldClamp);
  button.textContent = descriptionExpanded ? "Ver menos" : "Leer más";
}

function renderToc() {
  document.getElementById("tocList").innerHTML = product.toc.map((item, i) => `
    <div class="flex items-center justify-between py-2 border-b border-border/50 ${i === product.toc.length - 1 ? "last:border-0" : ""}">
      <span class="font-body text-sm text-foreground/80 font-light">${item.title}</span>
      <span class="font-body text-xs text-muted-foreground">${item.page}</span>
    </div>
  `).join("");
}

function renderCollaborators() {
  const collaborators = [{ name: product.author, role: "Autoría", bio: product.aboutAuthor }, ...(product.coAuthors || []).map((name) => ({ name, role: "Coautoría", bio: "" }))];
  document.getElementById("collaboratorsList").innerHTML = collaborators.map((person) => {
    const initials = person.name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
    const portrait = authorPortraits[person.name] || "";
    const orcid = knownAuthorOrcids[person.name] || "";
    return `
      <div class="border border-border bg-background/80 p-4 shadow-sm">
        <div class="flex flex-col gap-4 sm:flex-row">
          <div class="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden bg-primary/10 font-heading text-xl font-bold text-primary">
            <span aria-hidden="true">${initials}</span>
            ${portrait ? `<img src="${portrait}" alt="Imagen de perfil de ${person.name}" class="absolute inset-0 h-full w-full object-cover" loading="lazy">` : ""}
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 class="font-heading text-xl font-bold leading-tight text-foreground">${person.name}</h3>
                <p class="mt-1 font-body text-sm text-muted-foreground">Nombre invertido: <span class="font-semibold text-foreground">${invertName(person.name)}</span></p>
                ${orcid ? `<a href="https://orcid.org/${orcid}" target="_blank" rel="noopener noreferrer" class="mt-3 inline-flex items-center gap-2 rounded-md bg-[#009A6E] px-3 py-1.5 font-body text-xs font-bold tracking-wide text-white transition-colors hover:bg-[#007F5C]"><span data-icon="globe" class="h-3.5 w-3.5"></span>${orcid}<span data-icon="external-link" class="h-3 w-3"></span></a>` : ""}
              </div>
              <span class="rounded-full bg-primary/10 px-4 py-1.5 font-body text-[10px] font-bold uppercase tracking-[0.16em] text-primary">${person.role}</span>
            </div>
            <div class="mt-4 border-t border-border pt-3">
              <p class="font-body text-[11px] font-bold uppercase tracking-[0.16em] text-foreground">Biografía</p>
              <p class="mt-2 font-body text-sm leading-relaxed text-foreground/75">${person.bio || "Perfil académico asociado a esta publicación."}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function invertName(name) {
  const parts = name.trim().split(/\s+/);
  if (parts.length < 2) return name;
  return `${parts.slice(-1).join(" ")}, ${parts.slice(0, -1).join(" ")}`;
}

function renderMultimedia() {
  document.getElementById("multimediaCards").innerHTML = product.multimediaResources.map((item) => {
    if (item.type === "youtube") {
      return `
        <div class="overflow-hidden border border-border bg-card shadow-sm">
          <div class="border-b border-border px-4 py-3">
            <p class="font-body text-sm font-semibold leading-snug text-foreground">${item.title}</p>
            <p class="mt-1 font-body text-[11px] leading-relaxed text-muted-foreground">${item.description}</p>
          </div>
          <div class="aspect-video w-full bg-foreground">
            <iframe title="${item.title}" src="${item.embedUrl}" class="h-full w-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
          </div>
        </div>
      `;
    }
    return `
      <div class="overflow-hidden border border-border bg-card shadow-sm">
        <div class="border-b border-border px-4 py-3">
          <p class="font-body text-sm font-semibold leading-snug text-foreground">${item.title}</p>
          <p class="mt-1 font-body text-[11px] leading-relaxed text-muted-foreground">${item.description}</p>
        </div>
        <iframe title="${item.title}" src="${item.embedUrl}" class="h-[232px] w-full border-0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </div>
    `;
  }).join("");
}

function renderKeywords() {
  document.getElementById("keywordsList").innerHTML = product.keywords.map((kw) => `<span class="font-body text-xs text-foreground/70 bg-muted px-3 py-1 hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors">${kw}</span>`).join("");
}

function renderClassifications() {
  document.getElementById("classificationsList").innerHTML = product.classifications.map((cl) => `
    <div class="flex items-start gap-3 px-4 py-2.5">
      <span class="font-body text-xs text-muted-foreground font-medium w-[140px] flex-shrink-0">${cl.system}</span>
      <span class="min-w-0 flex-1 font-body text-xs text-foreground/80 font-light">${cl.label}</span>
      <span class="font-body text-xs text-muted-foreground font-light">${cl.code}</span>
    </div>
  `).join("");
}

function renderBiblio() {
  const items = [
    ["Idioma", product.language],
    ["Páginas", `${product.pages} pp.`],
    ["Dimensiones", product.dimensions],
    ["Edición", product.edition],
    ["Ciudad", product.publishCity],
    ["ISBN Impreso", product.isbnPrint],
    ["ISBN EPUB", product.isbnEpub],
    ["ISBN IBD", product.isbnIbd],
    ["DOI", product.doi],
    ["Colección", product.collection],
  ];

  document.getElementById("biblioGrid").innerHTML = items.map(([label, value]) => `
    <div class="border border-border bg-background p-3">
      <span class="font-body text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-semibold block mb-1">${label}</span>
      <span class="font-body text-xs text-foreground">${value}</span>
    </div>
  `).join("");
}

function renderFormatButtons() {
  document.getElementById("formatButtons").innerHTML = product.formats.map((format) => {
    const meta = formatMeta[format];
    const isSelected = selectedFormat === format;
    const detail = product.formatDetails.find((item) => item.format === format);
    const price = detail && detail.price > 0 ? formatPrice(detail.price) : (format === "open-access" ? "Sin costo" : "—");
    const formatColor = hslVar(meta.colorVar);
    const formatSoftColor = hslVar(meta.colorVar, "0.08");
    const selectedColor = hslVar(meta.colorVar, "0.18");
    return `
      <button data-format="${format}" aria-pressed="${isSelected}" class="relative min-h-[60px] overflow-hidden border px-2.5 py-2 text-left transition-all hover:-translate-y-0.5 hover:shadow-sm ${isSelected ? "shadow-sm ring-1" : "border-border bg-card hover:border-foreground/30"}" style="${isSelected ? `border-color:${formatColor};background-color:${selectedColor};--tw-ring-color:${formatColor}` : `background-color:${formatSoftColor}`}">
        <span class="absolute left-0 top-0 h-1.5 w-full" style="background-color:${formatColor};opacity:${isSelected ? 1 : 0.45}"></span>
        <span class="flex items-start gap-2">
          <span class="flex min-w-0 items-start gap-1.5">
            <span data-icon="${meta.icon}" class="mt-0.5 h-3 w-3 flex-shrink-0" style="color:${formatColor}"></span>
            <span class="min-w-0">
              <span class="font-body text-[11px] font-semibold block leading-tight whitespace-normal break-words ${isSelected ? "text-foreground" : "text-foreground/75"}">${meta.label}</span>
              <span class="font-body text-[10px] block mt-0.5 whitespace-normal ${isSelected ? "font-medium text-muted-foreground" : "text-muted-foreground font-light"}">${price}</span>
            </span>
          </span>
        </span>
      </button>
    `;
  }).join("");
}

function getStateForFormat() {
  const detail = getCurrentDetail();
  const isOpenAccess = selectedFormat === "open-access";
  const isPrinted = selectedFormat === "printed";
  const isEbook = selectedFormat === "ebook";
  const isIBD = selectedFormat === "ibd";
  const isOutOfStock = isPrinted && detail && detail.printStatus === "out-of-stock";
  const isComingSoon = isPrinted && detail && detail.printStatus === "coming-soon";
  const currentPrice = detail && detail.price ? detail.price : 0;
  const currentOriginalPrice = 0;
  return { detail, isOpenAccess, isPrinted, isEbook, isIBD, isOutOfStock, isComingSoon, currentPrice, currentOriginalPrice };
}

function renderPurchasePanel() {
  const { detail, isOpenAccess, isPrinted, isEbook, isIBD, isOutOfStock, isComingSoon, currentPrice } = getStateForFormat();
  const meta = formatMeta[selectedFormat];
  const currentFormatColor = hslVar(meta.colorVar);
  const currentFormatSoftColor = hslVar(meta.colorVar, "0.08");

  const priceBox = document.getElementById("priceBox");
  if (currentPrice > 0) {
    priceBox.innerHTML = `
      <div class="flex flex-wrap items-baseline gap-2">
        <span class="font-body text-2xl font-bold tracking-wide" style="color:${currentFormatColor}">${formatPrice(currentPrice)}</span>
        <span class="font-body text-xs text-muted-foreground font-light">COP</span>
      </div>
    `;
  } else if (isOpenAccess) {
    priceBox.innerHTML = "";
  }

  document.getElementById("quantityBox").classList.toggle("hidden", !((isPrinted || isIBD) && !isOutOfStock && !isComingSoon));

  const ctaArea = document.getElementById("ctaArea");
  if (isOpenAccess) {
    ctaArea.innerHTML = `
      <div class="space-y-2">
        <button class="inline-flex items-center justify-center w-full h-10 px-4 py-2 font-body font-semibold hover:opacity-90 text-white uppercase text-sm tracking-[0.08em]" style="background-color:${currentFormatColor}">
          <span data-icon="unlock" class="h-4 w-4 mr-2"></span> Abrir acceso
        </button>
        <div class="border border-[hsl(var(--format-open)/0.18)] bg-[hsl(var(--format-open)/0.06)] px-3 py-2">
          <p class="font-body text-[10px] font-bold uppercase tracking-[0.14em] text-[hsl(var(--format-open))]">Qué recibes</p>
          <p class="mt-1 font-body text-xs font-medium leading-relaxed text-foreground/80">Abre un repositorio institucional o un archivo autorizado, según la configuración de esta obra.</p>
        </div>
      </div>
    `;
  } else if (isOutOfStock) {
    ctaArea.innerHTML = `
      <div class="space-y-2">
        <button disabled class="inline-flex items-center justify-center w-full h-10 px-4 py-2 font-body font-semibold bg-muted text-muted-foreground uppercase text-sm tracking-[0.08em]">
          <span data-icon="alert-triangle" class="h-4 w-4 mr-2"></span> Sin stock
        </button>
        <button id="notifyToggle" class="inline-flex items-center justify-center w-full h-10 px-4 py-2 font-body font-semibold uppercase text-sm tracking-[0.08em] border" style="border-color:${currentFormatColor};color:${currentFormatColor}">
          <span data-icon="bell" class="h-4 w-4 mr-2"></span> Avíseme disponibilidad
        </button>
        <div id="notifyForm" class="overflow-hidden hidden">
          <div class="flex gap-2">
            <input type="email" placeholder="tu@email.com" class="flex-1 px-3 py-2 border border-border font-body text-sm font-light focus:border-primary outline-none transition-colors">
            <button class="inline-flex items-center justify-center h-9 px-4 bg-primary text-primary-foreground font-body font-medium text-xs">Enviar</button>
          </div>
        </div>
      </div>
    `;
  } else if (isComingSoon) {
    ctaArea.innerHTML = `
      <button disabled class="inline-flex items-center justify-center w-full h-10 px-4 py-2 font-body font-semibold bg-muted text-muted-foreground uppercase text-sm tracking-[0.08em]">
        <span data-icon="clock" class="h-4 w-4 mr-2"></span> Próximamente
      </button>
    `;
  } else {
    const label = isIBD ? "Solicitar impresión" : "Agregar al carrito";
    ctaArea.innerHTML = `
      <button class="inline-flex items-center justify-center w-full h-10 px-4 py-2 font-body font-semibold bg-primary hover:bg-primary/90 text-primary-foreground uppercase text-sm tracking-[0.08em]">
        <span data-icon="${isIBD ? "package" : "shopping-cart"}" class="h-4 w-4 mr-2"></span> ${label}
      </button>
    `;
  }

  const detailCard = document.getElementById("detailCard");
  detailCard.style.borderColor = hslVar(meta.colorVar, "0.18");
  detailCard.style.backgroundColor = currentFormatSoftColor;
  detailCard.innerHTML = `
    <span class="font-body text-[10px] tracking-[0.16em] uppercase font-bold block mb-2" style="color:${currentFormatColor}">
      ${detailCardTitle[selectedFormat]}
    </span>
    <div class="grid grid-cols-2 gap-2">
      ${detailItemsForCurrentFormat(selectedFormat).map((item) => `
        <div class="flex items-start gap-2">
          <span data-icon="${item.icon}" class="h-3 w-3 mt-0.5 flex-shrink-0" style="color:${currentFormatColor}"></span>
          <div>
            <span class="font-body text-[10px] text-muted-foreground block leading-tight">${item.label}</span>
            <span class="font-body text-[11px] font-semibold text-foreground block leading-snug">${item.value}</span>
          </div>
        </div>
      `).join("")}
    </div>
    <div class="mt-3 bg-card/80 border border-white/70 px-3 py-2 shadow-sm">
      <p class="font-body text-[11px] text-muted-foreground font-light leading-relaxed">${detailPopover[selectedFormat].note}</p>
      <button class="mt-1 font-body text-[11px] font-semibold hover:underline" style="color:${currentFormatColor}" title="${detailPopover[selectedFormat].title}: ${detailPopover[selectedFormat].body}">
        ${detailLinkLabel[selectedFormat]}
      </button>
    </div>
  `;

  document.getElementById("benefitsList").innerHTML = benefitsForCurrentFormat(selectedFormat).map((benefit) => `
    <li class="flex items-center gap-2 font-body text-xs text-foreground/80 font-light">
      <span data-icon="${benefit.icon}" class="h-3 w-3 text-primary flex-shrink-0"></span> ${benefit.text}
    </li>
  `).join("");

  document.getElementById("mobileStickyPrice").textContent = currentPrice > 0 ? `Desde ${formatPrice(lowestPurchasePrice())}` : "Acceso abierto";
  injectIcons();

  const notifyToggle = document.getElementById("notifyToggle");
  if (notifyToggle) {
    notifyToggle.addEventListener("click", () => {
      document.getElementById("notifyForm").classList.toggle("hidden");
      notifyToggle.style.backgroundColor = document.getElementById("notifyForm").classList.contains("hidden") ? "" : currentFormatSoftColor;
    });
  }
}

function detailItemsForCurrentFormat(format) {
  if (format === "ebook") {
    return [
      { icon: "monitor", label: "Versión digital", value: "EPUB" },
      { icon: "file-text", label: "Tamaño", value: product.fileSize },
      { icon: "shield", label: "Tipo de DRM", value: product.drmType },
      { icon: "book-open", label: "Págs. orientativas", value: `~${product.pages} pp.` },
    ];
  }
  if (format === "ibd") {
    return [
      { icon: "book-open", label: "Encuadernación", value: "Rústica bajo demanda" },
      { icon: "file-text", label: "Páginas", value: `${product.pages} pp.` },
      { icon: "package", label: "Dimensiones", value: product.dimensions },
      { icon: "truck", label: "Entrega", value: "15 a 21 días hábiles" },
    ];
  }
  if (format === "printed") {
    return [
      { icon: "book-open", label: "Encuadernación", value: "Rústica" },
      { icon: "file-text", label: "Páginas", value: `${product.pages} pp.` },
      { icon: "package", label: "Dimensiones", value: product.dimensions },
      { icon: "truck", label: "Disponibilidad", value: "Sujeta a inventario" },
    ];
  }
  return [
    { icon: "unlock", label: "Acceso", value: "Consulta abierta" },
    { icon: "monitor", label: "Lectura", value: "Web" },
    { icon: "shield", label: "Costo", value: "Sin pago" },
    { icon: "book-open", label: "Págs. orientativas", value: `~${product.pages} pp.` },
  ];
}

function benefitsForCurrentFormat(format) {
  if (format === "ebook") {
    return [
      { icon: "check", text: "Acceso en navegador y app oficial" },
      { icon: "check", text: "Apps para Windows, Mac, iOS y Android" },
      { icon: "check", text: `${product.drmType} - acceso personal en plataforma` },
      { icon: "check", text: "Lectura en navegador y apps multidispositivo" },
    ];
  }
  if (format === "printed") {
    return [
      { icon: "truck", text: "Envío a todo Colombia — 5-7 días hábiles" },
      { icon: "check", text: "Libro físico con acabado editorial" },
      { icon: "shield", text: "Pago seguro con cifrado SSL" },
    ];
  }
  if (format === "ibd") {
    return [
      { icon: "clock", text: "Producción 10-15 días hábiles" },
      { icon: "check", text: "Impresión de alta calidad bajo demanda" },
      { icon: "shield", text: "Pago seguro con cifrado SSL" },
    ];
  }
  return [
    { icon: "check", text: "Consulta sin costo" },
    { icon: "check", text: "Repositorio o archivo directo" },
    { icon: "check", text: "Los demás formatos pueden seleccionarse aparte" },
  ];
}

function renderSearchFilters() {
  const filters = [
    { key: "all", label: "Todos", icon: "search" },
    { key: "open-access", label: "Acceso Abierto", icon: "unlock" },
    { key: "ebook", label: "eBooks", icon: "smartphone" },
    { key: "printed", label: "Impresos", icon: "book-open" },
    { key: "audiobook", label: "Audiolibros", icon: "smartphone" },
    { key: "ibd", label: "Bajo Demanda", icon: "package" },
  ];
  document.getElementById("searchFormatFilters").innerHTML = filters.map((filter) => `
    <button data-search-format="${filter.key}" class="inline-flex items-center gap-1.5 font-body text-xs font-semibold px-3 py-1.5 border transition-all ${searchFormat === filter.key ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"}">
      <span data-icon="${filter.icon}" class="h-3.5 w-3.5"></span>
      ${filter.label}
    </button>
  `).join("");
  injectIcons();
}

function renderSearchResults() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const resultsRoot = document.getElementById("searchResults");
  const reset = document.getElementById("searchReset");
  reset.classList.toggle("hidden", !(query || searchFormat !== "all"));
  const filtered = allBooks.filter((book) => {
    const matchesQuery = !query || book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query) || book.category.toLowerCase().includes(query);
    const matchesFormat = searchFormat === "all" || book.formats.includes(searchFormat);
    return matchesQuery && matchesFormat;
  });

  if (!query && searchFormat === "all") {
    const popular = ["Derechos humanos", "Crisis ambiental", "Literatura colombiana", "Arquitectura urbana", "Salud pública", "Acceso abierto"];
    resultsRoot.innerHTML = `
      <div class="p-6">
        <p class="font-body text-[11px] font-bold tracking-widest uppercase text-muted-foreground mb-3">Búsquedas populares</p>
        <div class="flex flex-wrap gap-2">
          ${popular.map((term) => `<button class="font-body text-xs text-foreground border border-border px-3 py-1.5 hover:border-primary hover:text-primary transition-colors" data-popular-term="${term}">${term}</button>`).join("")}
        </div>
        <div class="mt-6 p-4 bg-primary-light/30 border border-primary/10">
          <p class="font-body text-sm text-muted-foreground"><strong class="text-foreground">Consejo:</strong> Puedes filtrar por formato usando las etiquetas de arriba o escribir directamente "acceso abierto", "ebook" o "impreso" en tu búsqueda.</p>
        </div>
      </div>
    `;
    resultsRoot.querySelectorAll("[data-popular-term]").forEach((button) => {
      button.addEventListener("click", () => {
        document.getElementById("searchInput").value = button.getAttribute("data-popular-term");
        renderSearchResults();
      });
    });
    return;
  }

  if (!filtered.length) {
    resultsRoot.innerHTML = `
      <div class="p-8 text-center">
        <p class="font-body text-sm text-muted-foreground">No se encontraron resultados.</p>
        <p class="font-body text-xs text-muted-foreground mt-1">Intenta con otros términos o ajusta el filtro.</p>
      </div>
    `;
    return;
  }

  resultsRoot.innerHTML = `
    <p class="font-body text-[11px] font-bold tracking-widest uppercase text-muted-foreground px-6 pt-4 pb-2">${filtered.length} resultado${filtered.length !== 1 ? "s" : ""}</p>
    ${filtered.slice(0, 8).map((book) => {
      const lowestPrice = book.formatDetails.map((detail) => detail.price).filter((price) => price && price > 0).sort((a, b) => a - b)[0];
      const singleActionFormat = book.formats.find((format) => format !== "audiobook") || book.formats[0];
      const meta = formatMeta[singleActionFormat];
      return `
        <div class="search-result-row flex items-center gap-4 px-6 py-3 hover:bg-primary-light/30 transition-colors border-b border-border/50">
          <img src="${book.id === product.id ? product.coverImage : product.coverImage}" alt="" class="w-12 h-16 flex-shrink-0 object-cover">
          <div class="flex-1 min-w-0">
            <h4 class="font-body text-sm font-semibold text-foreground truncate">${book.title}</h4>
            <p class="font-body text-xs text-muted-foreground">${book.author}</p>
            <div class="flex flex-wrap gap-1 mt-1">
              ${book.formats.map((format) => `<span class="badge-format text-[10px] gap-1 ${formatMeta[format].badgeClass}"><span data-icon="${formatMeta[format].icon}" class="h-3 w-3"></span> ${formatMeta[format].label}</span>`).join("")}
            </div>
          </div>
          <div class="flex-shrink-0 text-right">
            ${lowestPrice ? `<span class="font-body text-sm font-bold text-foreground block">Desde ${formatPrice(lowestPrice)}</span>` : ""}
            <button class="inline-flex items-center justify-center font-body text-[11px] font-semibold h-7 px-2.5 mt-1 bg-[#2B303B] text-white hover:bg-[#1f232b]">
              <span data-icon="${meta.icon}" class="h-3 w-3 mr-1"></span> Ver opciones
            </button>
          </div>
        </div>
      `;
    }).join("")}
  `;
  injectIcons();
}

function togglePanel(panelId, chevronId) {
  const panel = document.getElementById(panelId);
  const chevron = document.getElementById(chevronId);
  panel.classList.toggle("hidden");
  chevron.classList.toggle("rotate-open");
  if (!panel.classList.contains("hidden")) panel.classList.add("panel-enter");
}

function openSearch() {
  document.getElementById("searchOverlay").classList.remove("hidden");
  document.getElementById("searchOverlay").classList.add("overlay-enter");
  document.body.classList.add("overlay-open");
  renderSearchFilters();
  renderSearchResults();
  setTimeout(() => document.getElementById("searchInput").focus(), 50);
}

function closeSearch() {
  document.getElementById("searchOverlay").classList.add("hidden");
  document.body.classList.remove("overlay-open");
}

function openRedeem() {
  document.getElementById("redeemOverlay").classList.remove("hidden");
  document.body.classList.add("overlay-open");
}

function closeRedeem() {
  document.getElementById("redeemOverlay").classList.add("hidden");
  document.body.classList.remove("overlay-open");
}

function toggleMobileMenu() {
  mobileMenuOpen = !mobileMenuOpen;
  document.getElementById("mobileMenu").classList.toggle("hidden", !mobileMenuOpen);
  document.body.classList.toggle("menu-open", mobileMenuOpen);
  document.getElementById("mobileMenuToggle").setAttribute("aria-label", mobileMenuOpen ? "Cerrar menú" : "Abrir menú");
  document.getElementById("mobileMenuIcon").setAttribute("data-icon", mobileMenuOpen ? "x" : "menu");
  injectIcons();
}

async function sharePage() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    window.alert("Enlace copiado");
  } catch (error) {
    window.alert(window.location.href);
  }
}

function bindEvents() {
  document.querySelectorAll("[data-menu-trigger]").forEach((button) => {
    button.addEventListener("mouseenter", () => openMenu(button.getAttribute("data-menu-trigger")));
  });
  document.getElementById("siteHeader").addEventListener("mouseleave", () => {
    if (window.innerWidth >= 1024) closeMenu();
  });
  document.addEventListener("click", (event) => {
    if (window.innerWidth >= 1024 && activeMenu && !document.getElementById("siteHeader").contains(event.target)) {
      closeMenu();
    }
  });

  renderMobileMenu();
  document.getElementById("mobileMenuToggle").addEventListener("click", toggleMobileMenu);
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-mobile-group]");
    if (!trigger) return;
    const key = trigger.getAttribute("data-mobile-group");
    const panel = document.querySelector(`[data-mobile-panel="${key}"]`);
    const chevron = document.querySelector(`[data-mobile-chevron="${key}"]`);
    panel.classList.toggle("hidden");
    chevron.classList.toggle("rotate-open");
  });

  ["openSearchDesktop", "openSearchMobile", "openSearchQuick"].forEach((id) => document.getElementById(id).addEventListener("click", openSearch));
  document.getElementById("closeSearch").addEventListener("click", closeSearch);
  document.getElementById("searchOverlay").addEventListener("click", (event) => {
    if (event.target.id === "searchOverlay") closeSearch();
  });
  document.getElementById("searchInput").addEventListener("input", renderSearchResults);
  document.getElementById("searchReset").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    searchFormat = "all";
    renderSearchFilters();
    renderSearchResults();
  });
  document.getElementById("searchFormatFilters").addEventListener("click", (event) => {
    const button = event.target.closest("[data-search-format]");
    if (!button) return;
    searchFormat = button.getAttribute("data-search-format");
    renderSearchFilters();
    renderSearchResults();
  });

  ["openRedeemTop", "openRedeemQuick"].forEach((id) => document.getElementById(id).addEventListener("click", openRedeem));
  document.getElementById("closeRedeem").addEventListener("click", closeRedeem);
  document.getElementById("redeemBackdrop").addEventListener("click", closeRedeem);

  document.getElementById("descriptionToggle").addEventListener("click", () => {
    descriptionExpanded = !descriptionExpanded;
    renderDescription();
  });

  document.getElementById("tocToggle").addEventListener("click", () => togglePanel("tocPanel", "tocChevron"));
  document.getElementById("collaboratorsToggle").addEventListener("click", () => togglePanel("collaboratorsPanel", "collaboratorsChevron"));
  document.getElementById("multimediaToggle").addEventListener("click", () => togglePanel("multimediaPanel", "multimediaChevron"));
  document.getElementById("biblioToggle").addEventListener("click", () => togglePanel("biblioPanel", "biblioChevron"));

  document.getElementById("formatButtons").addEventListener("click", (event) => {
    const button = event.target.closest("[data-format]");
    if (!button) return;
    selectedFormat = button.getAttribute("data-format");
    renderFormatButtons();
    renderPurchasePanel();
  });
  document.getElementById("decreaseQty").addEventListener("click", () => {
    quantity = Math.max(1, quantity - 1);
    document.getElementById("qtyValue").textContent = quantity;
  });
  document.getElementById("increaseQty").addEventListener("click", () => {
    quantity += 1;
    document.getElementById("qtyValue").textContent = quantity;
  });

  ["shareBreadcrumb", "shareSidebar"].forEach((id) => document.getElementById(id).addEventListener("click", sharePage));
  document.getElementById("mobileStickyButton").addEventListener("click", () => {
    document.getElementById("purchase-options").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSearch();
      closeRedeem();
      if (mobileMenuOpen) toggleMobileMenu();
    }
  });

  const updateSticky = () => {
    const sticky = document.getElementById("mobileStickyCta");
    if (window.innerWidth >= 768) {
      sticky.classList.remove("sticky-visible");
      return;
    }
    sticky.classList.toggle("sticky-visible", window.scrollY > 520);
  };
  window.addEventListener("scroll", updateSticky, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024 && mobileMenuOpen) toggleMobileMenu();
    updateSticky();
  });
  updateSticky();
}

injectIcons();
renderProduct();
bindEvents();
