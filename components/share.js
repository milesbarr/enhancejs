document.addEventListener("click", event => {
  const button = event.target;
  if (!button || !button.hasAttribute("data-share")) return;
  const title = button.dataset.share || document.title;
  const canonical = document.querySelector("link[rel='canonical']");
  const url = canonical?.href || window.location.href;
  navigator.share({ title: title, url: url });
});
