import { createFileRoute, Link } from '@tanstack/react-router';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Eyebrow, Footer, Reveal } from '@/components/agata/primitives';
import { expressions, mascotImage, Mascot, type Expression } from '@/components/agata/Logo';
import { useAgata } from '@/components/agata/AgataExperience';
import { LanguageSelect } from '@/components/agata/Nav';
import { languages, useI18n } from '@/lib/i18n';
import { projectModules, workspaceSpaces } from '@/lib/platform';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Ágata — Create beyond limits' },
    { name: 'description', content: 'Ágata is a Roblox development platform organised by projects, workspaces and teams — in development.' },
    { property: 'og:title', content: 'Ágata — Create beyond limits' },
    { property: 'og:description', content: 'A Roblox development platform organised by projects, workspaces and teams.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Home,
});

const moods: Expression[] = ['love', 'excited', 'curious', 'reading', 'sleepy', 'peek'];
const traits: Record<string, string> = { love: 'Greets you when you arrive.', excited: 'Celebrates when something ships.', curious: 'Asks before guessing.', reading: 'Explains guides and docs.', sleepy: 'Rests when you hide it.', peek: 'Always one click away.' };

function Home() {
  const { t } = useI18n(); const agata = useAgata(); const reduced = useReducedMotion();
  return <main>
    <section className="hero-scene relative overflow-hidden">
      <img src={mascotImage} alt="Ágata, the hooded mascot, holding an agate crystal" className="hero-mascot" />
      <div className="hero-shade" />
      <div className="section-shell hero-content relative">
        <motion.div className="hero-copy max-w-xl" initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9 }}>
          <p className="text-xs text-hero-muted">{t('eyebrow')}</p>
          <h1 className="hero-title mt-6 font-normal">{t('title1')}<br />{t('title2')}</h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-hero-muted">{t('sub')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={agata.access} className="h-12 rounded-full bg-hero-foreground px-6 text-hero-background hover:bg-hero-foreground/90">{t('cta')} <ArrowRight /></Button>
            <Button asChild variant="ghost" className="h-12 rounded-full px-6 text-hero-foreground hover:bg-hero-foreground/10 hover:text-hero-foreground"><Link to="/projects">{t('projects')}</Link></Button>
          </div>
        </motion.div>
        <div className="hero-bottom flex items-center justify-between text-xs text-hero-muted"><span>{t('soon')} · 2026</span><span>Agate · Ágata</span></div>
      </div>
    </section>

    <section className="section-shell py-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <Reveal><Eyebrow>{t('mascot')}</Eyebrow><h2 className="section-title mt-4">Your creative companion.</h2><p className="mt-5 max-w-md leading-relaxed text-muted-foreground">Friendly, curious, creative and helpful. Ágata lives in the corner of every page, reacts to what you do, and steps aside when you need focus.</p>
          <div className="mt-8 flex flex-wrap gap-2">{(['success', 'alert'] as const).map(m => <span key={m} className="glass flex items-center gap-3 rounded-full py-1.5 ps-1.5 pe-4 text-xs"><Mascot mood={m} className="size-8" />{m === 'success' ? 'All set!' : 'Something went wrong. Try again later.'}</span>)}</div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">{moods.map((m, i) => <Reveal key={m} delay={i * .05}><figure className="mascot-tile rounded-lg p-4 text-center"><img src={expressions[m].src} alt={`Ágata — ${expressions[m].label}`} className="mx-auto aspect-square w-full max-w-36 rounded-md object-cover" /><figcaption className="mt-3 text-sm font-medium">{expressions[m].label}</figcaption><p className="mt-1 text-xs text-muted-foreground">{traits[m]}</p></figure></Reveal>)}</div>
      </div>
    </section>

    <section className="collection-band py-28"><div className="section-shell">
      <Reveal><Eyebrow>{t('projects')}</Eyebrow><h2 className="section-title mt-4 max-w-2xl">Everything is a project. Every project is complete.</h2><p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">Each project on Ágata is organised into the same six parts, so you always know where to look.</p></Reveal>
      <div className="mt-14 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-3">{projectModules.map((m, i) => <Reveal key={m.title} delay={(i % 3) * .05} className="bg-background p-8"><div className="flex items-center justify-between"><m.icon className="size-5 text-mineral" /><span className="font-mono text-xs text-muted-foreground">0{i + 1}</span></div><h3 className="mt-8 text-lg font-medium">{m.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.text}</p></Reveal>)}</div>
      <Button asChild variant="ghost" className="mt-8 px-0 text-mineral"><Link to="/projects">How projects work <ArrowRight /></Link></Button>
    </div></section>

    <section className="section-shell py-28"><div className="grid gap-14 lg:grid-cols-2">
      <Reveal><Eyebrow>{t('workspaces')}</Eyebrow><h2 className="section-title mt-4">Spaces for the way you work.</h2><p className="mt-5 max-w-md leading-relaxed text-muted-foreground">From a solo builder to a full studio — workspaces, teams and roles keep projects organised.</p><Button asChild variant="ghost" className="mt-6 px-0 text-mineral"><Link to="/workspaces">Explore workspaces <ArrowRight /></Link></Button></Reveal>
      <div className="divide-y border-y">{workspaceSpaces.map(s => <div key={s.title} className="flex gap-5 py-6"><s.icon className="mt-1 size-5 shrink-0 text-mineral" /><div><h3 className="font-medium">{s.title}</h3><p className="mt-1 text-sm text-muted-foreground">{s.text}</p></div></div>)}</div>
    </div></section>

    <section className="section-shell"><Reveal className="glass flex flex-col gap-8 rounded-lg p-10 sm:p-14 lg:flex-row lg:items-center lg:justify-between">
      <div><Languages className="size-6 text-mineral" /><h2 className="section-title mt-5">{languages.length} languages, automatically.</h2><p className="mt-4 max-w-md leading-relaxed text-muted-foreground">Ágata opens in the language of your region. You can change it at any time.</p></div>
      <LanguageSelect className="w-fit rounded-full border" />
    </Reveal></section>

    <section className="section-shell py-28 text-center"><Reveal><Mascot mood="peek" className="mx-auto size-24" /><h2 className="section-title mx-auto mt-6 max-w-lg">Be there when it opens.</h2><Button onClick={agata.access} className="mt-8 h-12 rounded-full px-7">{t('cta')} <ArrowRight /></Button></Reveal></section>
    <Footer />
  </main>;
}
