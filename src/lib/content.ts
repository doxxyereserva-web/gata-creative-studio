import agate from "@/assets/agate-hero.jpg";
import vfx from "@/assets/vfx.jpg";
import model from "@/assets/model.jpg";
import script from "@/assets/script.jpg";

export const images = { agate, vfx, model, script };

export type CategorySlug = "scripts" | "vfx" | "models" | "resources";

export const categories: {
  slug: CategorySlug;
  label: string;
  title: string;
  blurb: string;
  count: string;
  image: string;
}[] = [
  { slug: "scripts", label: "Scripts", title: "Systems that hold.", blurb: "Production-grade Luau — combat, data, networking, UI frameworks.", count: "2,184", image: script },
  { slug: "vfx", label: "Visual Effects", title: "Light, in motion.", blurb: "Particles, beams and shaders tuned for 60 frames on every device.", count: "1,402", image: vfx },
  { slug: "models", label: "3D Models", title: "Form, considered.", blurb: "Optimised meshes, clean topology, PBR textures ready for Studio.", count: "3,917", image: model },
  { slug: "resources", label: "Development Tools", title: "Sharper instruments.", blurb: "Plugins, templates and utilities that remove friction from your day.", count: "846", image: agate },
];

export type Resource = {
  id: string;
  name: string;
  description: string;
  creator: string;
  category: CategorySlug;
  image: string;
  price: number | null;
  meta: string;
  rating: number;
};

export const resources: Resource[] = [
  { id: "1", name: "Strata Combat Kit", description: "Hitbox-precise melee framework with server authority and rollback.", creator: "Lumen Works", category: "scripts", image: script, price: 24, meta: "v3.2 · Luau", rating: 4.9 },
  { id: "2", name: "Ember Vortex", description: "Layered particle vortex with adaptive LOD and trail ribbons.", creator: "Kaia Studio", category: "vfx", image: vfx, price: null, meta: "12 emitters", rating: 4.8 },
  { id: "3", name: "Outpost Modular", description: "Forty-two snapping pieces for sci-fi settlements.", creator: "Meridian", category: "models", image: model, price: 18, meta: "8.4k tris", rating: 4.7 },
  { id: "4", name: "Banding — UI Toolkit", description: "Declarative interface primitives with spring animations.", creator: "Oriel", category: "resources", image: agate, price: null, meta: "Plugin", rating: 5.0 },
  { id: "5", name: "Persist DataStore", description: "Session-locked data layer with migrations and backups.", creator: "Northbound", category: "scripts", image: script, price: 12, meta: "v1.8 · Luau", rating: 4.9 },
  { id: "6", name: "Solar Flare Pack", description: "Nine cinematic impact effects for abilities and finishers.", creator: "Kaia Studio", category: "vfx", image: vfx, price: 9, meta: "9 effects", rating: 4.6 },
];

export const formatPrice = (p: number | null) => (p === null ? "Free" : `$${p}`);
