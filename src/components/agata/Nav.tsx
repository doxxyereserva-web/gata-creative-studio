import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Wordmark } from "./Logo";
import { useTheme } from "./theme";
import { SearchDialog } from "./SearchDialog";

const links = [
  { to: "/discover", label: "Discover" },
  { to: "/scripts", label: "Scripts" },
  { to: "/vfx", label: "VFX" },
  { to: "/models", label: "3D Models" },
  { to: "/resources", label: "Resources" },
] as const;

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="relative grid size-9 place-items-center overflow-hidden rounded-full text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, rotate: -60, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -14, rotate: 60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
        >
          {theme === "dark" ? <Moon className="size-[17px]" strokeWidth={1.6} /> : <Sun className="size-[17px]" strokeWidth={1.6} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Nav() {
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setCompact(v > 40));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch((s) => !s);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4">
        <motion.nav
          animate={{ maxWidth: compact ? 920 : 1180, paddingTop: compact ? 6 : 10, paddingBottom: compact ? 6 : 10 }}
          transition={{ type: "spring", stiffness: 260, damping: 32 }}
          className="glass flex w-full items-center justify-between rounded-full pl-5 pr-2"
        >
          <Link to="/" aria-label="Ágata home">
            <Wordmark />
          </Link>
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="rounded-full px-3.5 py-1.5 text-[13px] text-foreground/65 transition-colors hover:text-foreground"
                  activeProps={{ className: "!text-foreground bg-foreground/[0.06]" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setSearch(true)}
              aria-label="Search"
              className="grid size-9 place-items-center rounded-full text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              <Search className="size-[17px]" strokeWidth={1.6} />
            </button>
            <ThemeToggle />
            <button className="ml-1 hidden rounded-full bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground transition-transform active:scale-[0.97] sm:block">
              Sign in
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              className="grid size-9 place-items-center rounded-full md:hidden"
            >
              {open ? <X className="size-[18px]" strokeWidth={1.6} /> : <Menu className="size-[18px]" strokeWidth={1.6} />}
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-2xl md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
              className="flex flex-col gap-1 px-8 pt-28"
            >
              {links.map((l) => (
                <motion.li key={l.to} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                  <Link to={l.to} className="block py-2 text-3xl font-medium tracking-tight">
                    {l.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} className="pt-8">
                <button className="w-full rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground">Sign in</button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchDialog open={search} onClose={() => setSearch(false)} />
    </>
  );
}
