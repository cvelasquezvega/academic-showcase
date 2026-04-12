import { motion } from 'framer-motion';
import { FileText, ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ConvocatoriaBanner = () => (
  <section className="py-10 bg-secondary/5 border-y border-secondary/15">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-center gap-6 md:gap-10"
      >
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="w-14 h-14 bg-secondary/10 flex items-center justify-center">
            <FileText className="h-7 w-7 text-secondary" />
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-heading text-lg font-bold text-foreground mb-1">
            Convocatorias editoriales abiertas
          </h3>
          <p className="font-body text-sm text-muted-foreground font-light">
            ¿Tienes un manuscrito académico? Conoce nuestras convocatorias vigentes y postula tu obra para publicación.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Button variant="outline" className="font-body font-medium text-[11px] uppercase tracking-[0.15em] border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
            <FileText className="h-3.5 w-3.5 mr-1.5" /> Ver convocatorias
          </Button>
          <Button className="font-body font-medium text-[11px] uppercase tracking-[0.15em] bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            <Mail className="h-3.5 w-3.5 mr-1.5" /> Contactar
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ConvocatoriaBanner;
