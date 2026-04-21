import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS, type BlogPost } from "@/data/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = BLOG_POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — AI Asset IQ` },
          { name: "description", content: loaderData.post.excerpt },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.excerpt },
          { property: "og:type", content: "article" },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-32 text-center">
        <h1 className="text-3xl font-bold">Post not found</h1>
        <Button variant="hero" className="mt-6" asChild>
          <Link to="/blog">Back to blog</Link>
        </Button>
      </div>
    </SiteShell>
  ),
  errorComponent: ({ error }) => (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-32 text-center">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
      </div>
    </SiteShell>
  ),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData() as { post: BlogPost };
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  // Build a TOC from paragraphs (simple [PLACEHOLDER] strategy)
  const sections = post.content.split("\n\n").map((para: string, i: number) => ({
    id: `section-${i + 1}`,
    label: `Section ${i + 1}`,
    text: para,
  }));

  return (
    <SiteShell>
      {/* Hero */}
      <section className="border-b border-border/50 bg-gradient-navy">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <Link to="/blog" className="text-sm text-primary-foreground/70 hover:text-primary-foreground">← Back to blog</Link>
          <p className="mt-6 text-xs font-medium uppercase tracking-widest text-accent">{post.category}</p>
          <h1 className="mt-3 text-3xl font-bold text-primary-foreground sm:text-4xl md:text-5xl">{post.title}</h1>
          <div className="mt-6 flex items-center gap-4 text-sm text-primary-foreground/70">
            <span>{post.author}</span><span>·</span><span>{post.date}</span><span>·</span><span>{post.readTime} read</span>
          </div>
        </div>
      </section>

      {/* [PLACEHOLDER] hero image */}
      <div className="mx-auto -mt-8 max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="aspect-[16/8] rounded-lg bg-gradient-accent shadow-elegant" />
      </div>

      {/* Body + TOC */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_220px]">
          <article className="prose prose-invert max-w-none">
            {sections.map((s) => (
              <div key={s.id} id={s.id}>
                <p className="text-base leading-relaxed text-foreground">{s.text}</p>
              </div>
            ))}

            <div className="mt-12 flex gap-2">
              <span className="text-sm text-muted-foreground">Share:</span>
              <a href="#" aria-label="Share on Twitter" className="rounded-md border border-border p-1.5 hover:border-accent hover:text-accent"><Twitter className="h-4 w-4" /></a>
              <a href="#" aria-label="Share on LinkedIn" className="rounded-md border border-border p-1.5 hover:border-accent hover:text-accent"><Linkedin className="h-4 w-4" /></a>
              <a href="#" aria-label="Copy link" className="rounded-md border border-border p-1.5 hover:border-accent hover:text-accent"><LinkIcon className="h-4 w-4" /></a>
            </div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">On this page</p>
              <ul className="mt-3 space-y-2 text-sm">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-muted-foreground hover:text-accent">{s.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-border/50 bg-card/30">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold">Related posts</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} to="/blog/$slug" params={{ slug: r.slug }}>
                  <Card className="group h-full overflow-hidden border-border/60 transition-smooth hover:border-accent">
                    <div className="aspect-[16/10] bg-gradient-navy" />
                    <div className="p-6">
                      <span className="text-xs font-medium uppercase tracking-wider text-accent">{r.category}</span>
                      <h3 className="mt-2 line-clamp-2 font-semibold group-hover:text-accent">{r.title}</h3>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteShell>
  );
}
