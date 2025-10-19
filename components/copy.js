document.addEventListener("click", event => {
  const button = event.target;
  if (!button.hasAttribute("data-copy")) return;
  document.getElementById(button.dataset.copy).select();
  document.execCommand("copy");
});
