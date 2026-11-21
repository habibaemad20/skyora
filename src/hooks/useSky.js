import { useEffect, useState } from "react";
import { getWeather } from "../utils/weatherCodes";
import { sceneFromKind, sceneHour } from "../utils/sky";
import { useSmoothHour } from "./useSmoothHour";

export function useSky(weather) {
  const [target, setTarget] = useState(() => {
    const d = new Date();
    return { scene: "clear", hour: d.getHours() + d.getMinutes() / 60 };
  });

  useEffect(() => {
    if (!weather) return;
    const { kind } = getWeather(weather.current.weather_code, weather.current.is_day);
    setTarget({
      scene: sceneFromKind(kind),
      hour: sceneHour(weather.current.time, weather.daily.sunrise[0], weather.daily.sunset[0]),
    });
  }, [weather]);

  const hour = useSmoothHour(target.hour);
  return { weather: target.scene, hour };
}