import { useEffect, useRef, useState } from "react";

// بيعدّ من القيمة القديمة للجديدة (وأول مرة من صفر)
export default function AnimatedNumber({ value, duration = 800 }) {
  const [shown, setShown] = useState(0);
  const last = useRef(0);

  useEffect(() => {
    const begin = last.current;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let raf;

    const tick = (now) => {
      const t = reduce ? 1 : Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3; // سريع في الأول وبيهدى في الآخر
      const v = begin + (value - begin) * eased;
      last.current = v;
      setShown(v);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <>{Math.round(shown)}</>;
}