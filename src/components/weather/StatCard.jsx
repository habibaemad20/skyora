import GlassCard from "../ui/GlassCard";
export default function StatCard({ icon: Icon, label, badge, children }) {
  return (
    <GlassCard className="flex flex-col p-5">
      <div className="flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-2">
          <Icon size={16} className="text-accent" aria-hidden="true" />
          {label}
        </span>
        {badge && (
          <span className="rounded-full bg-brand/15 px-2.5 py-0.5 text-[11px] font-bold normal-case tracking-normal text-accent">
            {badge}
          </span>
        )}
      </div>
      <div className="mt-4 flex flex-1 flex-col justify-between gap-3">{children}</div>
    </GlassCard>
  );
}