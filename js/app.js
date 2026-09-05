document.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("museumSelector");
  const cards = Array.from(document.querySelectorAll(".museum-card"));
  const audioPlayers = Array.from(document.querySelectorAll("audio"));

  const setActiveMuseum = (museumId) => {
    cards.forEach((card) => {
      card.classList.toggle("museum-card--active", card.dataset.museum === museumId);
    });

    audioPlayers.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  };

  if (!selector) return;

  selector.addEventListener("change", (event) => {
    setActiveMuseum(event.target.value);
  });

  if (selector.value) {
    setActiveMuseum(selector.value);
  }
});