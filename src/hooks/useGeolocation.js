import { useEffect, useState } from "react";
import { reverseGeocode } from "../api/reverseGeocode";
export function useGeolocation(onFound) {
  const [state, setState] = useState({ status: "idle", name: "" });
  useEffect(() => {
    if (state.status === "idle" || state.status === "loading") return;
    const timer = setTimeout(() => setState({ status: "idle", name: "" }), 5000);
    return () => clearTimeout(timer);
  }, [state.status]);

  const locate = () => {
    if (!("geolocation" in navigator)) {
      setState({ status: "error", name: "" });
      return;
    }

    setState({ status: "loading", name: "" });

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const latitude = Number(pos.coords.latitude.toFixed(2));
        const longitude = Number(pos.coords.longitude.toFixed(2));
        const place = await reverseGeocode({ latitude, longitude });
        onFound(place);
        setState({ status: "success", name: place.name });
      },
      (err) => {
        setState({ status: err.code === 1 ? "denied" : "error", name: "" });
      },
      { timeout: 10000, maximumAge: 300000 }
    );
  };

  return { status: state.status, name: state.name, locate };
}