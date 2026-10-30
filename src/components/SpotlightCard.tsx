"use client";
export default function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={`spot relative overflow-hidden rounded-2xl border border-line bg-card p-6 transition-colors hover:border-acc ${className}`}
    >
      <div className="relative">{children}</div>
    </div>
  );
}
