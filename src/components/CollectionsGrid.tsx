import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { collections } from '@/data/books';

const CollectionsGrid = () => (
  <section className="py-10 md:py-14 bg-muted/50">
    <div className="container mx-auto px-4">
      <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground text-center mb-8">
        Explora por temática
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {collections.map((col, i) => (
          <motion.a
            key={col.name}
            href="#"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group bg-card rounded-xl border border-border p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex items-center gap-4"
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
