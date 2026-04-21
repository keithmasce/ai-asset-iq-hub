import { Link } from "@tanstack/react-router";
import { Brain, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-accent">
                <Brain className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="text-lg">AI Asset<span className="text-accent">IQ</span></span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              AI-powered consulting for enterprise assets and personal financial growth. Intelligent assets, smarter futures.
            </p>
            <div className="mt-6 flex gap-3">
              {/* [PLACEHOLDER] social links */}
              <a href="#" className="rounded-md border border-border p-2 text-muted-foreground transition-smooth hover:border-accent hover:text-accent">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-md border border-border p-2 text-muted-foreground transition-smooth hover:border-accent hover:text-accent">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="mailto:hello@aiassetiq.com" className="rounded-md border border-border p-2 text-muted-foreground transition-smooth hover:border-accent hover:text-accent">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Solutions</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/enterprise" className="hover:text-foreground">Enterprise</Link></li>
              <li><Link to="/financial" className="hover:text-foreground">Financial Planning</Link></li>
              <li><Link to="/tools/financial-plan" className="hover:text-foreground">Plan Builder</Link></li>
              <li><Link to="/tools/retirement" className="hover:text-foreground">Retirement Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/blog" className="hover:text-foreground">Blog</Link></li>
              <li><Link to="/reviews" className="hover:text-foreground">Reviews</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} AI Asset IQ. All rights reserved.</p>
          <p>hello@aiassetiq.com</p>
        </div>
      </div>
    </footer>
  );
}