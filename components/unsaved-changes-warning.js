{
  let hasUnsavedChanges = false;

  document.addEventListener("change", event => {
    const control = event.target;
    if (!control.closest("[data-unsaved-changes-warning]")) return;
    hasUnsavedChanges = true;
  });

  window.addEventListener("submit", event => {
    hasUnsavedChanges = false;
  });

  window.addEventListener("beforeunload", event => {
    if (hasUnsavedChanges) event.preventDefault();
  }, { once: true });
}
