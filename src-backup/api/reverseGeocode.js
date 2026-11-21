export async function reverseGeocode({ latitude, longitude }) {
  const fallback = {
    name: "My location",
    country: "",
    admin1: "",
    latitude,
    longitude,
    timezone: "auto", 
  };

  try {
    const params = new URLSearchParams({ latitude, longitude, localityLanguage: "en" });
    const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?${params}`);
    if (!res.ok) return fallback;
    const d = await res.json();
    return {
      ...fallback,
      name: d.city || d.locality || d.principalSubdivision || fallback.name,
      country: d.countryName || "",
      admin1: d.principalSubdivision || "",
    };
  } catch {
    return fallback;
  }
}