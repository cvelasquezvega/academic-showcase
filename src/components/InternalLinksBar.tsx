import { motion } from 'framer-motion';

const links = [
  {
    label: 'Portal de Revistas',
    badge: 'UNAL',
    href: 'https://revistas.unal.edu.co/',
  },
  {
    label: 'Repositorio',
    badge: 'UNAL',
    href: 'https://repositorio.unal.edu.co/',
  },
  {
    label: 'Programa:',
    sublabel: 'Entre Libros',
    href: '#entre-libros',
  },
];

const InternalLinksBar = () => (
  <section className="bg-primary-light/40 py-10 md:py-14">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        {links.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-baseline gap-2 group transition-opacity hover:opacity-70"
          >
            {link.sublabel ? (
              /* Programa: Entre Libros — italic style */
              <span className="font-heading text-xl md:text-2xl font-bold text-primary italic leading-tight">
                {link.label}<br />
                <span className="not-italic">{link.sublabel}</span>
              </span>
            ) : (
              /* Portal de Revistas UNAL / Repositorio UNAL */
              <span className="flex items-center gap-2">
                <span className="font-body text-lg md:text-xl font-light text-primary">{link.label}</span>
                {link.badge && (
                  <span className="font-nav text-xs font-extrabold bg-primary text-primary-foreground px-2 py-0.5 tracking-wider">
                    {link.badge}
                  </span>
                )}
              </span>
            )}
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default InternalLinksBar;
