# Enhance.js

A lightweight JavaScript library that provides progressive enhancements for HTML
forms and user interactions. This library adds functionality while maintaining
zero dependencies and graceful degradation.

## Setup

Include the library:

```html
<script src="enhance.js" async defer></script>
```

Copy [`noscript.html`](noscript.html) to the `<head>` section of the page for
graceful degredation for users with JavaScript disabled.

## Usage

### Form Confirmations

Add confirmation dialogs to form submissions using the `data-confirm` or
`data-formconfirm` attributes.

```html
<form data-confirm="Are you sure you want to submit this form?">
  <!-- Form content -->
  <button data-formconfirm="Are you sure you want to press this button?">
</form>
```

### Unsaved Changes Warning

Warn users about unsaved form changes with the `data-unsaved-changes-warning`
attribute.

```html
<form data-unsaved-changes-warning>
  <!-- Form content -->
</form>
```

### Share Buttons

Add share buttons with the `data-share` attribute.

```html
<button type="button" data-share>Share</button>
```

### Copy Buttons

Add copy buttons with the `data-copy` attribute.

```html
<input type="text" id="text">
<button type="button" data-copy="text">Copy</button>
```

### File Upload Previews

Preview images for file inputs using the `data-preview-for` attribute.

```html
<input type="file" id="upload">
<img data-preview-for="upload">
```

### Character Counter

Show the remaining character count for controls with the
`data-chars-remaining-for` attribute.

```html
<textarea id="message" maxlength="100"></textarea>
<span data-chars-remaining-for="message"></span>
```

### Auto-resizable Textareas

Automatically resize textareas based on their content using the
`data-auto-resize` attribute.

```html
<textarea data-auto-resize></textarea>
```

### Smooth Scrolling

Enable smooth scrolling for anchor links (links starting with #) automatically.

```html
<a href="#section">Go to section</a>
<div id="section">Content</div>
```

### Invalid Inputs

Automatically set the `aria-invalid` attribute to `false` when an input changes.

```html
<input type="text" aria-invalid="true">
```

### Drag-and-Drop File Uploads

Add drag-and-drop file uploads with the `data-drop-zone` attribute.

```html
<label data-drop-zone>
  <input type="file">
</label>
```

### AJAX

Allow for form submissions and link navigation with AJAX using the
`data-ajax-replace` attribute.

```html
<div id="page">
  <a href="." data-ajax-replace="page">Refresh page</a>
</div>
```

## Graceful Degradation

All features are implemented as progressive enhancements, meaning the basic
functionality will work even if JavaScript is disabled.

## License

This project is licensed under the [MIT License](LICENSE).
