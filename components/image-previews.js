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
