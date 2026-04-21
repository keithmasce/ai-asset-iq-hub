import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowLeft, ArrowRight, Mail, CheckCircle2 } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/tools/financial-plan")({
  head: () => ({
    meta: [
      { title: "Financial Plan Builder — AI Asset IQ" },
      { name: "description", content: "Build your personalized financial plan in minutes with AI-guided steps." },
      { property: "og:title", content: "Financial Plan Builder" },
      { property: "og:description", content: "Build your personalized financial plan in minutes." },
    ],
  }),
  component: PlanBuilderPage,
});

type PlanState = {
  age: number;
  employment: string;
  dependents: number;
  income: number;
  expenses: number;
  debt: number;
  savings: number;
  investments: number;
  property: number;
  retirementAge: number;
  goals: string[];
  risk: number; // 0-100
};

const initial: PlanState = {
  age: 35, employment: "Employed", dependents: 1,
  income: 6500, expenses: 3500, debt: 600,
  savings: 25000, investments: 40000, property: 0,
  retirementAge: 65, goals: ["Retirement"], risk: 50,
};

const steps = ["Personal", "Income", "Assets", "Goals", "Results"] as const;
const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function PlanBuilderPage() {
  const [step, setStep] = useState(0);
  const [s, setS] = useState<PlanState>(initial);

  const update = <K extends keyof PlanState>(k: K, v: PlanState[K]) => setS((p) => ({ ...p, [k]: v }));

  return (
    <SiteShell>
      <PageHero eyebrow="Plan Builder" title="Build Your Financial Plan" subtitle="Five quick steps. A real plan at the end. Your data stays on this device." />

      <section className="mx-auto max-w-3xl px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="mb-2 flex justify-between text-xs text-muted-foreground">
            <span>Step {step + 1} of {steps.length}</span>
            <span>{steps[step]}</span>
          </div>
          <Progress value={((step + 1) / steps.length) * 100} />
        </div>

        <Card className="border-border/60 p-8">
          {step === 0 && <StepPersonal s={s} update={update} />}
          {step === 1 && <StepIncome s={s} update={update} />}
          {step === 2 && <StepAssets s={s} update={update} />}
          {step === 3 && <StepGoals s={s} update={update} />}
          {step === 4 && <StepResults s={s} />}

          <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-6">
            <Button variant="ghost" disabled={step === 0} onClick={() => setStep((n) => Math.max(0, n - 1))}>
              <ArrowLeft className="mr-1 h-4 w-4" /> Back
            </Button>
            {step < steps.length - 1 ? (
              <Button variant="hero" onClick={() => setStep((n) => Math.min(steps.length - 1, n + 1))}>
                Next <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button variant="hero" asChild>
                <Link to="/contact">Book Consultation <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            )}
          </div>
        </Card>
      </section>
    </SiteShell>
  );
}

type StepProps = { s: PlanState; update: <K extends keyof PlanState>(k: K, v: PlanState[K]) => void };

function StepPersonal({ s, update }: StepProps) {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold">A bit about you</h2>
      <div>
        <Label>Age: {s.age}</Label>
        <Slider value={[s.age]} min={18} max={80} onValueChange={(v) => update("age", v[0])} className="mt-3" />
      </div>
      <div>
        <Label>Employment status</Label>
        <Select value={s.employment} onValueChange={(v) => update("employment", v)}>
          <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
          <SelectContent>
            {["Employed", "Self-employed", "Unemployed", "Retired", "Student"].map((e) => (
              <SelectItem key={e} value={e}>{e}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Dependents: {s.dependents}</Label>
        <Slider value={[s.dependents]} min={0} max={8} onValueChange={(v) => update("dependents", v[0])} className="mt-3" />
      </div>
    </div>
  );
}

function StepIncome({ s, update }: StepProps) {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold">Income & expenses</h2>
      <NumField label="Monthly income" value={s.income} onChange={(v) => update("income", v)} />
      <NumField label="Monthly fixed expenses" value={s.expenses} onChange={(v) => update("expenses", v)} />
      <NumField label="Monthly debt obligations" value={s.debt} onChange={(v) => update("debt", v)} />
    </div>
  );
}

function StepAssets({ s, update }: StepProps) {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold">Assets & savings</h2>
      <NumField label="Cash savings" value={s.savings} onChange={(v) => update("savings", v)} />
      <NumField label="Investments (brokerage, 401k, IRA)" value={s.investments} onChange={(v) => update("investments", v)} />
      <NumField label="Property equity" value={s.property} onChange={(v) => update("property", v)} />
    </div>
  );
}

const goalOptions = ["Retirement", "Buy a home", "Education", "Travel", "Pay off debt", "Build emergency fund"];

