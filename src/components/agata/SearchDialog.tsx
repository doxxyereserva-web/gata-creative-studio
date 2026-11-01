import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { categories, formatPrice, resources } from "@/lib/content";

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setQ("");
    const t = setTimeout(() => input.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const results = resources.filter((r) => `${r.name} ${r.creator} ${r.description}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-background/40 px-4 pt-[14vh] backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Search Ágata"
        >
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-xl overflow-hidden rounded-2xl"
          >
            <div className="flex items-center gap-3 border-b border-glass-border px-5">
              <Search className="size-4 text-muted-foreground" strokeWidth={1.6} />
              <input
                ref={input}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search scripts, effects, models…"
                className="h-14 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
              />
              <kbd className="rounded-md border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">ESC</kbd>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && <li className="px-4 py-10 text-center text-sm text-muted-foreground">Nothing matches “{q}”.</li>}
              {results.map((r) => (
                <li key={r.id}>
                  <button className="group flex w-full items-center gap-4 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-foreground/[0.05]">
                    <img src={r.image} alt="" className="size-10 rounded-lg object-cover" />
                    <span className="flex-1">
                      <span className="block text-sm font-medium">{r.name}</span>
                      <span className="block text-xs text-muted-foreground">
                        {categories.find((c) => c.slug === r.category)?.label} · {r.creator}
                      </span>
                    </span>
                    <span className="text-xs text-muted-foreground">{formatPrice(r.price)}</span>
                    <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-60" />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
