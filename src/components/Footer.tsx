import editorialLogo from '@/assets/logo-editorial_unal.png';

const footerSections = [
  {
    title: 'Atención al usuario',
    links: ['Quejas y reclamos', 'Atención en línea', 'Preguntas frecuentes', 'Notificaciones'],
  },
  {
    title: 'Enlaces de interés',
    links: ['Glosario', 'Estadísticas', 'Protección de datos'],
  },
  {
    title: 'Legal',
    links: ['Régimen legal', 'Contratación', 'Rendición de cuentas'],
  },
];

const Footer = () => (
  <footer className="bg-header-dark text-primary-foreground">
    <div className="container mx-auto px-4 py-14">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        <div>
          <a href="/" aria-label="Ir al inicio de Editorial UNAL" className="mb-4 inline-flex bg-white px-3 py-2">
            <img src={editorialLogo} alt="Editorial UNAL" className="h-10 w-auto object-contain" />
          </a>
          <p className="font-body text-xs text-primary-foreground/50 leading-relaxed font-light">
            Universidad Nacional de Colombia. Publicaciones académicas con rigor editorial al servicio de la investigación, la docencia y la extensión.
          </p>
        </div>
        {footerSections.map(s => (
          <div key={s.title}>
            <h4 className="font-body text-[11px] font-semibold mb-4 uppercase tracking-[0.2em] text-primary-foreground/70">{s.title}</h4>
            <ul className="space-y-2.5">
              {s.links.map(link => (
                <li key={link}>
                  <a href="#" className="font-body text-sm text-primary-foreground/50 hover:text-primary transition-colors font-light">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-primary-foreground/10 pt-6 text-center">
        <p className="font-body text-xs text-primary-foreground/30">© 2026 Editorial UNAL — Universidad Nacional de Colombia. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
