import { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({ title: '¡Registro exitoso!', description: 'Te enviaremos las novedades editoriales a tu correo.' });
      setEmail('');
    }
  };

  return (
    <section className="py-12 md:py-16" style={{ background: 'var(--hero-gradient)' }}>
      <div className="container mx-auto px-4 text-center max-w-xl">
        <Mail className="h-10 w-10 text-white/60 mx-auto mb-4" />
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
          Mantente informado
        </h2>
        <p className="font-body text-white/70 text-sm mb-6">
          Recibe novedades, acceso a títulos gratuitos y descuentos exclusivos directamente en tu correo.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            className="flex-1 rounded-lg px-4 py-2.5 bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-body text-sm outline-none focus:ring-2 focus:ring-primary/50"
          />
          <Button type="submit" size="lg" className="font-body font-semibold" style={{ background: 'var(--cta-gradient)' }}>
            Suscribirse <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </form>
        <p className="font-body text-xs text-white/40 mt-3">
          Al suscribirte aceptas nuestra política de tratamiento de datos.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
