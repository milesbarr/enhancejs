# Enhance.js

A lightweight JavaScript library that provides progressive enhancements for HTML
forms and user interactions. This library adds functionality while maintaining
zero dependencies and graceful degradation.

## Setup

Include the library in your HTML file:

```html
<script src="enhance.js" async defer></script>
```

For graceful degradation for users with JavaScript disabled, copy
[`noscript.html`](noscript.html) into the `<head>` section of your HTML file.

## Usage

### Form Confirmations

Add confirmation dialogs to forms or form submission buttons:

```html
<form data-confirm="Are you sure?">
  <!-- Form content -->
  <button data-formconfirm="Are you sure?">Submit</button>
</form>
```

### Unsaved Changes Warning

Warn users about unsaved changes in forms:

```html
<form data-unsaved-changes-warning>
  <!-- Form content -->
</form>
```

### Share Buttons

Add share functionality:

```html
<button type="button" data-share>Share</button>
```

### Copy Buttons

Add copy-to-clipboard functionality:

```html
<input type="text" id="text">
<button type="button" data-copy="text">Copy</button>
```

### Copy-on-Focus

Automatically select and copy control content on focus:

```html
<input type="text" readonly data-copy-on-focus value="Copy me!">
```

### Image File Previews

Preview images for file inputs:

```html
<input type="file" id="upload">
<img data-preview-for="upload">
```

### Character Counter

Display the remaining character count for text inputs:

```html
<textarea id="message" maxlength="100"></textarea>
<span data-chars-remaining-for="message"></span>
```

### Auto-Resizable Textareas

Automatically adjust textarea height based on content:

```html
<textarea data-auto-resize></textarea>
```

### Smooth Scrolling

Automatic smooth scrolling to anchor links:

```html
<a href="#section">Go to section</a>
<div id="section">Content</div>
```

### Invalid Inputs

Automatically reset `aria-invalid` attributes:

```html
<input type="text" aria-invalid="true">
```

### File Drag-and-Drop

Add file drag-and-drop functionality:

```html
<label data-drop-zone>
  <input type="file">
</label>
```

### AJAX Support

Use AJAX for form submissions and link navigation:

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
