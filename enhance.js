"use strict";

document.addEventListener("submit", event => {
  const submitter = event.submitter;
  const form = event.target;
  const message = submitter?.dataset.formconfirm || form?.dataset.confirm;
  if (message && !confirm(message)) event.preventDefault();
});

document.addEventListener("focus", event => {
  const control = event.target;
  if (!control || !control.matches("[data-copy-on-focus]")) return;
  control.select();
  document.execCommand("copy");
});

document.addEventListener("click", event => {
  const button = event.target;
  if (!button.hasAttribute("data-copy")) return;
  document.getElementById(button.dataset.copy).select();
  document.execCommand("copy");
});

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

{
  const resizeTextarea = textarea => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  document.querySelectorAll("textarea[data-auto-resize]")
      .forEach(resizeTextarea);

  document.addEventListener("input", event => {
    const textarea = event.target;
    if (!textarea || !node.matches("textarea[data-auto-resize]")) return;
    resizeTextarea(textarea);
  });

  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;
        if (node.matches("textarea[data-auto-resize]")) resizeTextarea(node);
        node.querySelectorAll?.("textarea[data-auto-resize]")
            .forEach(resizeTextarea);
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

const AJAX_HEADERS = { "X-Requested-With": "XMLHttpRequest" };

// Links
document.addEventListener("click", async event => {
  const link = event.target;
  if (!link || !link.matches("a[data-ajax-replace]")) return;
  const url = link.href;

  // Fetch the HTML.
  let html;
  try {
    const response = await fetch(url, { headers: AJAX_HEADERS });
    if (!response.ok) throw new Error();
    html = await response.text();
  } catch (error) {
    return;
  }

  // Insert the HTML.
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  const target = document.getElementById(link.dataset.ajaxReplace);
  target.replaceChildren(...tmp.children);
  target.scrollIntoView();

  // Update the history.
  history.pushState({ replace: link.dataset.ajaxReplace }, null, url);

  // Prevent following the link.
  event.preventDefault();
});

// Forms
document.addEventListener("submit", async event => {
  const submitter = event.submitter;
  const form = event.target;
  if (!form || !form.matches("form[data-ajax-replace]")) return;

  // Get form data.
  const method = submitter?.formmethod || form.method;
  const url = new URL(submitter?.formAction || form.action);
  const formData = new FormData(form);
  let options = {};
  if (method === "post") {
    options = { method: "POST", body: formData };
  } else {
    url.search = new URLSearchParams(formData);
  }

  // Fetch the HTML.
  let html;
  try {
    options.headers = AJAX_HEADERS;
    const response = await fetch(url, options);
    if (!response.ok) throw new Error();
    html = await response.text();
  } catch (error) {
    return;
  }

  // Insert the HTML.
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  const target = document.getElementById(form.dataset.ajaxReplace);
  target.replaceChildren(...tmp.children);
  target.scrollIntoView();

  // Update the history.
  history.replaceState({ replace: form.dataset.ajaxReplace }, null, url);

  // Prevent form submission.
  event.preventDefault();
});

window.addEventListener("popstate", async event => {
  const url = event.target.location.href;
  if (!event.state.replace) return;

  // Fetch the HTML.
  let html;
  try {
    const response = await fetch(url, { headers: AJAX_HEADERS });
    if (!response.ok) throw new Error();
    html = await response.text();
  } catch (error) {
    window.location.replace(url);
    return;
  }

  // Insert the HTML.
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  const target = document.getElementById(event.state.replace);
  target.replaceChildren(...tmp.children);
  target.scrollIntoView();
});

document.addEventListener("click", event => {
  if (!event.target) return;
  const link = event.target.closest("a[href^='#']");
  if (!link) return;
  const target = document.querySelector(link.href);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth" });
});

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

document.addEventListener("click", event => {
  const button = event.target;
  if (!button || !button.matches("button[command][commandfor]")) return;
  const target = document.querySelector(button.getAttribute("commandfor"));
  if (!target) return;
  const command = button.getAttribute("command");
  switch (command) {
    case "show-modal":
      target.showModal();
      event.preventDefault();
      break;
    case "hide":
      target.hide();
      event.preventDefault();
      break;
    case "show-popover":
      target.showPopover();
      event.preventDefault();
      break;
    case "hide-popover":
      target.hidePopover();
      event.preventDefault();
      break;
    case "toggle-popover":
      target.togglePopover();
      event.preventDefault();
      break;
  }
});

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

document.addEventListener("input", event => {
  const control = event.target;
  if (!control.matches("input[id][maxlength], textarea[id][maxlength]")) return;
  const charsRemaining = Math.max(0, control.maxLength - control.value.length);
  document.querySelectorAll(`[data-chars-remaining-for="${control.id}"]`)
      .forEach(container => {
    container.textContent = charsRemaining;
  });
});

document.addEventListener("click", event => {
  const button = event.target;
  if (!button || !button.hasAttribute("data-share")) return;
  const title = button.dataset.share || document.title;
  const canonical = document.querySelector("link[rel='canonical']");
  const url = canonical?.href || window.location.href;
  navigator.share({ title: title, url: url });
});

document.addEventListener("input", event => {
  const control = event.target;
  if (!control.hasAttribute("aria-invalid")) return;
  control.ariaInvalid = "false";
});

