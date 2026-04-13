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
        className="flex flex-col items-center gap-6 md:flex-row md:gap-10"
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
        <div className="grid w-full flex-shrink-0 grid-cols-1 gap-2 sm:max-w-sm sm:grid-cols-2 md:w-auto">
          <Button variant="outline" className="min-w-0 whitespace-normal px-3 font-body text-[11px] font-medium uppercase leading-tight tracking-[0.1em] text-secondary border-secondary hover:bg-secondary hover:text-secondary-foreground md:tracking-[0.15em]">
            <FileText className="h-3.5 w-3.5 mr-1.5" /> Ver convocatorias
          </Button>
          <Button className="min-w-0 whitespace-normal bg-secondary px-3 font-body text-[11px] font-medium uppercase leading-tight tracking-[0.1em] text-secondary-foreground hover:bg-secondary/90 md:tracking-[0.15em]">
            <Mail className="h-3.5 w-3.5 mr-1.5" /> Contactar
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ConvocatoriaBanner;
