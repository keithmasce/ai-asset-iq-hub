import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — AI Asset IQ" },
      { name: "description", content: "Insights on AI, energy, and modern financial planning." },
      { property: "og:title", content: "AI Asset IQ Blog" },
      { property: "og:description", content: "Insights on AI, energy, and modern financial planning." },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [cat, setCat] = useState<(typeof BLOG_CATEGORIES)[number]>("All");
  const posts = useMemo(
    () => (cat === "All" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === cat)),
    [cat],
  );

  return (
    <SiteShell>
      <PageHero eyebrow="Insights" title="The AI Asset IQ Blog" subtitle="Field notes from the intersection of AI, energy, and money." />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {BLOG_CATEGORIES.map((c) => (
            <Button key={c} variant={cat === c ? "hero" : "outline"} size="sm" onClick={() => setCat(c)}>
              {c}
            </Button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <motion.div key={p.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 6) * 0.05 }}>
              <Link to="/blog/$slug" params={{ slug: p.slug }}>
                <Card className="group h-full overflow-hidden border-border/60 transition-smooth hover:border-accent hover:shadow-glow">
                  {/* [PLACEHOLDER] featured image */}
                  <div className="aspect-[16/10] bg-gradient-navy" />
                  <div className="p-6">
                    <span className="text-xs font-medium uppercase tracking-wider text-accent">{p.category}</span>
                    <h3 className="mt-2 line-clamp-2 text-lg font-semibold group-hover:text-accent">{p.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{p.date}</span>
                      <span>{p.readTime} read</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
