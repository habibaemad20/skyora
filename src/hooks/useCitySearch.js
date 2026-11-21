import { useEffect, useState } from "react";
import { searchCities } from "../api/geocoding";
import { useDebounce } from "../utils/useDebounce";

export function useCitySearch(query) {
  const text = query.trim();
  const debounced = useDebounce(text, 400);
  const [state, setState] = useState({ status: "idle", results: [] });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
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
  const typing = text.length >= 2 && text !== debounced;
  const status = text.length < 2 ? "idle" : typing ? "loading" : state.status;

  return {
    status,
    results: state.results,
    retry: () => setAttempt((a) => a + 1),
  };
}