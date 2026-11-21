import { useEffect, useState } from "react";

export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // لو القيمة اتغيرت قبل الوقت، نلغي المؤقت القديم
  }, [value, delay]);

  return debounced;
}