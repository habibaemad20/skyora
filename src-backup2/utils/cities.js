// مفتاح فريد للمدينة (الاسم لوحده مش كفاية: فيه Alexandria في 5 دول)
export const cityKey = (c) => `${c.latitude},${c.longitude}`;

// "Alexandria Governorate, Egypt"
export const cityLabel = (c) => [c.admin1, c.country].filter(Boolean).join(", ");

export const pickCity = (c) => ({
  name: c.name,
  country: c.country,
  admin1: c.admin1,
  latitude: c.latitude,
  longitude: c.longitude,
  timezone: c.timezone,
});