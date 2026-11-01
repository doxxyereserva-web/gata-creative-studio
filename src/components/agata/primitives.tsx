import { Link } from '@tanstack/react-router';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { categories, type Resource } from '@/lib/content';
import { useAgata } from './AgataExperience';
import { Wordmark } from './Logo';
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
 const reduced = useReducedMotion(); return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .65, delay }}>{children}</motion.div>;
}
export function Eyebrow({ children }: { children: ReactNode }) { return <p className="text-xs font-medium text-mineral">{children}</p>; }
export function ResourceCard({ r, index = 0 }: { r: Resource; index?: number }) {
 const { preview } = useAgata(); const cat = categories.find(c => c.slug === r.category);
 return <Reveal delay={(index % 3)*.06}><Button variant="ghost" onClick={() => preview(r)} className="group block h-auto w-full whitespace-normal rounded-none p-0 text-left hover:bg-transparent"><div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted"><img src={r.image} alt={r.name} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" /><span className="glass absolute bottom-3 right-3 grid size-9 place-items-center rounded-full"><ArrowUpRight /></span></div><div className="mt-4 flex items-center justify-between"><p className="text-xs text-mineral">{cat?.label}</p><p className="text-[10px] text-muted-foreground">Collection preview</p></div><h3 className="mt-2 text-lg font-medium">{r.name}</h3><p className="mt-2 text-sm font-normal leading-relaxed text-muted-foreground">{r.description}</p></Button></Reveal>;
}
export function Footer() { return <footer className="section-shell mt-24 border-t py-10"><div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-center"><Link to="/"><Wordmark /></Link><div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-muted-foreground">{categories.map(c => <Link key={c.slug} to="/$category" params={{ category:c.slug }} className="hover:text-foreground">{c.label}</Link>)}</div></div><div className="mt-10 flex flex-col justify-between gap-3 border-t pt-6 text-[11px] text-muted-foreground sm:flex-row"><p>© 2026 Ágata. Create beyond limits.</p><p>Not affiliated with Roblox Corporation.</p></div></footer>; }
