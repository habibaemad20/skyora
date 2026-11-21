import { cityKey, pickCity } from "./cities";
export function pushRecent(city) {
  try {
    const prev = JSON.parse(localStorage.getItem("skyora-recent")) ?? [];
    const next = [pickCity(city), ...prev.filter((c) => cityKey(c) !== cityKey(city))].slice(0, 5);
    localStorage.setItem("skyora-recent", JSON.stringify(next));
  } catch {
    // لو التخزين ممنوع، نكمل من غير حفظ
  }
}