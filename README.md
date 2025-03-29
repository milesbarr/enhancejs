# HTML Enhancer

A lightweight JavaScript library that provides progressive enhancements for HTML
forms and user interactions. This library adds functionality while maintaining
zero dependencies and graceful degradation.

## Setup

Include the required files:

```html
<script src="html-enhance.js" async defer></script>
<script src="html-enhance-ajax.js" async defer></script>
```

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

```html
<form >
```


### Unsaved Changes Warning

Warn users about unsaved form changes with the `data-warn-unsaved` attribute.

```html
<form data-warn-unsaved>
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

### Invalid Inputs

Automatically set the `aria-invalid` attribute to `false` when an input changes.

```html
<input type="text" aria-invalid="true">
```

### AJAX

Allow for form submissions and link navigation with AJAX using
`data-ajax-replace`

```html
<div id="page">
  <a href="." data-ajax-replace="page">Refresh page</a>
</div>
```

## Graceful Degradation

All features are implemented as progressive enhancements, meaning the basic
functionality will work even if JavaScript is disabled.

## License

This project is licensed under the [MIT license](LICENSE).
