import { createFileRoute, notFound } from '@tanstack/react-router';
import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories, resources } from '@/lib/content';
import { Eyebrow, Footer, ResourceCard } from '@/components/agata/primitives';
import { AgataMark } from '@/components/agata/Logo';
import { useAgata } from '@/components/agata/AgataExperience';
const pages: Record<string,{title:string;label:string;intro:string}> = {
 discover:{ label:'Discover',title:'Your next possibility.',intro:'Explore scripts, visual effects, models and tools for the worlds you want to build.' },
 scripts:{ label:'Scripts',title:'The invisible craft.',intro:'Luau systems for combat, data, networking and interfaces.' },
 vfx:{ label:'VFX',title:'Light, in motion.',intro:'Particle effects, trails and moments that bring a world to life.' },
 models:{ label:'3D Models',title:'Worlds take shape.',intro:'Meshes, modular assets and creative building blocks for Roblox Studio.' },
 resources:{ label:'Development Tools',title:'Space for better ideas.',intro:'Plugins, templates and utilities for your creative workflow.' },
};
export const Route = createFileRoute('/$category')({ loader: ({params}) => { if (!pages[params.category]) throw notFound(); return {slug:params.category}; }, head: ({loaderData}) => { const p = loaderData ? pages[loaderData.slug] : undefined; const title = `${p?.label ?? 'Unavailable'} — Ágata`; return {meta:[{title},{name:'description',content:p?.intro ?? 'Discover creative resources on Ágata.'},{property:'og:title',content:title},{property:'og:description',content:p?.intro ?? 'Discover creative resources on Ágata.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}; },component:CategoryPage });
function CategoryPage() {
 const {slug}=Route.useLoaderData(); const page=pages[slug]; const [filter,setFilter]=useState('All'); const [category,setCategory]=useState('all'); const agata=useAgata(); if (!page) return null;
 const base=slug==='discover' ? resources : resources.filter(r => r.category===slug);
 const list=base.filter(r => (category==='all' || r.category===category) && (filter==='All' || (filter==='Free' ? r.price===null : r.price!==null)));
 return <main><section className="section-shell pb-10 pt-36 sm:pt-44"><Eyebrow>Ágata / {page.label}</Eyebrow><h1 className="category-title mt-5 font-normal">{page.title}</h1><div className="mt-6 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><p className="max-w-md text-base leading-relaxed text-muted-foreground">{page.intro}</p><Button variant="outline" className="h-11 rounded-full px-5" onClick={agata.search}><Search /> Search collection</Button></div></section><section className="section-shell"><div className="flex flex-wrap items-center justify-between gap-5 border-y py-5">{slug==='discover' ? <div className="flex flex-wrap gap-2">{[{slug:'all',label:'All disciplines'},...categories].map(c => <Button key={c.slug} variant={category===c.slug ? 'secondary':'ghost'} className="rounded-full text-xs" onClick={() => setCategory(c.slug)}>{c.label}</Button>)}</div> : <p className="text-sm text-muted-foreground">{page.label} collection</p>}<div className="flex items-center gap-1"><SlidersHorizontal className="mr-2 size-4 text-muted-foreground" />{['All','Free','Premium'].map(f => <Button key={f} size="sm" variant={filter===f ? 'default':'ghost'} className="rounded-full" aria-pressed={filter===f} onClick={() => setFilter(f)}>{f}</Button>)}</div></div><p className="mt-6 text-xs text-muted-foreground">Sample collection · Pricing and availability are not verified.</p><div className="mt-8 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{list.map((r,i)=><ResourceCard key={r.id} r={r} index={i}/>)}</div>{!list.length && <div className="py-20 text-center"><AgataMark className="mx-auto size-24" /><h2 className="mt-5 text-xl">A little quiet here.</h2><p className="mt-3 text-sm text-muted-foreground">No resources match this selection.</p><Button variant="ghost" className="mt-4 text-mineral" onClick={() => {setFilter('All');setCategory('all');}}>Clear filters</Button></div>}</section><Footer /></main>;
}
