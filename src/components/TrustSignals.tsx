import { ShieldCheck, Truck, BookOpen, Award } from 'lucide-react';

const signals = [
  { icon: ShieldCheck, title: 'Pago seguro', desc: 'Transacciones protegidas con encriptación SSL' },
  { icon: Truck, title: 'Envío nacional', desc: 'Despacho a todas las ciudades de Colombia' },
  { icon: BookOpen, title: 'Acceso abierto', desc: 'Cientos de títulos gratuitos para la comunidad' },
  { icon: Award, title: 'Respaldo institucional', desc: 'Universidad Nacional de Colombia' },
];

const TrustSignals = () => (
  <section className="py-14 md:py-18 border-t border-border">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {signals.map(s => (
          <div key={s.title} className="bg-card border border-border flex flex-col items-center text-center p-6">
            <s.icon className="h-6 w-6 text-secondary mb-3" />
            <h4 className="font-body text-sm font-medium text-foreground mb-1">{s.title}</h4>
            <p className="font-body text-xs text-muted-foreground leading-relaxed font-light">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSignals;
