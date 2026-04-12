import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
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
    <section className="py-16 md:py-20 bg-foreground">
      <div className="container mx-auto px-4 text-center max-w-xl">
        <p className="font-body text-sm tracking-widest uppercase text-primary mb-4">Newsletter</p>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-background mb-3">
          Mantente informado
        </h2>
        <div className="w-12 h-0.5 bg-primary mx-auto mb-6" />
        <p className="font-body text-background/60 text-sm mb-8 leading-relaxed">
          Recibe novedades, acceso a títulos gratuitos y descuentos exclusivos directamente en tu correo.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-0 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            className="flex-1 px-4 py-3 bg-background/10 border border-background/20 text-background placeholder:text-background/40 font-body text-sm outline-none focus:border-primary transition-colors"
          />
          <Button type="submit" size="lg" className="font-body font-semibold uppercase tracking-wider text-sm">
            Suscribirse <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </form>
        <p className="font-body text-xs text-background/30 mt-4">
          Al suscribirte aceptas nuestra política de tratamiento de datos.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
