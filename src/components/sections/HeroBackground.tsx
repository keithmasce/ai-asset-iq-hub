import { motion } from "framer-motion";

/**
 * Animated grid + particle background for hero sections.
 * Subtle, techy feel — uses CSS grid lines and floating dots.
 */
export function HeroBackground() {
  const particles = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 grid-bg" />
      {particles.map((_, i) => (
        <motion.span
          key={i}
          className="particle absolute h-1 w-1 rounded-full bg-accent"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 100}%`,
            animationDelay: `${(i % 6) * 1.2}s`,
            boxShadow: "0 0 12px var(--accent)",
          }}
        />
      ))}
    </div>
  );
}