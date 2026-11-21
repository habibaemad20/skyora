import { useEffect, useState } from "react";

// زي useState بالظبط، بس القيمة بتتحفظ في المتصفح وترجع بعد الـ Refresh
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue; // لو البيانات المحفوظة بايظة
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // لو التخزين ممتلي أو ممنوع (Private mode) نكمل من غير حفظ
    }
  }, [key, value]);

  return [value, setValue];
}