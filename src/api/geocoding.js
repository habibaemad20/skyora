// بيدور على مدينة بالاسم ويرجّع Array من النتائج
export async function searchCities(name, signal) {
  const query = name.trim();
  if (!query) return [];

  const params = new URLSearchParams({ name: query, count: 5, language: "en" });
  const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`, { signal });
  if (!res.ok) throw new Error("City search failed. Please try again.");

  const data = await res.json();
  return data.results ?? [];
}