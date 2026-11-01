export function AgataMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <ellipse cx="16" cy="16" rx="14" ry="12" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="16" cy="16" rx="10" ry="8.2" stroke="currentColor" strokeOpacity=".6" strokeWidth="1.2" />
      <ellipse cx="16" cy="16" rx="6" ry="4.6" stroke="currentColor" strokeOpacity=".35" strokeWidth="1.1" />
      <ellipse cx="16" cy="16" rx="2.4" ry="1.7" fill="var(--agate)" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <AgataMark />
      <span className="text-[15px] font-semibold tracking-[0.22em]">ÁGATA</span>
    </span>
  );
}
