import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Gift,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  User,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export type AuthView = 'login' | 'register' | 'forgot';

interface AuthModalProps {
  open: boolean;
  initialView?: AuthView;
  onClose: () => void;
}

const viewTitles: Record<AuthView, string> = {
  login: 'Iniciar sesión',
  register: 'Crear cuenta',
  forgot: '¿Olvidaste tu contraseña?',
};

const labelClass = 'font-body text-xs font-bold tracking-widest uppercase text-muted-foreground block mb-2';
const inputWrapClass = 'flex items-center gap-2 border border-border bg-background px-3 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30';
const inputClass = 'flex-1 font-body text-sm bg-transparent py-3 text-foreground placeholder:text-muted-foreground outline-none min-w-0';

const AuthModal = ({ open, initialView = 'login', onClose }: AuthModalProps) => {
  const [view, setView] = useState<AuthView>(initialView);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [showPassword, setShowPassword] = useState(false);

  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Register fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newsletter, setNewsletter] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Forgot password field
  const [forgotEmail, setForgotEmail] = useState('');

  useEffect(() => {
    if (open) {
      setView(initialView);
      setStatus('idle');
      setShowPassword(false);
    }
  }, [open, initialView]);

  const changeView = (next: AuthView) => {
    setView(next);
    setStatus('idle');
    setShowPassword(false);
  };

  const simulateSubmit = () => {
    setStatus('loading');
    // Simulated request — replace with real auth later
    setTimeout(() => setStatus('success'), 1500);
  };

  const loginValid = loginEmail.trim() && loginPassword.trim();
  const registerValid =
    firstName.trim() &&
    lastName.trim() &&
    registerEmail.trim() &&
    registerPassword.trim() &&
    confirmPassword.trim() &&
    registerPassword === confirmPassword &&
    acceptTerms;
  const forgotValid = forgotEmail.trim();

  const renderTabs = () => (
    <div className="flex border-b border-border">
      {(['login', 'register'] as const).map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => changeView(tab)}
          className={`flex-1 font-body text-xs font-bold tracking-widest uppercase py-3 text-center border-b-2 transition-colors ${
            view === tab
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          {tab === 'login' ? 'Iniciar sesión' : 'Registrarse'}
        </button>
      ))}
    </div>
  );

  const renderSecureFooter = () => (
    <div className="flex items-center justify-center gap-2 border-t border-border px-6 py-4">
      <ShieldCheck className="h-4 w-4 text-secondary flex-shrink-0" />
      <p className="font-body text-xs text-muted-foreground">
        Conexión segura · Tus datos protegidos por la Universidad Nacional
      </p>
    </div>
  );

  const renderPasswordToggle = () => (
    <button
      type="button"
      onClick={() => setShowPassword((value) => !value)}
      className="text-muted-foreground hover:text-foreground p-1"
      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
    >
      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  );

  const renderSuccess = (title: string, message: React.ReactNode, actionLabel: string, onAction: () => void) => (
    <div className="text-center py-4">
      <div className="w-16 h-16 bg-secondary/10 flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="h-8 w-8 text-secondary" />
      </div>
      <h3 className="font-heading text-base font-bold text-foreground mb-2">{title}</h3>
      <p className="font-body text-sm text-muted-foreground mb-6">{message}</p>
      <Button
        onClick={onAction}
        className="w-full font-body font-semibold uppercase text-xs tracking-wider bg-secondary hover:bg-secondary/90 text-secondary-foreground"
      >
        {actionLabel}
      </Button>
    </div>
  );

  const renderLogin = () =>
    status === 'success' ? (
      renderSuccess(
        '¡Bienvenido de nuevo!',
        <>Has iniciado sesión correctamente. Ya puedes acceder a tu biblioteca y redimir códigos.</>,
        'Continuar',
        onClose,
      )
    ) : (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (loginValid) simulateSubmit();
        }}
      >
        <p className="font-body text-sm text-muted-foreground mb-5">
          Ingresa a tu cuenta para acceder a tu biblioteca, redimir códigos y comprar más rápido.
        </p>

        <div className="mb-4">
          <label className={labelClass}>
            Correo electrónico <span className="text-destructive">*</span>
          </label>
          <div className={inputWrapClass}>
            <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="tu@correo.com"
              className={inputClass}
              autoFocus
            />
          </div>
        </div>

        <div className="mb-4">
          <label className={labelClass}>
            Contraseña <span className="text-destructive">*</span>
          </label>
          <div className={inputWrapClass}>
            <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
            />
            {renderPasswordToggle()}
          </div>
        </div>

        <div className="flex items-center justify-between mb-5">
          <label className="flex items-center gap-2 font-body text-sm text-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 accent-primary"
            />
            Recuérdame
          </label>
          <button
            type="button"
            onClick={() => changeView('forgot')}
            className="font-body text-sm text-primary hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <Button
          type="submit"
          disabled={!loginValid || status === 'loading'}
          className="w-full font-body font-semibold uppercase text-xs tracking-wider"
        >
          {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Iniciar sesión'}
        </Button>

        <p className="font-body text-sm text-muted-foreground text-center mt-4">
          ¿No tienes cuenta?{' '}
          <button
            type="button"
            onClick={() => changeView('register')}
            className="text-primary font-semibold hover:underline"
          >
            Regístrate gratis
          </button>
        </p>
      </form>
    );

  const renderRegister = () =>
    status === 'success' ? (
      renderSuccess(
        '¡Cuenta creada!',
        <>
          Hemos enviado un correo de confirmación a <strong className="text-foreground">{registerEmail}</strong>.
          Verifica tu cuenta para comenzar a explorar el catálogo.
        </>,
        'Entendido',
        onClose,
      )
    ) : (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (registerValid) simulateSubmit();
        }}
      >
        <div className="flex items-start gap-2 p-3 bg-primary-light/40 border border-border mb-5">
          <Gift className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
          <p className="font-body text-xs text-foreground leading-relaxed">
            <strong>10% de descuento</strong> en tu primera compra al registrarte y suscribirte al newsletter.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className={labelClass}>
              Nombres <span className="text-destructive">*</span>
            </label>
            <div className={inputWrapClass}>
              <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputClass}
                autoFocus
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>
              Apellidos <span className="text-destructive">*</span>
            </label>
            <div className={inputWrapClass}>
              <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className={labelClass}>
            Correo electrónico <span className="text-destructive">*</span>
          </label>
          <div className={inputWrapClass}>
            <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <input
              type="email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              placeholder="tu@correo.com"
              className={inputClass}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className={labelClass}>
            Contraseña <span className="text-destructive">*</span>
          </label>
          <div className={inputWrapClass}>
            <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              className={inputClass}
            />
            {renderPasswordToggle()}
          </div>
        </div>

        <div className="mb-5">
          <label className={labelClass}>
            Confirmar contraseña <span className="text-destructive">*</span>
          </label>
          <div className={inputWrapClass}>
            <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClass}
            />
          </div>
          {confirmPassword && registerPassword !== confirmPassword && (
            <p className="font-body text-xs text-destructive mt-2">Las contraseñas no coinciden.</p>
          )}
        </div>

        <label className="flex items-start gap-2 font-body text-sm text-foreground cursor-pointer mb-3">
          <input
            type="checkbox"
            checked={newsletter}
            onChange={(e) => setNewsletter(e.target.checked)}
            className="h-4 w-4 accent-primary mt-0.5"
          />
          <span>
            Suscribirme al <strong>newsletter</strong> de Editorial UNAL
          </span>
        </label>

        <label className="flex items-start gap-2 font-body text-sm text-foreground cursor-pointer mb-5">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="h-4 w-4 accent-primary mt-0.5"
          />
          <span>
            Acepto los{' '}
            <a href="#" className="text-primary hover:underline">Términos y condiciones</a> y la{' '}
            <a href="#" className="text-primary hover:underline">Política de tratamiento de datos</a>{' '}
            <span className="text-destructive">*</span>
          </span>
        </label>

        <Button
          type="submit"
          disabled={!registerValid || status === 'loading'}
          className="w-full font-body font-semibold uppercase text-xs tracking-wider"
        >
          {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Crear cuenta gratis'}
        </Button>

        <p className="font-body text-sm text-muted-foreground text-center mt-4">
          ¿Ya tienes cuenta?{' '}
          <button
            type="button"
            onClick={() => changeView('login')}
            className="text-primary font-semibold hover:underline"
          >
            Inicia sesión
          </button>
        </p>
      </form>
    );

  const renderForgot = () =>
    status === 'success' ? (
      renderSuccess(
        '¡Enlace enviado!',
        <>
          Si existe una cuenta asociada a <strong className="text-foreground">{forgotEmail}</strong>, recibirás un
          correo con las instrucciones para restablecer tu contraseña.
        </>,
        'Volver a iniciar sesión',
        () => changeView('login'),
      )
    ) : (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (forgotValid) simulateSubmit();
        }}
      >
        <p className="font-body text-sm text-muted-foreground mb-5">
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>

        <div className="mb-5">
          <label className={labelClass}>
            Correo electrónico <span className="text-destructive">*</span>
          </label>
          <div className={inputWrapClass}>
            <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="tu@correo.com"
              className={inputClass}
              autoFocus
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={!forgotValid || status === 'loading'}
          className="w-full font-body font-semibold uppercase text-xs tracking-wider"
        >
          {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Enviar enlace de recuperación'}
        </Button>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => changeView('login')}
            className="font-body text-sm text-primary font-semibold hover:underline"
          >
            Volver a iniciar sesión
          </button>
        </div>
      </form>
    );

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
            className="fixed inset-0 bg-black/50 z-[140]"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed inset-0 z-[141] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-card w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border border-border pointer-events-auto">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <div className="flex items-center gap-3">
                  {view === 'forgot' && (
                    <button
                      type="button"
                      onClick={() => changeView('login')}
                      className="text-muted-foreground hover:text-foreground p-1 -ml-1"
                      aria-label="Volver a iniciar sesión"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                  )}
                  <h2 className="font-heading text-lg font-bold text-foreground">{viewTitles[view]}</h2>
                </div>
                <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1" aria-label="Cerrar">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {view !== 'forgot' && renderTabs()}

              {/* Body */}
              <div className="px-6 py-6">
                {view === 'login' && renderLogin()}
                {view === 'register' && renderRegister()}
                {view === 'forgot' && renderForgot()}
              </div>

              {renderSecureFooter()}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
