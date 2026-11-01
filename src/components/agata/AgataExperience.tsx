import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { ArrowRight, EyeOff, MessageCircle, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import type { Resource } from '@/lib/content';
import { SearchDialog } from './SearchDialog';
import { AgataMark, mascotImage } from './Logo';
const Experience = createContext<{ search: () => void; preview: (r: Resource) => void; account: () => void }>({ search: () => {}, preview: () => {}, account: () => {} });
export const useAgata = () => useContext(Experience);
export function AgataExperience({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [resource, setResource] = useState<Resource | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [help, setHelp] = useState(false);
  const path = useRouterState({ select: s => s.location.pathname });
  useEffect(() => { setHidden(localStorage.getItem('agata-mascot-hidden') === 'true'); }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setSearchOpen(v => !v); } };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, []);
  const hide = (value: boolean) => { setHidden(value); setHelp(false); localStorage.setItem('agata-mascot-hidden', String(value)); };
  return <Experience.Provider value={{ search: () => setSearchOpen(true), preview: setResource, account: () => setAccountOpen(true) }}>
    {children}
    <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} onSelect={r => { setSearchOpen(false); setResource(r); }} />
    <Dialog open={Boolean(resource)} onOpenChange={v => { if (!v) setResource(null); }}>
      <DialogContent className="max-w-2xl overflow-hidden rounded-lg p-0">
        {resource && <><img src={resource.image} alt={resource.name} className="aspect-[16/10] w-full object-cover" /><div className="p-7"><p className="mb-3 text-xs text-mineral">Collection preview</p><DialogTitle className="text-2xl">{resource.name}</DialogTitle><DialogDescription className="mt-3 leading-relaxed">{resource.description}</DialogDescription><p className="mt-5 text-xs text-muted-foreground">Sample resource · Downloads are not available.</p></div></>}
      </DialogContent>
    </Dialog>
    <Dialog open={accountOpen} onOpenChange={setAccountOpen}><DialogContent className="rounded-lg"><AgataMark className="size-16" /><DialogTitle>Your creative space.</DialogTitle><DialogDescription>Accounts are not connected yet. You can explore the collection without signing in.</DialogDescription><Button onClick={() => { setAccountOpen(false); setSearchOpen(true); }} className="mt-3 rounded-full">Explore the collection <ArrowRight /></Button></DialogContent></Dialog>
    <aside className="companion fixed bottom-5 right-5 z-30">
      {help && !hidden && <div className="glass mb-3 w-72 rounded-lg p-5"><div className="flex items-center justify-between"><p className="text-sm font-medium">A little inspiration?</p><Button variant="ghost" size="icon" aria-label="Close assistance" onClick={() => setHelp(false)}><X /></Button></div><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{path.includes('scripts') ? 'Build your next system. Explore the script collection.' : path.includes('vfx') ? 'Find the effect that brings your world to life.' : 'What will you create next?'}</p><Button variant="ghost" className="mt-3 w-full justify-start px-0 text-mineral" onClick={() => { setHelp(false); setSearchOpen(true); }}><Search /> Find a resource</Button><Button variant="ghost" asChild className="w-full justify-start px-0"><Link to="/$category" params={{ category: 'discover' }} onClick={() => setHelp(false)}>Explore all collections <ArrowRight /></Link></Button><Button variant="ghost" className="mt-3 h-7 px-0 text-xs text-muted-foreground" onClick={() => hide(true)}><EyeOff /> Hide mascot</Button></div>}
      {hidden ? <Button variant="outline" size="icon" className="float-right rounded-full glass" aria-label="Restore mascot" title="Restore mascot" onClick={() => hide(false)}><MessageCircle /></Button> : <div className="flex items-end justify-end gap-1"><Button variant="ghost" size="icon" className="size-7 rounded-full text-muted-foreground" aria-label="Hide mascot" title="Hide mascot" onClick={() => hide(true)}><EyeOff className="size-3" /></Button><Button variant="ghost" aria-label="Ask Ágata" title="Ask Ágata" onClick={() => setHelp(v => !v)} className="h-auto rounded-full p-0"><img src={mascotImage} alt="" className="mascot-mark size-[72px] transition-transform hover:-translate-y-1" /></Button></div>}
    </aside>
  </Experience.Provider>;
}
