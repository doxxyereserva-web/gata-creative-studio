import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import type { ReactNode } from "react";
import { categories, formatPrice, type Resource } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{children}</p>;
}

export function ResourceCard({ r, index = 0 }: { r: Resource; index?: number }) {
  const cat = categories.find((c) => c.slug === r.category)!;
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <a href="#" className="group block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
          <img
            src={r.image}
            alt={r.name}
            loading="lazy"
            width={1200}
            height={900}
            className="size-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
          <span className="glass absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-medium">{cat.label}</span>
          <span className="glass absolute bottom-3 right-3 grid size-8 translate-y-2 place-items-center rounded-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="size-4" strokeWidth={1.6} />
          </span>
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[15px] font-medium tracking-tight">{r.name}</h3>
            <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">{r.description}</p>
          </div>
          <span className="shrink-0 text-[13px] font-medium tabular-nums">{formatPrice(r.price)}</span>
        </div>
        <div className="mt-3 flex items-center gap-3 border-t pt-3 text-[12px] text-muted-foreground">
          <span className="text-foreground/80">{r.creator}</span>
          <span className="size-0.5 rounded-full bg-muted-foreground" />
          <span className="font-mono">{r.meta}</span>
          <span className="ml-auto flex items-center gap-1 tabular-nums">
            <Star className="size-3 fill-agate text-agate" /> {r.rating.toFixed(1)}
          </span>
        </div>
      </a>
    </Reveal>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto mt-40 max-w-[1180px] border-t px-6 py-12 text-[13px] text-muted-foreground">
      <div className="flex flex-col justify-between gap-6 sm:flex-row">
        <p>© 2026 Ágata. Crafted for those who build worlds.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">Creators</a>
          <a href="#" className="hover:text-foreground">Licensing</a>
          <a href="#" className="hover:text-foreground">Privacy</a>
        </div>
      </div>
      <p className="mt-6 text-[11px]">Not affiliated with Roblox Corporation.</p>
    </footer>
  );
}
