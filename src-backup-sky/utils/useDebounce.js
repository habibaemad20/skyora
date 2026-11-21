import { useEffect, useState } from "react";

// بيرجّع القيمة بعد ما تثبت delay مللي ثانية من غير تغيير
// (عشان ما نبعتش طلب مع كل حرف بنكتبه)
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // لو القيمة اتغيرت قبل الوقت، نلغي المؤقت القديم
  }, [value, delay]);

  return debounced;
}