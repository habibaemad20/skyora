import { Link } from "react-router-dom";
import SkyBackground from "../components/ui/SkyBackground";
import GlassCard from "../components/ui/GlassCard";

export default function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center px-4 text-center font-sans text-slate-800 dark:text-slate-100">
      <SkyBackground />
      <GlassCard className="max-w-md p-10">
        <p className="font-display text-7xl font-extrabold">404</p>
        <h1 className="mt-2 font-display text-2xl font-bold">This page drifted away</h1>
        <p className="mt-2 text-slate-700 dark:text-slate-400">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-brand px-6 py-3 font-semibold text-white shadow-lg shadow-brand/30"
        >
          Back to home
        </Link>
      </GlassCard>
    </div>
  );
}