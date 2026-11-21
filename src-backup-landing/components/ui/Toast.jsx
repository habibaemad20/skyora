import { Loader2, CircleCheck, TriangleAlert } from "lucide-react";

// رسالة صغيرة تحت الشاشة حسب حالة تحديد الموقع
export default function Toast({ status, name }) {
  if (status === "idle") return null;

  const content = {
    loading: { Icon: Loader2, spin: true, text: "Locating you..." },
    success: { Icon: CircleCheck, text: `${name} detected` },
    denied: {
      Icon: TriangleAlert,
      text: "Location access is blocked. Enable it in your browser settings or search for a city instead.",
    },
    error: { Icon: TriangleAlert, text: "Couldn't find your location. Try again or search for a city." },
  }[status];

  return (
    <div
      role="status"
      className="fixed inset-x-4 bottom-24 md:bottom-6 z-50 mx-auto flex max-w-md items-start gap-3 rounded-2xl
        bg-slate-900 px-5 py-4 text-sm font-medium text-white shadow-2xl
        dark:bg-white dark:text-slate-900"
    >
      <content.Icon
        size={20}
        aria-hidden="true"
        className={`mt-0.5 shrink-0 ${content.spin ? "animate-spin" : ""}`}
      />
      <p>{content.text}</p>
    </div>
  );
}