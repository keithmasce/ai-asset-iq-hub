import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun, Menu, X, Brain } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/enterprise", label: "Enterprise" },
  { to: "/financial", label: "Financial" },
  { to: "/blog", label: "Blog" },
  { to: "/reviews", label: "Reviews" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-accent shadow-glow">
            <Brain className="h-5 w-5 text-accent-foreground" />
          </div>
          <span className="text-lg">AI Asset<span className="text-accent">IQ</span></span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button variant="hero" className="hidden md:inline-flex" onClick={() => navigate({ to: "/contact" })}>
            Book a Call
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/50 bg-background md:hidden">
          <nav className="flex flex-col p-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Button variant="hero" className="mt-3" onClick={() => { setOpen(false); navigate({ to: "/contact" }); }}>
              Book a Call
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}