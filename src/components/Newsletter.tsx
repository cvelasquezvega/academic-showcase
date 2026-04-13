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
        <h2 className="font-heading text-xl md:text-2xl font-bold text-primary-foreground mb-3">
          Regístrate y obtén beneficios
        </h2>
        <p className="font-body text-primary-foreground/60 text-sm mb-6 leading-relaxed font-light">
          Recibe novedades, acceso a títulos gratuitos, descuentos exclusivos y un <strong className="text-primary font-medium">10% de descuento</strong> en tu primera compra.
        </p>
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-2 sm:flex-row sm:gap-0">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            className="min-w-0 flex-1 border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 font-body text-sm font-light text-primary-foreground outline-none transition-colors placeholder:text-primary-foreground/40 focus:border-primary"
          />
          <Button type="submit" size="lg" className="w-full min-w-0 whitespace-normal px-4 font-body text-sm font-medium uppercase tracking-[0.1em] sm:w-auto sm:tracking-[0.15em]">
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
