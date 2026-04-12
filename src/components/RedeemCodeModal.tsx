import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ticket, LogIn, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RedeemCodeModalProps {
  open: boolean;
  onClose: () => void;
}

const RedeemCodeModal = ({ open, onClose }: RedeemCodeModalProps) => {
  // Simulated auth state — replace with real auth later
  const [isLoggedIn] = useState(false);
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleValidate = () => {
    if (!code.trim()) return;
    setStatus('loading');
    // Simulate validation
    setTimeout(() => {
      if (code.trim().length >= 6) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    }, 1500);
  };

  const handleReset = () => {
    setCode('');
    setStatus('idle');
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-card w-full max-w-md shadow-2xl border border-border pointer-events-auto">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-primary-light/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
                    <Ticket className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-bold text-foreground">Redimir código</h2>
                    <p className="font-body text-xs text-muted-foreground">Accede a contenidos exclusivos</p>
                  </div>
                </div>
                <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-6">
                {!isLoggedIn ? (
                  /* ── Not logged in: auth gate ── */
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-muted flex items-center justify-center mx-auto mb-4">
                      <LogIn className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-foreground mb-2">
                      Inicia sesión para continuar
                    </h3>
                    <p className="font-body text-sm text-muted-foreground mb-6">
                      Para redimir un código de acceso necesitas tener una cuenta y haber iniciado sesión.
                    </p>
                    <div className="flex flex-col gap-3">
                      <Button className="w-full font-body font-semibold uppercase text-xs tracking-wider">
                        <LogIn className="h-4 w-4 mr-2" /> Iniciar sesión
                      </Button>
                      <Button variant="outline" className="w-full font-body font-semibold uppercase text-xs tracking-wider">
                        Crear cuenta gratis
                      </Button>
                    </div>
                    <p className="font-body text-[11px] text-muted-foreground mt-4">
                      ¿Aún no tienes una cuenta? Regístrate gratis y obtén acceso a cientos de publicaciones en acceso abierto.
                    </p>
                  </div>
                ) : status === 'success' ? (
                  /* ── Success state ── */
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8 text-secondary" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-foreground mb-2">
                      ¡Código validado!
                    </h3>
                    <p className="font-body text-sm text-muted-foreground mb-2">
                      El contenido ha sido añadido a tu biblioteca. Puedes acceder a él desde <strong className="text-foreground">Mi Biblioteca</strong>.
                    </p>
                    <div className="flex gap-3 mt-6">
                      <Button className="flex-1 font-body font-semibold uppercase text-xs tracking-wider bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                        Ir a Mi Biblioteca
                      </Button>
                      <Button variant="outline" onClick={() => { handleReset(); }} className="flex-1 font-body font-semibold uppercase text-xs tracking-wider">
                        Redimir otro código
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* ── Code input form ── */
                  <div>
                    <label className="font-body text-xs font-bold tracking-widest uppercase text-muted-foreground block mb-2">
                      Código de acceso
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={code}
                        onChange={e => setCode(e.target.value.toUpperCase())}
                        placeholder="Ej: UNAL-2024-ABCDE"
                        maxLength={30}
                        className="flex-1 font-body text-sm border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 tracking-widest uppercase"
                        onKeyDown={e => e.key === 'Enter' && handleValidate()}
                        autoFocus
                      />
                      <Button
                        onClick={handleValidate}
                        disabled={!code.trim() || status === 'loading'}
                        className="font-body font-semibold uppercase text-xs tracking-wider px-6"
                      >
                        {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Validar'}
                      </Button>
                    </div>

                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 mt-3 p-3 bg-destructive/10 border border-destructive/20"
                      >
                        <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                        <p className="font-body text-xs text-destructive">
                          Código no válido o ya fue utilizado. Verifica e intenta de nuevo.
                        </p>
                      </motion.div>
                    )}

                    <div className="mt-5 p-4 bg-muted/50 border border-border">
                      <p className="font-body text-xs text-muted-foreground leading-relaxed">
                        <strong className="text-foreground">¿Dónde encuentro mi código?</strong><br />
                        Los códigos de acceso se distribuyen con libros impresos, en eventos académicos o a través de tu institución educativa. Cada código es de un solo uso.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RedeemCodeModal;
