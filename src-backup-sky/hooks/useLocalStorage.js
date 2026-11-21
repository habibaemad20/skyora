import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {// لو البيانات المحفوظة بايظة
      return initialValue; 
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