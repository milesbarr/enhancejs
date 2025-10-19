document.addEventListener("input", event => {
  const control = event.target;
  if (!control.matches("input[id][maxlength], textarea[id][maxlength]")) return;
  const charsRemaining = Math.max(0, control.maxLength - control.value.length);
  document.querySelectorAll(`[data-chars-remaining-for="${control.id}"]`)
      .forEach(container => {
    container.textContent = charsRemaining;
  });
});
