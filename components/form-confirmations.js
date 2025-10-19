document.addEventListener("submit", event => {
  const submitter = event.submitter;
  const form = event.target;
  const message = submitter?.dataset.formconfirm || form?.dataset.confirm;
  if (message && !confirm(message)) event.preventDefault();
});
