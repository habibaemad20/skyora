export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`card-fx rounded-3xl border border-white/60 bg-white/80 p-6 backdrop-blur-xl
        dark:border-white/10 dark:bg-slate-700/60 ${className}`}
    >
      {children}
    </div>
  );
}