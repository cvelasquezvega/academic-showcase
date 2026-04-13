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
          className="fixed inset-x-0 bottom-0 z-40 w-full max-w-full overflow-hidden border-t border-white/10 bg-header-dark shadow-2xl"
        >
          <div className="mx-auto flex w-full max-w-7xl items-center gap-2 px-3 py-2 sm:gap-4 sm:px-6 sm:py-3">
            <div className="hidden min-w-0 flex-1 items-center gap-3 sm:flex">
              <UserPlus className="h-5 w-5 flex-shrink-0 text-primary" />
              <p className="font-body text-sm text-white/90 truncate font-light">
                <strong className="text-primary font-medium">Regístrate gratis</strong> y obtén 10% de descuento en tu primera compra + acceso a cientos de libros en Acceso Abierto.
              </p>
            </div>
            <div className="flex min-w-0 flex-1 items-center gap-2 sm:flex-none">
              <Button className="h-10 min-w-0 flex-1 px-3 font-body text-[11px] font-medium uppercase tracking-[0.12em] sm:flex-none sm:px-5 sm:tracking-[0.15em]">
                <span className="sm:hidden">Crear cuenta</span>
                <span className="hidden sm:inline">Crear cuenta gratis</span>
              </Button>
              <button
                onClick={() => setDismissed(true)}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center text-white/60 transition-colors hover:text-white"
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
