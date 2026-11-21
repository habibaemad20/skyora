import { useEffect, useState } from "react";
import { searchCities } from "../api/geocoding";
import { useDebounce } from "../utils/useDebounce";

// الحالات: idle | loading | results | empty | error
export function useCitySearch(query) {
  const text = query.trim();
  const debounced = useDebounce(text, 400);
  const [state, setState] = useState({ status: "idle", results: [] });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    // أقل من حرفين: مفيش بحث
    if (debounced.length < 2) {
      setState({ status: "idle", results: [] });
      return;
    }

    const controller = new AbortController();
    setState((s) => ({ ...s, status: "loading" }));

    searchCities(debounced, controller.signal)
      .then((results) =>
        setState({ status: results.length ? "results" : "empty", results })
      )
      .catch((err) => {
        if (err.name !== "AbortError") setState({ status: "error", results: [] });
      });

    return () => controller.abort();
  }, [debounced, attempt]);

  // لسه بيكتب (الـ debounce ما خلصش): نعرض loading بدل نتايج قديمة
  const typing = text.length >= 2 && text !== debounced;
  const status = text.length < 2 ? "idle" : typing ? "loading" : state.status;

  return {
    status,
    results: state.results,
    retry: () => setAttempt((a) => a + 1),
  };
}