import { useState } from 'react';
import { ArrowRight, Gift } from 'lucide-react';
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
    <section className="py-14 md:py-18 bg-foreground">
      <div className="container mx-auto px-4 text-center max-w-xl">
        <Gift className="h-8 w-8 text-primary mx-auto mb-4" />
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
          Regístrate y obtén beneficios
        </h2>
        <p className="font-body text-primary-foreground/60 text-sm mb-6 leading-relaxed">
          Recibe novedades, acceso a títulos gratuitos, descuentos exclusivos y un <strong className="text-primary">10% de descuento</strong> en tu primera compra.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-0 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            className="flex-1 px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 font-body text-sm outline-none focus:border-primary transition-colors"
          />
          <Button type="submit" size="lg" className="font-body font-semibold uppercase tracking-wider text-sm">
            Suscribirse <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </form>
        <p className="font-body text-xs text-primary-foreground/30 mt-4">
          Al suscribirte aceptas nuestra política de tratamiento de datos.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
