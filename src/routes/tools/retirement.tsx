import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/tools/retirement")({
  head: () => ({
    meta: [
      { title: "Retirement Calculator — AI Asset IQ" },
      { name: "description", content: "Project your retirement savings, inflation-adjusted value, and monthly income — live." },
      { property: "og:title", content: "Retirement Calculator — AI Asset IQ" },
      { property: "og:description", content: "Live retirement projections with sliders." },
    ],
  }),
  component: RetirementPage,
});

const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function RetirementPage() {
  const [age, setAge] = useState(35);
  const [retireAge, setRetireAge] = useState(65);
  const [savings, setSavings] = useState(50000);
  const [monthly, setMonthly] = useState(800);
  const [returnPct, setReturnPct] = useState(7);
  const [inflationPct, setInflationPct] = useState(2.5);

  const data = useMemo(() => {
    const years = Math.max(1, retireAge - age);
    const r = returnPct / 100 / 12;
    const inf = inflationPct / 100;
    const points: { age: number; nominal: number; real: number }[] = [];
    let bal = savings;
    for (let y = 0; y <= years; y++) {
      const ageNow = age + y;
      const yearsElapsed = y;
      const real = bal / Math.pow(1 + inf, yearsElapsed);
      points.push({ age: ageNow, nominal: Math.round(bal), real: Math.round(real) });
      // grow 12 months
      for (let m = 0; m < 12; m++) bal = bal * (1 + r) + monthly;
    }
    return points;
  }, [age, retireAge, savings, monthly, returnPct, inflationPct]);

  const final = data[data.length - 1];
  const realFinal = final.real;
  // Safe withdrawal 4% rule, monthly
  const monthlyIncome = (realFinal * 0.04) / 12;
  // Years savings will last, drawing inflation-adjusted income
  const yearsLast = realFinal > 0 ? Math.min(60, Math.round(realFinal / Math.max(1, monthlyIncome * 12))) : 0;

  return (
    <SiteShell>
      <PageHero eyebrow="Tools" title="Retirement Calculator" subtitle="Move the sliders. Watch your future change in real time." />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
          {/* Inputs */}
          <Card className="border-border/60 p-6">
            <SliderField label="Current age" value={age} setValue={setAge} min={18} max={80} step={1} />
            <SliderField label="Retirement age" value={retireAge} setValue={setRetireAge} min={Math.max(age + 1, 40)} max={85} step={1} />
            <SliderField label="Current savings ($)" value={savings} setValue={setSavings} min={0} max={2_000_000} step={1000} format={(v) => fmt.format(v)} />
            <SliderField label="Monthly contribution ($)" value={monthly} setValue={setMonthly} min={0} max={10000} step={50} format={(v) => fmt.format(v)} />
            <SliderField label="Expected annual return (%)" value={returnPct} setValue={setReturnPct} min={0} max={15} step={0.1} format={(v) => `${v.toFixed(1)}%`} />
            <SliderField label="Inflation rate (%)" value={inflationPct} setValue={setInflationPct} min={0} max={10} step={0.1} format={(v) => `${v.toFixed(1)}%`} />
          </Card>

          {/* Output */}
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Stat label="Projected savings" value={fmt.format(final.nominal)} />
              <Stat label="Inflation-adjusted" value={fmt.format(final.real)} highlight />
              <Stat label="Monthly income (real)" value={fmt.format(monthlyIncome)} />
              <Stat label="Years savings last" value={`${yearsLast} yrs`} />
            </div>

            <Card className="border-border/60 p-6">
              <h3 className="text-lg font-semibold">Projected savings growth</h3>
              <div className="mt-4 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id="gNom" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gReal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="age" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} tickFormatter={(v: number) => `${Math.round(v / 1000)}k`} />
                    <Tooltip
                      contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }}
                      formatter={(v: number) => fmt.format(v)}
                      labelFormatter={(v) => `Age ${v}`}
                    />
                    <Area type="monotone" dataKey="nominal" name="Nominal" stroke="var(--chart-1)" strokeWidth={2} fill="url(#gNom)" />
                    <Area type="monotone" dataKey="real" name="Inflation-adjusted" stroke="var(--chart-2)" strokeWidth={2} fill="url(#gReal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="flex items-center justify-between border-border/60 bg-gradient-navy p-6">
              <div>
                <h4 className="font-semibold text-primary-foreground">Want a personalized plan?</h4>
                <p className="text-sm text-primary-foreground/70">Try the Financial Plan Builder.</p>
              </div>
              <Button variant="hero" asChild>
                <Link to="/tools/financial-plan">Plan Builder <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <Card className={`border-border/60 p-5 ${highlight ? "bg-gradient-accent text-accent-foreground" : ""}`}>
      <p className={`text-xs ${highlight ? "text-accent-foreground/80" : "text-muted-foreground"}`}>{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </Card>
  );
}

function SliderField({
  label, value, setValue, min, max, step, format,
}: { label: string; value: number; setValue: (n: number) => void; min: number; max: number; step: number; format?: (v: number) => string }) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="flex items-center justify-between">
        <Label className="text-sm">{label}</Label>
        <Input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => setValue(Number(e.target.value) || 0)}
          className="h-8 w-28 text-right text-sm"
        />
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => setValue(v[0])}
        className="mt-3"
      />
      {format && <p className="mt-1 text-xs text-muted-foreground">{format(value)}</p>}
    </div>
  );
}
