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
