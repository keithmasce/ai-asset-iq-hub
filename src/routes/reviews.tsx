import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { REVIEWS, type Review } from "@/data/reviews";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — AI Asset IQ" },
      { name: "description", content: "What enterprise and financial clients say about working with AI Asset IQ." },
      { property: "og:title", content: "Client Reviews — AI Asset IQ" },
      { property: "og:description", content: "Real reviews from enterprise and financial clients." },
    ],
  }),
  component: ReviewsPage,
});

type Filter = "All" | Review["service"];
const filters: Filter[] = ["All", "Enterprise", "Financial"];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-gold">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < n ? "fill-current" : "opacity-30"}`} />
      ))}
    </div>
  );
}

function ReviewsPage() {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = useMemo(
    () => (filter === "All" ? REVIEWS : REVIEWS.filter((r) => r.service === filter)),
    [filter],
  );

  const stats = useMemo(() => {
    const total = REVIEWS.length;
    const avg = REVIEWS.reduce((s, r) => s + r.rating, 0) / total;
    const breakdown = [5, 4, 3, 2, 1].map((star) => ({
      star,
      pct: (REVIEWS.filter((r) => r.rating === star).length / total) * 100,
    }));
    return { total, avg, breakdown };
  }, []);

  return (
    <SiteShell>
      <PageHero eyebrow="Reviews" title="What Our Clients Say" subtitle="Honest feedback from operators and individuals we've worked with." />

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Card className="grid gap-8 border-border/60 p-8 md:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">Average rating</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold">{stats.avg.toFixed(1)}</span>
              <Stars n={Math.round(stats.avg)} />
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total reviews</p>
            <p className="mt-2 text-4xl font-bold">{stats.total}</p>
          </div>
          <div>
            <p className="mb-2 text-sm text-muted-foreground">Breakdown</p>
            <div className="space-y-1">
              {stats.breakdown.map((b) => (
                <div key={b.star} className="flex items-center gap-2 text-xs">
                  <span className="w-3">{b.star}</span>
                  <Star className="h-3 w-3 fill-current text-gold" />
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-gradient-accent" style={{ width: `${b.pct}%` }} />
                  </div>
                  <span className="w-10 text-right text-muted-foreground">{Math.round(b.pct)}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <Button
              key={f}
              variant={filter === f ? "hero" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f}
            </Button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6">
          {filtered.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
              className="break-inside-avoid"
            >
              <Card className="border-border/60 p-6">
                <Stars n={r.rating} />
                <p className="mt-3 text-sm leading-relaxed">"{r.text}"</p>
                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs">
                  <div>
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-muted-foreground">{r.role}</p>
                  </div>
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-accent">{r.service}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-t border-border/50 bg-gradient-navy">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary-foreground">Work With Us</h2>
          <p className="mt-3 text-primary-foreground/80">Be our next 5-star story.</p>
          <div className="mt-6">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">Book a Consultation <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
