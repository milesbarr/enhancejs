"use strict";

// Form confirmations
document.addEventListener("submit", event => {
  const submitter = event.submitter;
  const form = event.target;
  const message = submitter?.dataset.formconfirm || form?.dataset.confirm;
  if (message && !confirm(message)) event.preventDefault();
});

// Share buttons
document.addEventListener("click", event => {
  const button = event.target;
  if (!button.hasAttribute("data-share")) return;
  const title = button.dataset.share || document.title;
  const canonical = document.querySelector("link[rel='canonical']");
  const url = canonical?.href || window.location.href;
  navigator.share({ title: title, url: url });
});

// Copy buttons
document.addEventListener("click", event => {
  const button = event.target;
  if (!button.hasAttribute("data-copy")) return;
  document.getElementById(button.dataset.copy).select();
  document.execCommand("copy");
});

// Reset invalid controls
document.addEventListener("input", event => {
  const control = event.target;
  if (!control.hasAttribute("aria-invalid")) return;
  control.ariaInvalid = "false";
});

// Unsaved changes warning
{
  let hasUnsavedChanges = false;

  document.addEventListener("change", event => {
    const input = event.target;
    if (!input.closest("[data-warn-unsaved]")) return;
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
      .forEach(counter => {
    counter.textContent = charsRemaining;
  });
});

// Image previews for file uploads
{
  const defaultImgSrcs = new WeakMap();
  document.addEventListener("change", event => {
    const fileInput = event.target;
    if (!fileInput.matches("input[type='file'][id]")) return;
    document.querySelectorAll(`img[data-preview-for="${fileInput.id}"]`)
        .forEach(img => {
      if (!defaultImgSrcs.has(img)) defaultImgSrcs.set(img, img.src);
      img.src = fileInput.files.length > 0
        ? URL.createObjectURL(fileInput.files[0])
        : defaultImgSrcs.get(img);
    });
  });
}

// Auto-resizable textareas
{
  const resizeTextarea = textarea => {
    if (!textarea.matches("textarea[data-auto-resize]")) return;
    textarea.style.height = textarea.scrollHeight + "px";
  };
  document.querySelectorAll("textarea[data-auto-resize]")
      .forEach(resizeTextarea);
  document.addEventListener("input", event => {
    resizeTextarea(event.target);
  });
}

// Smooth scrolling for anchor links
document.addEventListener("click", event => {
  const link = event.target.closest("a[href^='#']");
  if (!link) return;
  const target = document.querySelector(link.href);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth" });
});

// Drag-and-drop file uploads
document.addEventListener("dragover", event => {
  const dropZone = event.target.closest("[data-drop-zone]");
  if (!dropZone) return;
  event.preventDefault();
  dropZone.classList.add("drag-over");
});

document.addEventListener("dragleave", event => {
  const dropZone = event.target.closest("[data-drop-zone]");
  if (!dropZone) return;
  event.preventDefault();
  dropZone.classList.remove("drag-over");
});

document.addEventListener("drop", event => {
  const dropZone = event.target.closest("[data-drop-zone]");
  if (!dropZone) return;
  event.preventDefault();
  dropZone.classList.remove("drag-over");
  const files = event.dataTransfer.files;
  const fileInput = dropZone.querySelector("input[type='file']");
  if (fileInput) fileInput.files = files;
});
