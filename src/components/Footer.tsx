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
  <footer className="bg-foreground text-background border-t border-background/10">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading text-sm font-bold">U</span>
            </div>
            <span className="font-heading text-base font-bold">Editorial UN</span>
          </div>
          <p className="font-body text-xs text-background/50 leading-relaxed">
            Publicaciones académicas con rigor editorial al servicio de la investigación, la docencia y la extensión universitaria.
          </p>
        </div>
        {footerSections.map(s => (
          <div key={s.title}>
            <h4 className="font-body text-xs font-bold mb-4 uppercase tracking-widest text-background/70">{s.title}</h4>
            <ul className="space-y-2.5">
              {s.links.map(link => (
                <li key={link}>
                  <a href="#" className="font-body text-sm text-background/50 hover:text-primary transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-background/10 pt-8 text-center">
        <p className="font-body text-xs text-background/30">© 2026 Editorial UN — Universidad Nacional de Colombia. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
