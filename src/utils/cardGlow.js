export function initCardGlow() {
  if (!matchMedia("(hover: hover)").matches) return;
  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest?.(".card-fx");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
}