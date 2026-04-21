import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, CalendarDays } from "lucide-react";
import { z } from "zod";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/sections/PageHero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — AI Asset IQ" },
      { name: "description", content: "Book a consultation with AI Asset IQ." },
      { property: "og:title", content: "Contact AI Asset IQ" },
      { property: "og:description", content: "Book a consultation with AI Asset IQ." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  service: z.enum(["Enterprise", "Financial", "General"]),
  message: z.string().trim().min(1, "Required").max(1000),
});

function ContactPage() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone") || "",
      service: fd.get("service"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }
    // [PLACEHOLDER] send to backend / email service
    try {
      const list = JSON.parse(localStorage.getItem("contact:submissions") || "[]");
      list.push({ ...parsed.data, at: new Date().toISOString() });
      localStorage.setItem("contact:submissions", JSON.stringify(list));
    } catch { /* ignore */ }
    setError(null);
    setDone(true);
    e.currentTarget.reset();
  };

  return (
    <SiteShell>
      <PageHero eyebrow="Contact" title="Let's talk." subtitle="Tell us a bit about what you're working on. We'll respond within one business day." />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Get in touch</h2>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent"><Mail className="h-4 w-4" /></div>
                <a href="mailto:hello@aiassetiq.com" className="hover:text-accent">hello@aiassetiq.com</a>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent"><Phone className="h-4 w-4" /></div>
                <span className="text-muted-foreground">+1 (555) 010-AIIQ</span> {/* [PLACEHOLDER] */}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent"><MapPin className="h-4 w-4" /></div>
                <span className="text-muted-foreground">Global · Remote-first</span>
              </div>
            </div>

            {/* [PLACEHOLDER] map */}
            <div className="mt-8 aspect-[16/10] overflow-hidden rounded-lg border border-border bg-gradient-navy">
              <div className="grid h-full place-items-center text-sm text-primary-foreground/60">[PLACEHOLDER] Map</div>
            </div>

            <div className="mt-8">
              <Button variant="outlineAccent" asChild>
                {/* [PLACEHOLDER] Calendly link */}
                <a href="https://calendly.com/" target="_blank" rel="noreferrer">
                  <CalendarDays className="mr-2 h-4 w-4" /> Book a Call
                </a>
              </Button>
            </div>
          </div>

          <Card className="border-border/60 p-8">
            {done ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <h3 className="text-2xl font-semibold">Thanks — we received your message.</h3>
                <p className="mt-3 text-muted-foreground">We'll be in touch within one business day.</p>
                <Button variant="outline" className="mt-6" onClick={() => setDone(false)}>Send another</Button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required maxLength={100} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required maxLength={255} className="mt-1.5" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input id="phone" name="phone" type="tel" maxLength={40} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="service">Service Interest</Label>
                    <Select name="service" defaultValue="General">
                      <SelectTrigger id="service" className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                        <SelectItem value="Financial">Financial</SelectItem>
                        <SelectItem value="General">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" required maxLength={1000} rows={5} className="mt-1.5" />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" variant="hero" size="lg" className="w-full">Send message</Button>
              </form>
            )}
          </Card>
        </div>
      </section>
    </SiteShell>
  );
}
