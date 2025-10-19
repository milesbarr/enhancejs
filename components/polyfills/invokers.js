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
