import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CreditCard, ScrollText, HeartPulse, Umbrella, Calculator, Wallet, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/financial")({
  head: () => ({
    meta: [
      { title: "Financial Planning Powered by AI — AI Asset IQ" },
      { name: "description", content: "Smarter financial products and personalized AI-built plans — debt relief, insurance, wills, and wealth protection." },
      { property: "og:title", content: "Financial Planning Powered by AI" },
      { property: "og:description", content: "Personalized AI-built financial plans for individuals and families." },
    ],
  }),
  component: FinancialPage,
});

const services = [
  { icon: CreditCard, title: "Debt Refinancing", text: "AI-matched refinancing recommendations across mortgages, student, and consumer debt." },
  { icon: ScrollText, title: "Will & Trust", text: "Estate planning guidance and product referrals tailored to your family." },
  { icon: HeartPulse, title: "Health Insurance", text: "Coverage analysis and plan comparison so you stop overpaying for the wrong coverage." },
  { icon: Umbrella, title: "Life Insurance", text: "Personalized protection recommendations matched to your obligations and goals." },
];

const tools = [
  { to: "/tools/financial-plan" as const, icon: Wallet, title: "Financial Plan Builder", text: "A guided wizard that generates your custom plan in minutes." },
  { to: "/tools/retirement" as const, icon: Calculator, title: "Retirement Calculator", text: "See your retirement trajectory in real time with sliders and live projections." },
];

function FinancialPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Personal Finance"
        title="Your Financial Future, Powered by AI"
        subtitle="We help individuals access smarter financial products and build personalized plans using AI — from debt relief to wealth protection."
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Card className="h-full border-border/60 p-6 transition-smooth hover:border-accent">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-gradient-gold">
                  <s.icon className="h-5 w-5 text-gold-foreground" />
                </div>
                <h4 className="font-semibold">{s.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-y border-border/50 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Interactive Tools</h2>
            <p className="mt-3 text-muted-foreground">Free, no-signup tools to help you think clearly about your money.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {tools.map((t) => (
              <Link key={t.to} to={t.to}>
                <Card className="group h-full overflow-hidden border-border/60 p-8 transition-smooth hover:border-accent hover:shadow-glow">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-accent">
                    <t.icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold">{t.title}</h3>
                  <p className="mt-2 text-muted-foreground">{t.text}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-accent">
                    Open tool <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-navy">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">Start Your Financial Assessment</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">Five minutes. A real plan. Zero pressure.</p>
          <div className="mt-8">
            <Button variant="gold" size="xl" asChild>
              <Link to="/tools/financial-plan">Begin Assessment <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
