import { useState, useEffect } from 'react';
import { X, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const StickyRegisterCTA = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (window.scrollY > 600 && !dismissed) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [dismissed]);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-header-dark border-t border-white/10 shadow-2xl"
        >
          <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <UserPlus className="h-5 w-5 text-primary flex-shrink-0" />
              <p className="font-body text-sm text-white/90 truncate">
                <strong className="text-primary">Regístrate gratis</strong> y obtén 10% de descuento en tu primera compra + acceso a cientos de libros en Acceso Abierto.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button className="font-body font-semibold text-xs uppercase tracking-wider h-9">
                Crear cuenta gratis
              </Button>
              <button
                onClick={() => setDismissed(true)}
                className="text-white/50 hover:text-white/80 p-1"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyRegisterCTA;
