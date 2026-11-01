import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { categories, images, resources } from "@/lib/content";
import { Eyebrow, Footer, Reveal, ResourceCard } from "@/components/agata/primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ágata — Create beyond limits" },
      { name: "description", content: "Scripts, visual effects, 3D models and tools for building extraordinary experiences on Roblox." },
      { property: "og:title", content: "Ágata — Create beyond limits" },
      { property: "og:description", content: "Everything you need to build extraordinary experiences on Roblox." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const ease = [0.22, 1, 0.36, 1] as const;

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative mx-auto max-w-[1180px] overflow-hidden px-6 pt-36 sm:pt-44">
      <motion.div style={{ opacity: fade }} className="relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
          <Eyebrow>Roblox development, refined</Eyebrow>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease, delay: 0.1 }}
          className="mx-auto mt-6 max-w-4xl text-balance text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
        >
          Create beyond
          <br />
          <span className="text-muted-foreground">limits.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.3 }}
          className="mx-auto mt-7 max-w-md text-balance text-[17px] leading-relaxed text-muted-foreground"
        >
          Everything you need to build extraordinary experiences on Roblox.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.42 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            to="/$category" params={{ category: "discover" }}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-transform active:scale-[0.97]"
          >
            Explore Ágata
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} />
          </Link>
          <Link to="/$category" params={{ category: "resources" }} className="rounded-full px-6 py-3.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">
            Discover resources
          </Link>
        </motion.div>
      </motion.div>

      <div className="relative mt-16 sm:mt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.6, ease, delay: 0.2 }}
          style={{ y, rotate }}
          className="relative mx-auto w-[min(92%,760px)]"
        >
          <motion.img
            src={images.agate}
            alt="Polished banded agate slice"
            width={1600}
            height={1200}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="w-full mix-blend-multiply dark:mix-blend-normal dark:[mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_72%)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease, delay: 0.9 }}
          className="glass absolute left-0 top-[18%] hidden rounded-2xl px-4 py-3 lg:block"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Resources</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">8,349</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease, delay: 1.05 }}
          className="glass absolute bottom-[22%] right-0 hidden items-center gap-3 rounded-2xl py-2.5 pl-2.5 pr-4 lg:flex"
        >
          <img src={images.vfx} alt="" className="size-10 rounded-xl object-cover" />
          <div>
            <p className="text-[13px] font-medium">Ember Vortex</p>
            <p className="text-[11px] text-muted-foreground">Kaia Studio · Free</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="mx-auto mt-28 max-w-[1180px] px-6 sm:mt-40">
      <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Eyebrow>01 — Discover</Eyebrow>
          <h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1] tracking-[-0.04em]">Explore what’s possible.</h2>
        </div>
        <p className="max-w-xs text-[15px] leading-relaxed text-muted-foreground">Four disciplines. One standard of craft, reviewed by people who ship.</p>
      </Reveal>

      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border bg-border sm:grid-cols-2">
        {categories.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.06} className="bg-background">
            <Link to="/$category" params={{ category: c.slug }} className="group flex h-full flex-col p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-muted-foreground">0{i + 1}</span>
                <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{c.count}</span>
              </div>
              <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl bg-muted">
                <img src={c.image} alt="" loading="lazy" className="size-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]" />
              </div>
              <div className="mt-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[13px] text-muted-foreground">{c.label}</p>
                  <h3 className="mt-1 text-2xl font-semibold tracking-tight">{c.title}</h3>
                  <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-muted-foreground">{c.blurb}</p>
                </div>
                <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" strokeWidth={1.5} />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Featured() {
  return (
    <section className="mx-auto mt-32 max-w-[1180px] px-6 sm:mt-44">
      <Reveal>
        <Eyebrow>02 — Curated this week</Eyebrow>
        <h2 className="mt-4 max-w-2xl text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1] tracking-[-0.04em]">Chosen, not ranked.</h2>
      </Reveal>

      <div className="mt-14 grid gap-5 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <a href="#" className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-foreground sm:aspect-[16/10]">
            <img src={images.vfx} alt="Ember Vortex effect" loading="lazy" className="absolute inset-0 size-full object-cover opacity-90 transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-32 sm:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">Exceptional VFX</p>
              <h3 className="mt-3 max-w-md text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">Ember Vortex, by Kaia Studio.</h3>
              <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-white/70">Twelve emitters, one breath of light. Adaptive LOD keeps it at 60fps on mobile.</p>
            </div>
          </a>
        </Reveal>

        <div className="grid gap-5 lg:col-span-4">
          <Reveal delay={0.08}>
            <a href="#" className="group block h-full overflow-hidden rounded-3xl border bg-card p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Featured script</p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">Strata Combat Kit</h3>
              <pre className="mt-5 overflow-hidden rounded-xl bg-background p-4 font-mono text-[11.5px] leading-relaxed text-muted-foreground">
{`local Strata = require(Kit)

Strata.hitbox(tool, {
  shape = "Capsule",
  rollback = 0.12,
}):onHit(applyDamage)`}
              </pre>
              <p className="mt-4 text-[13px] text-muted-foreground">Lumen Works · $24</p>
            </a>
          </Reveal>
          <Reveal delay={0.14}>
            <a href="#" className="group relative block aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
              <img src={images.model} alt="Outpost Modular building" loading="lazy" className="size-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]" />
              <div className="glass absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl px-4 py-3">
                <div>
                  <p className="text-[13px] font-medium">Outpost Modular</p>
                  <p className="text-[11px] text-muted-foreground">Premium 3D · 42 pieces</p>
                </div>
                <ArrowUpRight className="size-4" strokeWidth={1.6} />
              </div>
            </a>
          </Reveal>
        </div>
      </div>

      <Reveal className="mt-5">
        <a href="#" className="group grid items-center gap-8 overflow-hidden rounded-3xl border p-6 sm:p-10 md:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Community creation</p>
            <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-tight">Banding — an interface toolkit grown in the open.</h3>
            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-muted-foreground">
              Built by Oriel with 140 contributors. Declarative layouts, spring motion, zero dependencies. Free, forever.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
              Read the story <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
          <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-muted">
            <img src={images.agate} alt="" loading="lazy" className="size-full scale-125 object-cover transition-transform duration-[1600ms] group-hover:scale-[1.3]" />
          </div>
        </a>
      </Reveal>
    </section>
  );
}

function Latest() {
  return (
    <section className="mx-auto mt-32 max-w-[1180px] px-6 sm:mt-44">
      <Reveal className="flex items-end justify-between">
        <div>
          <Eyebrow>03 — Recently added</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.035em]">Fresh from the studio.</h2>
        </div>
        <Link to="/$category" params={{ category: "discover" }} className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:block">
          View all
        </Link>
      </Reveal>
      <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((r, i) => (
          <ResourceCard key={r.id} r={r} index={i} />
        ))}
      </div>
    </section>
  );
}

function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <Featured />
      <Latest />
      <Footer />
    </main>
  );
}
