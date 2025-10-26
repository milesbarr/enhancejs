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
