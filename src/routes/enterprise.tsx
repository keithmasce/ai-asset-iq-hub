import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sun, Flame, Zap, Brain, Cog, BarChart3, Network, Shield, Activity, Gauge, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/sections/PageHero";
import { NotifyForm } from "@/components/sections/NotifyForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/enterprise")({
  head: () => ({
    meta: [
      { title: "Enterprise AI Consulting — AI Asset IQ" },
      { name: "description", content: "AI consulting for renewable energy, oil & gas, and utilities. Automate processes, optimize assets, deliver measurable value." },
      { property: "og:title", content: "Enterprise AI Consulting — AI Asset IQ" },
      { property: "og:description", content: "AI consulting for renewable energy, oil & gas, and utilities." },
    ],
  }),
  component: EnterprisePage,
});

const sectors = [
  { icon: Sun, title: "Renewable Energy", text: "Solar, wind, and storage automation. Forecasting, asset health, and yield optimization." },
  { icon: Flame, title: "Oil & Gas", text: "Upstream and midstream process intelligence. Predictive maintenance and throughput tuning." },
  { icon: Zap, title: "Utilities", text: "Grid management, load forecasting, and infrastructure optimization for modern utilities." },
];

const services = [
  { icon: Brain, title: "AI Strategy", text: "Roadmaps that prioritize ROI, data readiness, and organizational change." },
  { icon: Cog, title: "Process Automation", text: "Identify, design, and deploy automations that compound across the org." },
  { icon: BarChart3, title: "Asset Intelligence", text: "Models that turn telemetry into uptime, safety, and yield improvements." },
  { icon: Network, title: "Systems Integration", text: "Connect SCADA, ERP, CMMS, and modern AI stacks into one operational layer." },
];

const agents = [
  { key: "safety", icon: Shield, title: "Safety Agent", text: "Proactive safety monitoring and incident prevention for industrial operations." },
  { key: "reliability", icon: Activity, title: "Reliability Agent", text: "Predictive maintenance and uptime optimization for critical assets." },
  { key: "grid", icon: Gauge, title: "Grid Agent", text: "Real-time grid intelligence and load management for utilities." },
];

function EnterprisePage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Enterprise"
        title="AI Consulting for the Industries That Power the World"
        subtitle="We help small and medium businesses in renewable energy, oil & gas, and utilities harness AI to automate processes, optimize assets, and deliver measurable value."
      />

      {/* Sectors */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {sectors.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="h-full border-border/60 p-8 transition-smooth hover:border-accent">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-accent">
                  <s.icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="border-y border-border/50 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold sm:text-4xl">Services</h2>
            <p className="mt-3 text-muted-foreground">End-to-end capability across the AI lifecycle.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <Card key={s.title} className="border-border/60 p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent">
                  <s.icon className="h-5 w-5" />
                </div>
                <h4 className="font-semibold">{s.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Agents */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge variant="outline" className="border-gold text-gold">Coming Soon</Badge>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Our AI Agents</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Purpose-built agents for industrial operations. Get notified when each launches.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {agents.map((a) => (
            <Card key={a.key} className="flex h-full flex-col border-border/60 p-8">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-gold">
                <a.icon className="h-6 w-6 text-gold-foreground" />
              </div>
              <h3 className="text-xl font-semibold">{a.title}</h3>
              <p className="mt-2 flex-1 text-muted-foreground">{a.text}</p>
              <div className="mt-6">
                <NotifyForm agentKey={a.key} />
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/50 bg-gradient-navy">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">Ready to put AI to work?</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Book a no-pressure consultation. We'll map the highest-ROI moves for your operation.
          </p>
          <div className="mt-8">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">Book a Consultation <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
