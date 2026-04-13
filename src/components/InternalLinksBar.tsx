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
      <div className="grid gap-3 md:grid-cols-3">
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
            className="group flex min-h-[76px] items-center justify-center border border-primary/20 bg-card/80 px-5 text-center transition-all hover:border-primary/40 hover:bg-card hover:shadow-sm"
          >
            {link.sublabel ? (
              /* Programa: Entre Libros — italic style */
              <span className="leading-tight">
                <span className="block font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {link.label.replace(':', '')}
                </span>
                <span className="block font-heading text-xl font-bold italic text-primary">
                  {link.sublabel}
                </span>
              </span>
            ) : (
              /* Portal de Revistas UNAL / Repositorio UNAL */
              <span className="flex items-center justify-center gap-2 leading-none">
                <span className="font-body text-base font-medium text-primary">{link.label}</span>
                {link.badge && (
                  <span className="font-nav text-[10px] font-extrabold bg-primary text-primary-foreground px-2 py-0.5 tracking-wider">
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
