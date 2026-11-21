import { Link } from "react-router-dom";
import { Cloud } from "lucide-react";

export default function Logo() {
  return (
    <Link to="/" aria-label="SKYORA home" className="group flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-linear-to-br from-brand to-brand-2 text-white shadow-lg shadow-brand/30 transition duration-300 group-hover:brightness-110">
        <Cloud size={22} aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-xl font-extrabold tracking-wide">SKYORA</span>
        <span className="hidden text-[11px] text-slate-600 sm:block dark:text-slate-400">
          Know the sky before you step out
        </span>
      </span>
    </Link>
  );
}