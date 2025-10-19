document.addEventListener("input", event => {
  const control = event.target;
  if (!control.hasAttribute("aria-invalid")) return;
  control.ariaInvalid = "false";
});
