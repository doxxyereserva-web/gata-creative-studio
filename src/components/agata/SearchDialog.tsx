import { useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { categories, resources, type Resource } from '@/lib/content';
import { AgataMark } from './Logo';
export function SearchDialog({ open, onClose, onSelect }: { open: boolean; onClose: () => void; onSelect: (r: Resource) => void }) {
  const [q, setQ] = useState('');
  const results = resources.filter(r => `${r.name} ${r.description} ${r.category}`.toLowerCase().includes(q.toLowerCase()));
  return <Dialog open={open} onOpenChange={value => { if (!value) { onClose(); setQ(''); } }}><DialogContent className="glass max-w-xl gap-0 rounded-lg p-0"><DialogTitle className="sr-only">Search Ágata</DialogTitle><DialogDescription className="sr-only">Find scripts, effects, models and development tools.</DialogDescription><div className="flex items-center gap-3 border-b px-5 pr-12"><Search className="size-4 shrink-0 text-mineral" /><input aria-label="Search resources" autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="What do you want to create?" className="h-16 min-w-0 flex-1 bg-transparent text-sm outline-none" /></div><div className="max-h-[60vh] overflow-y-auto p-3"><p className="px-3 py-2 text-xs text-muted-foreground">{q ? 'Search results' : 'From the collection'}</p>{!results.length && <div className="py-9 text-center"><AgataMark className="mx-auto size-20" /><p className="mt-4 text-sm text-muted-foreground">No resources found.</p></div>}{results.map(r => <Button key={r.id} variant="ghost" onClick={() => { onSelect(r); setQ(''); }} className="h-auto w-full justify-start whitespace-normal rounded-lg px-3 py-3 text-left"><img src={r.image} alt="" className="size-12 rounded-md object-cover" /><span className="min-w-0 flex-1"><span className="block text-sm">{r.name}</span><span className="block text-xs text-muted-foreground">{categories.find(c => c.slug === r.category)?.label}</span></span><ArrowUpRight className="text-muted-foreground" /></Button>)}</div></DialogContent></Dialog>;
}
