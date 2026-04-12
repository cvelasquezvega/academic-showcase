import { ShieldCheck, Truck, BookOpen, Award } from 'lucide-react';

const signals = [
  { icon: ShieldCheck, title: 'Pago seguro', desc: 'Transacciones protegidas con encriptación SSL' },
  { icon: Truck, title: 'Envío nacional', desc: 'Despacho a todas las ciudades de Colombia' },
  { icon: BookOpen, title: 'Acceso abierto', desc: 'Cientos de títulos gratuitos para la comunidad' },
  { icon: Award, title: 'Respaldo institucional', desc: 'Publicaciones con rigor académico y editorial' },
];

const TrustSignals = () => (
  <section className="py-16 md:py-20 border-t border-border">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-border">
        {signals.map(s => (
          <div key={s.title} className="bg-background flex flex-col items-center text-center p-8">
            <s.icon className="h-6 w-6 text-primary mb-4" />
            <h4 className="font-body text-sm font-bold text-foreground mb-1">{s.title}</h4>
            <p className="font-body text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSignals;
