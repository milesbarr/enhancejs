"use strict";

// Form confirmations
document.addEventListener("submit", event => {
  const submitter = event.submitter;
  const form = event.target;
  const message = submitter.dataset.formconfirm || form.dataset.confirm;
  if (message && !confirm(message)) event.preventDefault();
});

// Share buttons
document.addEventListener("click", event => {
  const button = event.target;
  if (!button.hasAttribute("data-share")) return;
  navigator.share({ title: document.title, url: window.location.href });
});

// Copy buttons
document.addEventListener("click", event => {
  const button = event.target;
  if (!button.hasAttribute("data-copy")) return;
  document.getElementById(button.dataset.copy).select();
  document.execCommand("copy");
});

// Reset invalid inputs
document.addEventListener("input", event => {
  const input = event.target;
  if (!input.hasAttribute("aria-invalid")) return;
  input.ariaInvalid = "false";
});

// Unsaved changes warning
{
  let hasUnsavedChanges = false;

  document.addEventListener("change", event => {
    const control = event.target;
    if (!control.closest("form[data-warn-unsaved]")) return;
    hasUnsavedChanges = true;
  });

  window.addEventListener("submit", event => {
    hasUnsavedChanges = false;
  });

  window.addEventListener("beforeunload", event => {
    if (hasUnsavedChanges) event.preventDefault();
  }, { once: true });
}

// Characters remaining
document.addEventListener("input", event => {
  const control = event.target;
  if (!control.matches("input[maxlength][id], textarea[maxlength][id]")) return;
  const charsRemaining = Math.max(0, control.maxLength - control.value.length);
  document.querySelectorAll(`[data-chars-remaining-for="${control.id}"]`)
      .forEach(el => {
    el.textContent = charsRemaining;
  });
});

// Image preview for file inputs
document.addEventListener("change", event => {
  const fileInput = event.target;
  if (!fileInput.matches("input[type='file'][id]")) return;
  document.querySelectorAll(`img[data-preview-for="${fileInput.id}"]`)
      .forEach(img => {
    img.dataset.defaultSrc = img.dataset.defaultSrc || img.src;
    img.src = fileInput.files.length > 0
        ? URL.createObjectURL(fileInput.files[0])
        : img.dataset.defaultSrc;
  });
});
