import { ShieldCheck, Truck, BookOpen, Award } from 'lucide-react';

const signals = [
  { icon: ShieldCheck, title: 'Pago seguro', desc: 'Transacciones protegidas con encriptación SSL' },
  { icon: Truck, title: 'Envío nacional', desc: 'Despacho a todas las ciudades de Colombia' },
  { icon: BookOpen, title: 'Acceso abierto', desc: 'Cientos de títulos gratuitos para la comunidad' },
  { icon: Award, title: 'Respaldo institucional', desc: 'Publicaciones con rigor académico y editorial' },
];

const TrustSignals = () => (
  <section className="py-10 md:py-14">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {signals.map(s => (
          <div key={s.title} className="flex items-start gap-4 p-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <s.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-body text-sm font-bold text-foreground">{s.title}</h4>
              <p className="font-body text-xs text-muted-foreground mt-0.5">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSignals;
