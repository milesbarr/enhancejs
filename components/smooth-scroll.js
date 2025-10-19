document.addEventListener("click", event => {
  if (!event.target) return;
  const link = event.target.closest("a[href^='#']");
  if (!link) return;
  const target = document.querySelector(link.href);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth" });
});