function StepGoals({ s, update }: StepProps) {
  const toggle = (g: string) =>
    update("goals", s.goals.includes(g) ? s.goals.filter((x) => x !== g) : [...s.goals, g]);
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold">Goals</h2>
      <div>
        <Label>Retirement age: {s.retirementAge}</Label>
        <Slider value={[s.retirementAge]} min={Math.max(s.age + 1, 40)} max={85} onValueChange={(v) => update("retirementAge", v[0])} className="mt-3" />
      </div>
      <div>
        <Label className="mb-2 block">Major goals</Label>
        <div className="grid grid-cols-2 gap-2">
          {goalOptions.map((g) => (
            <label key={g} className="flex items-center gap-2 rounded-md border border-border p-3 transition-smooth hover:border-accent">
              <Checkbox checked={s.goals.includes(g)} onCheckedChange={() => toggle(g)} />
              <span className="text-sm">{g}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <Label>Risk tolerance: {s.risk < 33 ? "Conservative" : s.risk < 66 ? "Balanced" : "Aggressive"} ({s.risk})</Label>
        <Slider value={[s.risk]} min={0} max={100} onValueChange={(v) => update("risk", v[0])} className="mt-3" />
      </div>
    </div>
  );
}

function StepResults({ s }: { s: PlanState }) {
  const monthlySurplus = s.income - s.expenses - s.debt;
  const netWorth = s.savings + s.investments + s.property;
  const expectedReturn = 0.04 + (s.risk / 100) * 0.06; // 4% to 10%
  const years = Math.max(1, s.retirementAge - s.age);

  const data = useMemo(() => {
    const points: { age: number; netWorth: number }[] = [];
    let bal = netWorth;
    const monthlyAdd = Math.max(0, monthlySurplus);
    const r = expectedReturn / 12;
    for (let y = 0; y <= years; y++) {
      points.push({ age: s.age + y, netWorth: Math.round(bal) });
      for (let m = 0; m < 12; m++) bal = bal * (1 + r) + monthlyAdd;
    }
    return points;
  }, [netWorth, monthlySurplus, expectedReturn, years, s.age]);

  const focus: string[] = [];
  if (monthlySurplus < 0) focus.push("Stabilize cash flow — expenses exceed income.");
  if (s.debt > s.income * 0.3) focus.push("Aggressive debt paydown — debt service is over 30% of income.");
  if (s.savings < s.expenses * 3) focus.push("Build emergency fund to 3–6 months of expenses.");
  if (s.investments < s.income * 12) focus.push("Increase retirement contributions — investments are below 1× annual income.");
  if (s.dependents > 0 && s.investments + s.property < 250000) focus.push("Consider term life insurance to protect dependents.");
  if (s.goals.includes("Buy a home") && s.savings < 30000) focus.push("Open a dedicated home down-payment savings account.");
  if (focus.length === 0) focus.push("You're on a strong trajectory. Optimize tax efficiency and revisit annually.");

  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/.+@.+\..+/.test(email)) return;
    // [PLACEHOLDER] persist locally
    try {
      const list = JSON.parse(localStorage.getItem("plan:emails") || "[]");
      list.push({ email, at: new Date().toISOString(), state: s });
      localStorage.setItem("plan:emails", JSON.stringify(list));
    } catch { /* ignore */ }
    setEmailSent(true);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Your plan summary</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryStat label="Net worth today" value={fmt.format(netWorth)} />
        <SummaryStat label="Monthly surplus" value={fmt.format(monthlySurplus)} />
        <SummaryStat label="Projected at retirement" value={fmt.format(data[data.length - 1].netWorth)} highlight />
      </div>

      <div>
        <h3 className="mb-3 font-semibold">Recommended focus areas</h3>
        <ul className="space-y-2">
          {focus.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-3 font-semibold">Projected net worth</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="age" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickFormatter={(v: number) => `${Math.round(v / 1000)}k`} />
              <Tooltip
                contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }}
                formatter={(v) => fmt.format(Number(v))}
                labelFormatter={(v) => `Age ${v}`}
              />
              <Line type="monotone" dataKey="netWorth" stroke="var(--chart-1)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg border border-border/60 bg-card/30 p-5">
        <h4 className="font-semibold">Save & email my plan</h4>
        {emailSent ? (
          <p className="mt-2 flex items-center gap-2 text-sm text-accent"><CheckCircle2 className="h-4 w-4" /> Sent to {email}.</p>
        ) : (
          <form onSubmit={sendEmail} className="mt-3 flex gap-2">
            <Input type="email" placeholder="you@example.com" value={email} maxLength={255} onChange={(e) => setEmail(e.target.value)} required />
            <Button type="submit" variant="hero"><Mail className="mr-1 h-4 w-4" /> Email My Plan</Button>
          </form>
        )}
      </div>
    </div>
  );
}

function SummaryStat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-lg border p-4 ${highlight ? "border-transparent bg-gradient-accent text-accent-foreground" : "border-border/60"}`}>
      <p className={`text-xs ${highlight ? "text-accent-foreground/80" : "text-muted-foreground"}`}>{label}</p>
      <p className="mt-1 text-xl font-bold">{value}</p>
    </div>
  );
}

function NumField({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input type="number" value={value} min={0} onChange={(e) => onChange(Number(e.target.value) || 0)} className="mt-1.5" />
    </div>
  );
}
