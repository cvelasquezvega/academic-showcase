import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, CheckCircle2, ArrowLeft, Loader2, ShieldCheck, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type AuthView = 'login' | 'register' | 'forgot';

interface AuthModalProps {
  open: boolean;
  view: AuthView;
  onClose: () => void;
  onChangeView: (v: AuthView) => void;
}

const pwRules = (pw: string) => ({
  length: pw.length >= 8,
  upper: /[A-Z]/.test(pw),
  number: /\d/.test(pw),
});

const AuthModal = ({ open, view, onClose, onChangeView }: AuthModalProps) => {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [registered, setRegistered] = useState(false);

  // Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPw, setLoginPw] = useState('');

  // Register
  const [rNombre, setRNombre] = useState('');
  const [rApellido, setRApellido] = useState('');
  const [rEmail, setREmail] = useState('');
  const [rPw, setRPw] = useState('');
  const [rPw2, setRPw2] = useState('');
  const [rNews, setRNews] = useState(true);
  const [rTerms, setRTerms] = useState(false);

  // Forgot
  const [fEmail, setFEmail] = useState('');

  useEffect(() => {
    if (!open) {
      setSent(false); setRegistered(false); setLoading(false);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) {
      document.addEventListener('keydown', handler);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const submit = (cb: () => void) => (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); cb(); }, 1200);
  };

  const rules = pwRules(rPw);
  const rulesOk = rules.length && rules.upper && rules.number;
  const canRegister = rNombre.trim() && rApellido.trim() && rEmail.includes('@') && rulesOk && rPw === rPw2 && rTerms;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="fixed inset-0 z-[71] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-card w-full max-w-lg shadow-2xl border border-border pointer-events-auto max-h-[92vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <div className="flex items-center gap-2">
                  {view === 'forgot' && (
                    <button onClick={() => onChangeView('login')} className="text-muted-foreground hover:text-foreground">
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                  )}
                  <h2 className="font-heading text-lg font-bold text-foreground">
                    {view === 'login' && 'Iniciar sesión'}
                    {view === 'register' && 'Crear cuenta'}
                    {view === 'forgot' && '¿Olvidaste tu contraseña?'}
                  </h2>
                </div>
                <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Tabs (login/register) */}
              {view !== 'forgot' && (
                <div className="grid grid-cols-2 border-b border-border">
                  <button
                    onClick={() => onChangeView('login')}
                    className={`font-nav text-xs font-semibold uppercase tracking-widest py-3 transition-colors ${
                      view === 'login' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >Iniciar sesión</button>
                  <button
                    onClick={() => onChangeView('register')}
                    className={`font-nav text-xs font-semibold uppercase tracking-widest py-3 transition-colors ${
                      view === 'register' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >Registrarse</button>
                </div>
              )}

              <div className="px-6 py-6">
                {/* ============ LOGIN ============ */}
                {view === 'login' && (
                  <form onSubmit={submit(onClose)} className="space-y-4">
                    <p className="font-body text-sm text-muted-foreground">
                      Ingresa a tu cuenta para acceder a tu biblioteca, redimir códigos y comprar más rápido.
                    </p>
                    <Field icon={Mail} label="Correo electrónico" required>
                      <input
                        type="email" required value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                        placeholder="tu@correo.com" autoFocus
                        className="w-full font-body text-sm bg-background px-3 py-2.5 outline-none"
                      />
                    </Field>
                    <Field icon={Lock} label="Contraseña" required>
                      <input
                        type={showPw ? 'text' : 'password'} required value={loginPw} onChange={e => setLoginPw(e.target.value)}
                        placeholder="••••••••"
                        className="w-full font-body text-sm bg-background px-3 py-2.5 outline-none"
                      />
                      <button type="button" onClick={() => setShowPw(v => !v)} className="pr-3 text-muted-foreground hover:text-foreground">
                        {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </Field>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 font-body text-xs text-muted-foreground cursor-pointer">
                        <input type="checkbox" className="accent-primary" /> Recuérdame
                      </label>
                      <button type="button" onClick={() => onChangeView('forgot')} className="font-body text-xs text-primary hover:underline">
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>
                    <Button type="submit" disabled={loading} className="w-full font-body font-semibold uppercase text-xs tracking-wider">
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Iniciar sesión'}
                    </Button>
                    <p className="text-center font-body text-xs text-muted-foreground">
                      ¿No tienes cuenta?{' '}
                      <button type="button" onClick={() => onChangeView('register')} className="text-primary font-semibold hover:underline">
                        Regístrate gratis
                      </button>
                    </p>
                  </form>
                )}

                {/* ============ REGISTER ============ */}
                {view === 'register' && !registered && (
                  <form onSubmit={submit(() => setRegistered(true))} className="space-y-4">
                    <div className="flex items-start gap-2 p-3 bg-primary-light/40 border border-primary/20">
                      <Gift className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="font-body text-xs text-foreground leading-relaxed">
                        <strong>10% de descuento</strong> en tu primera compra al registrarte y suscribirte al newsletter.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Field icon={User} label="Nombres" required>
                        <input required value={rNombre} onChange={e => setRNombre(e.target.value)} className="w-full font-body text-sm bg-background px-3 py-2.5 outline-none" />
                      </Field>
                      <Field icon={User} label="Apellidos" required>
                        <input required value={rApellido} onChange={e => setRApellido(e.target.value)} className="w-full font-body text-sm bg-background px-3 py-2.5 outline-none" />
                      </Field>
                    </div>
                    <Field icon={Mail} label="Correo electrónico" required>
                      <input type="email" required value={rEmail} onChange={e => setREmail(e.target.value)} placeholder="tu@correo.com" className="w-full font-body text-sm bg-background px-3 py-2.5 outline-none" />
                    </Field>
                    <Field icon={Lock} label="Contraseña" required>
                      <input
                        type={showPw ? 'text' : 'password'} required value={rPw} onChange={e => setRPw(e.target.value)}
                        className="w-full font-body text-sm bg-background px-3 py-2.5 outline-none"
                      />
                      <button type="button" onClick={() => setShowPw(v => !v)} className="pr-3 text-muted-foreground hover:text-foreground">
                        {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </Field>
                    {rPw && (
                      <div className="space-y-1 -mt-2 pl-1">
                        <PwRule ok={rules.length} label="Mínimo 8 caracteres" />
                        <PwRule ok={rules.upper} label="Al menos una letra mayúscula" />
                        <PwRule ok={rules.number} label="Al menos un número" />
                      </div>
                    )}
                    <Field icon={Lock} label="Confirmar contraseña" required>
                      <input
                        type={showPw ? 'text' : 'password'} required value={rPw2} onChange={e => setRPw2(e.target.value)}
                        className="w-full font-body text-sm bg-background px-3 py-2.5 outline-none"
                      />
                    </Field>
                    {rPw2 && rPw !== rPw2 && (
                      <p className="font-body text-xs text-destructive -mt-2">Las contraseñas no coinciden</p>
                    )}

                    <div className="space-y-2 pt-1">
                      <label className="flex items-start gap-2 font-body text-xs text-foreground cursor-pointer">
                        <input type="checkbox" checked={rNews} onChange={e => setRNews(e.target.checked)} className="mt-0.5 accent-primary" />
                        <span>Suscribirme al <strong>newsletter</strong> de Editorial UNAL</span>
                      </label>
                      <label className="flex items-start gap-2 font-body text-xs text-foreground cursor-pointer">
                        <input type="checkbox" checked={rTerms} onChange={e => setRTerms(e.target.checked)} className="mt-0.5 accent-primary" required />
                        <span>Acepto los <a href="#" className="text-primary hover:underline">Términos y condiciones</a> y la <a href="#" className="text-primary hover:underline">Política de tratamiento de datos</a> <span className="text-destructive">*</span></span>
                      </label>
                    </div>

                    <Button type="submit" disabled={loading || !canRegister} className="w-full font-body font-semibold uppercase text-xs tracking-wider">
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Crear cuenta gratis'}
                    </Button>
                    <p className="text-center font-body text-xs text-muted-foreground">
                      ¿Ya tienes cuenta?{' '}
                      <button type="button" onClick={() => onChangeView('login')} className="text-primary font-semibold hover:underline">
                        Inicia sesión
                      </button>
                    </p>
                  </form>
                )}

                {view === 'register' && registered && (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8 text-secondary" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-foreground mb-2">¡Bienvenido a Editorial UNAL!</h3>
                    <p className="font-body text-sm text-muted-foreground mb-2">
                      Hemos enviado un correo de verificación a <strong className="text-foreground">{rEmail}</strong>.
                    </p>
                    <p className="font-body text-xs text-muted-foreground mb-6">
                      Confirma tu cuenta para activar tu <strong>cupón de 10%</strong> de descuento.
                    </p>
                    <Button onClick={onClose} className="w-full font-body font-semibold uppercase text-xs tracking-wider">
                      Continuar explorando
                    </Button>
                  </div>
                )}

                {/* ============ FORGOT ============ */}
                {view === 'forgot' && !sent && (
                  <form onSubmit={submit(() => setSent(true))} className="space-y-4">
                    <p className="font-body text-sm text-muted-foreground">
                      Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                    </p>
                    <Field icon={Mail} label="Correo electrónico" required>
                      <input type="email" required value={fEmail} onChange={e => setFEmail(e.target.value)} placeholder="tu@correo.com" autoFocus className="w-full font-body text-sm bg-background px-3 py-2.5 outline-none" />
                    </Field>
                    <Button type="submit" disabled={loading} className="w-full font-body font-semibold uppercase text-xs tracking-wider">
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Enviar enlace de recuperación'}
                    </Button>
                    <p className="text-center font-body text-xs text-muted-foreground">
                      <button type="button" onClick={() => onChangeView('login')} className="text-primary font-semibold hover:underline">
                        Volver a iniciar sesión
                      </button>
                    </p>
                  </form>
                )}

                {view === 'forgot' && sent && (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8 text-secondary" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-foreground mb-2">Enlace enviado</h3>
                    <p className="font-body text-sm text-muted-foreground mb-2">
                      Revisa <strong className="text-foreground">{fEmail}</strong> y sigue las instrucciones para restablecer tu contraseña.
                    </p>
                    <p className="font-body text-xs text-muted-foreground mb-6">
                      Si no lo recibes en unos minutos, revisa tu carpeta de spam.
                    </p>
                    <Button onClick={() => onChangeView('login')} variant="outline" className="w-full font-body font-semibold uppercase text-xs tracking-wider">
                      Volver a iniciar sesión
                    </Button>
                  </div>
                )}

                {/* Trust footer */}
                {view !== 'forgot' && !registered && (
                  <div className="mt-5 pt-4 border-t border-border flex items-center justify-center gap-2 font-body text-[11px] text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
                    Conexión segura · Tus datos protegidos por la Universidad Nacional
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

const Field = ({ icon: Icon, label, required, children }: { icon: React.ElementType; label: string; required?: boolean; children: React.ReactNode }) => (
  <div>
    <label className="font-body text-[11px] font-bold tracking-widest uppercase text-muted-foreground block mb-1.5">
      {label} {required && <span className="text-destructive">*</span>}
    </label>
    <div className="flex items-center border border-border bg-background focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30 transition-colors">
      <Icon className="h-4 w-4 text-muted-foreground ml-3 flex-shrink-0" />
      {children}
    </div>
  </div>
);

const PwRule = ({ ok, label }: { ok: boolean; label: string }) => (
  <div className={`flex items-center gap-1.5 font-body text-[11px] ${ok ? 'text-secondary' : 'text-muted-foreground'}`}>
    <CheckCircle2 className={`h-3 w-3 ${ok ? 'opacity-100' : 'opacity-30'}`} /> {label}
  </div>
);

export default AuthModal;