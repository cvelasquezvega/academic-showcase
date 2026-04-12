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
  <footer className="bg-foreground text-card py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading text-xs font-bold">EU</span>
            </div>
            <span className="font-heading text-sm font-bold">Editorial Académica</span>
          </div>
          <p className="font-body text-xs text-card/60 leading-relaxed">
            Publicaciones académicas con rigor editorial al servicio de la investigación, la docencia y la extensión universitaria.
          </p>
        </div>
        {footerSections.map(s => (
          <div key={s.title}>
            <h4 className="font-body text-sm font-bold mb-3">{s.title}</h4>
            <ul className="space-y-2">
              {s.links.map(link => (
                <li key={link}>
                  <a href="#" className="font-body text-xs text-card/60 hover:text-primary transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-card/10 pt-6 text-center">
        <p className="font-body text-xs text-card/40">© 2026 Editorial Académica. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
