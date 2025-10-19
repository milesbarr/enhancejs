document.addEventListener("focus", event => {
  const control = event.target;
  if (!control || !control.matches("[data-copy-on-focus]")) return;
  control.select();
  document.execCommand("copy");
});
