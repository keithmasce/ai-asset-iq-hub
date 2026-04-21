import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";

/**
 * Simple email capture for "Coming Soon" agent cards.
 * Stores submissions in localStorage under `notify:<key>`.
 */
export function NotifyForm({ agentKey }: { agentKey: string }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || trimmed.length > 255 || !/.+@.+\..+/.test(trimmed)) return;
    try {
      const key = `notify:${agentKey}`;
      const list: string[] = JSON.parse(localStorage.getItem(key) || "[]");
      list.push(trimmed);
      localStorage.setItem(key, JSON.stringify(list));
    } catch {
      // ignore storage errors
    }
    setDone(true);
    setEmail("");
  };

  if (done) {
    return (
      <div className="flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-3 py-2 text-sm text-accent">
        <Check className="h-4 w-4" /> You're on the list.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <Input
        type="email"
        placeholder="you@company.com"
        value={email}
        maxLength={255}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" variant="hero">Notify Me</Button>
    </form>
  );
}