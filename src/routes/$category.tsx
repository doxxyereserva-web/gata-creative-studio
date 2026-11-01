import { createFileRoute, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { categories, resources } from "@/lib/content";
import { Eyebrow, Footer, ResourceCard } from "@/components/agata/primitives";

const pages: Record<string, { title: string; label: string; intro: string }> = {
  discover: { label: "Discover", title: "Everything, in one place.", intro: "Every resource on Ágata, reviewed for quality and performance." },
  scripts: { label: "Scripts", title: "Systems that hold.", intro: "Production-grade Luau for combat, data, networking and interface." },
  vfx: { label: "VFX", title: "Light, in motion.", intro: "Particles, beams and shaders tuned for every device." },
  models: { label: "3D Models", title: "Form, considered.", intro: "Optimised meshes with clean topology, ready for Studio." },
  resources: { label: "Resources", title: "Sharper instruments.", intro: "Plugins, templates and utilities for your daily workflow." },
};

export const Route = createFileRoute("/$category")({
  loader: ({ params }) => {
    if (!pages[params.category]) throw notFound();
    return { slug: params.category };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? pages[loaderData.slug] : undefined;
    const title = p ? `${p.label} — Ágata` : "Unavailable — Ágata";
    return {
      meta: [
        { title },
        { name: "description", content: p?.intro ?? "" },
        { property: "og:title", content: title },
        { property: "og:description", content: p?.intro ?? "" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CategoryPage,
});

const filters = ["All", "Free", "Premium"] as const;

function CategoryPage() {
  const { slug } = Route.useLoaderData();
  const page = pages[slug];
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const base = slug === "discover" ? resources : resources.filter((r) => r.category === slug);
  const list = base.filter((r) => (filter === "All" ? true : filter === "Free" ? r.price === null : r.price !== null));
  const count = categories.find((c) => c.slug === slug)?.count;

  return (
    <main>
      <motion.section
        key={slug}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-[1180px] px-6 pt-36 sm:pt-44"
      >
        <Eyebrow>{page.label}{count ? ` · ${count} items` : ""}</Eyebrow>
        <h1 className="mt-5 text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em]">{page.title}</h1>
        <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted-foreground">{page.intro}</p>

        <div className="glass mt-12 inline-flex rounded-full p-1">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className="relative rounded-full px-4 py-1.5 text-[13px]">
              {filter === f && (
                <motion.span layoutId="filter" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
              )}
              <span className={`relative ${filter === f ? "text-primary-foreground" : "text-foreground/70"}`}>{f}</span>
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r, i) => (
            <ResourceCard key={r.id} r={r} index={i} />
          ))}
        </div>
        {list.length === 0 && <p className="py-24 text-center text-sm text-muted-foreground">Nothing here yet — new work arrives weekly.</p>}
      </motion.section>
      <Footer />
    </main>
  );
}
