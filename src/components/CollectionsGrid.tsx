import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { collections } from '@/data/books';

const CollectionsGrid = () => (
  <section className="py-14 md:py-18 bg-primary-light/40">
    <div className="container mx-auto px-4">
      <p className="font-body text-[11px] tracking-[0.2em] uppercase text-primary text-center mb-2 font-semibold">Temáticas</p>
      <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground text-center mb-10">
        Explora por temática
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {collections.map((col, i) => (
          <motion.a
            key={col.name}
            href="#"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="group bg-card border border-border p-5 hover:border-primary/30 hover:shadow-md transition-all flex items-center gap-3"
          >
            <span className="text-2xl">{col.icon}</span>
            <div className="flex-1 min-w-0">
              <span className="font-body text-sm font-medium text-foreground block truncate">{col.name}</span>
              <span className="font-body text-xs text-muted-foreground font-light">{col.count} títulos</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default CollectionsGrid;
