import GlassCard from "../ui/GlassCard";

// مستطيل رمادي بينبض
function Bone({ className = "" }) {
  return <div className={`animate-pulse rounded-xl bg-slate-900/10 dark:bg-white/10 ${className}`} />;
}

export default function WeatherSkeleton() {
  return (
    <div role="status" aria-busy="true" className="space-y-6">
      <span className="sr-only">Loading weather...</span>

      <section className="grid gap-6 lg:grid-cols-2">
        {/* الهيرو */}
        <GlassCard className="h-[26rem] space-y-5 p-6 sm:p-8">
          <Bone className="h-7 w-2/3" />
          <Bone className="h-4 w-1/3" />
          <Bone className="h-8 w-1/2 rounded-full" />
          <div className="flex items-center justify-between pt-6">
            <Bone className="h-28 w-40" />
            <Bone className="h-24 w-24 rounded-full" />
          </div>
          <Bone className="h-5 w-1/2" />
          <Bone className="h-16 w-full rounded-2xl" />
        </GlassCard>

        {/* الـ 4 كروت */}
        <div className="grid auto-rows-fr grid-cols-2 gap-4 lg:gap-6">
          {[0, 1, 2, 3].map((i) => (
            <GlassCard key={i} className="space-y-4 p-5">
              <Bone className="h-4 w-24" />
              <Bone className="h-10 w-20" />
              <Bone className="h-3 w-full" />
              <Bone className="h-2 w-full rounded-full" />
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="h-64 space-y-4">
          <Bone className="h-5 w-1/2" />
          <Bone className="h-28 w-full rounded-3xl" />
          <Bone className="h-6 w-full" />
        </GlassCard>
        <GlassCard className="h-64 space-y-4 lg:col-span-2">
          <Bone className="h-5 w-1/3" />
          <Bone className="h-24 w-full rounded-3xl" />
          <div className="flex gap-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Bone key={i} className="h-20 w-16 shrink-0" />
            ))}
          </div>
        </GlassCard>
      </section>

      <GlassCard className="space-y-3">
        <Bone className="h-5 w-40" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <Bone key={i} className="h-10 w-full" />
        ))}
      </GlassCard>
    </div>
  );
}