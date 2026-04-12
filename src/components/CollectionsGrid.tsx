import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { collections } from '@/data/books';

const CollectionsGrid = () => (
  <section className="py-16 md:py-20 bg-muted">
    <div className="container mx-auto px-4">
      <p className="font-body text-sm tracking-widest uppercase text-muted-foreground text-center mb-3">Subjects</p>
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
        Explora por temática
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
        {collections.map((col, i) => (
          <motion.a
            key={col.name}
            href="#"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="group bg-background p-6 hover:bg-primary/5 transition-colors flex items-center gap-4"
          >
            <span className="text-2xl">{col.icon}</span>
            <div className="flex-1 min-w-0">
              <span className="font-body text-sm font-semibold text-foreground block truncate">{col.name}</span>
              <span className="font-body text-xs text-muted-foreground">{col.count} títulos</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default CollectionsGrid;
