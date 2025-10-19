document.addEventListener("drop", event => {
  const fileInput = event.target;
  if (!fileInput || !fileInput.matches("input[type='file']")) return;
  event.preventDefault();
  const files = event.dataTransfer.files;
  fileInput.files = files;
});

document.addEventListener("dragover", event => {
  if (!event.target) return;
  const dropZone = event.target.closest("[data-drop-zone]");
  if (!dropZone) return;
  event.preventDefault();
  dropZone.classList.add("drag-over");
});

document.addEventListener("dragleave", event => {
  if (!event.target) return;
  const dropZone = event.target.closest("[data-drop-zone]");
  if (!dropZone) return;
  event.preventDefault();
  dropZone.classList.remove("drag-over");
});

document.addEventListener("drop", event => {
  if (!event.target) return;
  const dropZone = event.target.closest("[data-drop-zone]");
  if (!dropZone) return;
  event.preventDefault();
  dropZone.classList.remove("drag-over");
  const files = event.dataTransfer.files;
  const fileInput = dropZone.querySelector("input[type='file']");
  if (fileInput) fileInput.files = files;
});
