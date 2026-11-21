import { useEffect, useRef, useState } from "react";

// بيرجّع ساعة بتتحرك بنعومة لحد القيمة الجديدة (دايمًا للأمام، لأن الوقت بيمشي لقدام)
export function useSmoothHour(target, duration = 1800) {
  const [hour, setHour] = useState(target);
  const current = useRef(target);

  useEffect(() => {
    const from = current.current;
    const delta = (((target - from) % 24) + 24) % 24; // المسافة للأمام بس
    if (delta < 0.01) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let raf;

    const tick = (now) => {
      const t = reduce ? 1 : Math.min(1, (now - start) / duration);
      const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2; // بطيء في الأول والآخر
      const value = (from + delta * eased) % 24;
      current.current = value;
      setHour(value);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf); // لو الهدف اتغير في النص، نوقف القديم
  }, [target, duration]);

  return hour;
}