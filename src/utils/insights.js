import { Umbrella, Shirt, Sun } from "lucide-react";

export function getInsight(daily) {
  const rain = daily.precipitation_probability_max[0];
  const low = daily.temperature_2m_min[0];
  const uv = daily.uv_index_max[0];

  if (rain >= 40) return { Icon: Umbrella, text: "Bring an umbrella today" };
  if (uv >= 8) return { Icon: Sun, text: "UV is very high, wear sunscreen" };
  if (low <= 15) return { Icon: Shirt, text: `It's cooler tonight, bring a light jacket · Low ${Math.round(low)}°` };
  return { Icon: Umbrella, text: "No umbrella needed today" };
}