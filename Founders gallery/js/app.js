document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("[data-toggle-notes]");
  const notes = document.querySelector("[data-notes]");
  if (!button || !notes) return;
  button.addEventListener("click", () => {
    notes.hidden = !notes.hidden;
    button.textContent = notes.hidden ? "Show details" : "Hide details";
  });
});