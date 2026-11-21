
export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl border border-white/70 bg-white/50 p-6 shadow-xl
        shadow-slate-900/5 backdrop-blur-xl transition duration-300
        hover:-translate-y-1
        dark:border-white/10 dark:bg-slate-700/40 dark:shadow-black/30
        ${className}`}
    >
      {children}
    </div>
  );
}