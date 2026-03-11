// Improve INP: attach event listener efficiently
document.getElementById("loadData").addEventListener("click", () => {
  // Simulate heavy work only on interaction
  setTimeout(loadHeavyContent, 0);
});

// Lazy loading simulation
function loadHeavyContent() {
  const container = document.getElementById("lazyContent");

  // Create element dynamically (code splitting concept)
  const box = document.createElement("div");
  box.className = "lazy-box";
  box.innerText = "Lazy Loaded Content";

  container.appendChild(box);
}
