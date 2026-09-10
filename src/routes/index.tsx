import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram, MapPin, MessageCircle, Phone, UserRound } from "lucide-react";

import portraitMobile from "@/assets/fernanda-portrait-mobile.jpg";
import portraitDesktop from "@/assets/fernanda-portrait-desktop.jpg";
import { Button } from "@/components/ui/button";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agende seu horário | Fernanda Braids" },
      { name: "description", content: "Escolha seu serviço, data e horário no ateliê Fernanda Braids." },
      { property: "og:title", content: "Agende seu horário | Fernanda Braids" },
      { property: "og:description", content: "Escolha seu serviço, data e horário no ateliê Fernanda Braids." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  { id: "box", name: "Trança box braids", price: 420, duration: "3h20" },
  { id: "crochet", name: "Crochet braids", price: 340, duration: "2h" },
] as const;

const dates = ["12", "13", "15"];
const times = ["09:00", "14:30", "17:00"];

function Index() {
  const [serviceId, setServiceId] = useState("box");
  const [date, setDate] = useState("12");
  const [time, setTime] = useState("09:00");
  const [confirmed, setConfirmed] = useState(false);
  const service = services.find((item) => item.id === serviceId) ?? services[0];

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground antialiased">
      <div className="ambient-light pointer-events-none absolute -top-64 left-[38%] h-[700px] w-[700px]" />
      <div className="relative z-10 mx-auto max-w-[1180px] px-5 sm:px-8">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border/70 py-5 lg:flex lg:justify-between lg:py-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="size-2 shrink-0 rounded-full bg-primary shadow-[0_0_12px_2px_color-mix(in_oklab,var(--primary)_70%,transparent)]" />
            <span className="truncate font-display text-xl">Fernanda Braids</span>
          </div>
          <nav className="hidden items-center gap-7 text-[13px] text-mist lg:flex" aria-label="Navegação principal">
            <a href="#atelie" className="transition-colors hover:text-foreground">Ateliê</a>
            <a href="#servicos" className="transition-colors hover:text-foreground">Serviços</a>
            <a href="#agendar" className="text-primary">Agendar</a>
          </nav>
          <Button variant="bookingOutline" size="sm"><UserRound /> Entrar</Button>
        </header>

        <main id="agendar" className="py-7 lg:py-12">
          <section className="mx-auto max-w-md lg:hidden">
            <div className="glass-panel rounded-2xl p-5">
              <div className="flex gap-4">
                <img src={portraitMobile} alt="Fernanda, especialista em tranças" width={736} height={912} className="h-24 w-20 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0">
                  <p className="font-display text-[27px] leading-none">Fernanda Braids</p>
                  <p className="mt-1 text-[13px] leading-snug text-mist">Tranças com calma e precisão.</p>
                  <div className="mt-3 flex gap-2">
                    {[Instagram, MessageCircle, MapPin, Phone].map((Icon, index) => (
                      <a key={index} href="#contato" aria-label={["Instagram", "WhatsApp", "Localização", "Telefone"][index]} className="grid size-7 place-items-center rounded-md border border-border text-mist transition-colors hover:border-primary hover:text-primary"><Icon className="size-3.5" /></a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-5 inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs text-mist"><UserRound className="size-3.5" /> Olá, Ana</div>
              <div className="mt-5 flex items-center gap-1.5"><span className="h-1 flex-1 rounded-full bg-primary" /><span className="h-1 flex-1 rounded-full bg-border" /><span className="h-1 flex-1 rounded-full bg-border" /><span className="ml-2 text-[10px] uppercase text-mist">Etapa 1 de 3</span></div>
              <h2 className="mt-6 font-display text-2xl italic">O que faremos hoje?</h2>
              <ServicePicker value={serviceId} onChange={setServiceId} compact />
              <Button variant="booking" size="booking" className="mt-5 w-full" onClick={() => setConfirmed(true)}>{confirmed ? "Serviço selecionado" : "Continuar"}</Button>
            </div>
          </section>

          <section className="hidden grid-cols-12 items-start gap-8 lg:grid">
            <aside id="atelie" className="col-span-5 sticky top-8">
              <div className="glass-panel overflow-hidden rounded-2xl">
                <img src={portraitDesktop} alt="Fernanda em seu ateliê de tranças" width={816} height={816} className="aspect-[4/3] w-full object-cover" />
                <div className="p-7">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-primary">Ateliê privado</p>
                  <h1 className="mt-2 font-display text-5xl leading-none">Fernanda Braids</h1>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-mist">Tranças feitas com atenção, técnica e o tempo que cada cabelo merece.</p>
                  <div id="contato" className="mt-6 flex items-center gap-4 text-xs text-mist"><span className="flex items-center gap-2"><MapPin className="size-4 text-primary" /> São Paulo, SP</span><span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-primary" /> Próximos 3 dias</span></div>
                </div>
              </div>
            </aside>

            <div className="col-span-1 flex min-h-[650px] flex-col items-center py-2"><span className="w-px flex-1 bg-border/60" /><span className="my-3 size-1.5 rounded-full bg-primary" /><span className="w-px flex-1 bg-border/60" /></div>

            <section className="col-span-6" aria-label="Escolha do agendamento">
              <p className="text-[11px] uppercase tracking-[0.24em] text-mist">Agendamento</p>
              <h2 className="mt-2 font-display text-4xl">Escolha o seu momento.</h2>
              <div className="mt-5 flex items-center gap-2 text-xs text-mist"><Step active number="1" label="Serviço" /><span className="h-px w-7 bg-border" /><Step active number="2" label="Data" /><span className="h-px w-7 bg-border" /><Step number="3" label="Resumo" /></div>
              <div id="servicos" className="mt-7"><Label>Serviços</Label><ServicePicker value={serviceId} onChange={setServiceId} /></div>
              <div className="mt-7 grid grid-cols-2 gap-6">
                <ChoiceGroup label="Data" values={dates} value={date} onChange={setDate} square />
                <ChoiceGroup label="Horários" values={times} value={time} onChange={setTime} />
              </div>
              <div className="mt-7 rounded-xl border border-border bg-background/40 p-5">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 text-sm"><span className="text-mist">Resumo</span><span className="truncate text-right">{service.name} · {date}/06 · {time}</span></div>
                <div className="mt-3 flex items-end justify-between"><span className="text-xs text-mist">Total estimado</span><span className="font-display text-3xl">R$ {service.price}</span></div>
                <Button variant="booking" size="booking" className="mt-5 w-full" onClick={() => setConfirmed(true)}>{confirmed ? "Agendamento confirmado" : "Confirmar agendamento"}</Button>
              </div>
            </section>
          </section>
        </main>
      </div>
    </div>
  );
}

function Label({ children }: { children: string }) { return <p className="text-[11px] uppercase tracking-[0.2em] text-mist">{children}</p>; }

function Step({ number, label, active = false }: { number: string; label: string; active?: boolean }) {
  return <span className="flex items-center gap-2"><span className={`grid size-5 place-items-center rounded-full text-[10px] ${active ? "bg-primary/20 text-primary" : "border border-border"}`}>{number}</span>{label}</span>;
}

function ServicePicker({ value, onChange, compact = false }: { value: string; onChange: (value: string) => void; compact?: boolean }) {
  return <div className={`${compact ? "mt-3" : "mt-2"} space-y-2`}>{services.map((item) => { const selected = value === item.id; return <button key={item.id} type="button" onClick={() => onChange(item.id)} className={`grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-xl border p-4 text-left transition-all ${selected ? "border-primary/60 bg-primary/10 shadow-booking" : "border-border bg-foreground/[0.02] hover:border-primary/50"}`}><span className="min-w-0"><span className="block truncate text-sm text-foreground">{item.name}</span><span className="mt-1 block text-xs text-mist">{item.duration} · a partir de R$ {item.price}</span></span><span className={`grid size-5 shrink-0 place-items-center rounded-full border ${selected ? "border-primary" : "border-border"}`}>{selected && <span className="size-2 rounded-full bg-primary" />}</span></button>; })}</div>;
}

function ChoiceGroup({ label, values, value, onChange, square = false }: { label: string; values: string[]; value: string; onChange: (value: string) => void; square?: boolean }) {
  return <div><Label>{label}</Label><div className="mt-2 flex flex-wrap gap-2">{values.map((item) => <Button key={item} type="button" variant="bookingOutline" size={square ? "icon" : "sm"} onClick={() => onChange(item)} aria-pressed={value === item} className={value === item ? "border-primary bg-primary/10 text-foreground" : "text-mist"}>{item}</Button>)}</div></div>;
}
