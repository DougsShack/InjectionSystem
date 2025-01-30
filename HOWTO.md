# Doug's Shack Injection System (DSIS) - How To Guide

## What is DSIS?

DSIS is a simple system that lets you reuse parts of your website (like headers and footers) across multiple pages without needing a server or complex programming knowledge. It's perfect for static websites hosted on platforms like Neocities, Nekoweb, or any basic web hosting.

## Important Limitations

1. **Head Section Cannot Be Injected**: 
   - The `<head>` section of your HTML (containing things like title, meta tags, CSS links, etc.) **must be included in each page file**.
   - You cannot dynamically load `<head>` content using DSIS.
   - Each page needs its own complete `<head>` section.

2. **JavaScript Required**:
   - DSIS needs JavaScript to work.
   - Make sure to include a `<noscript>` warning for users who have JavaScript disabled.
   - Works in all modern browsers (Chrome, Firefox, Safari, Edge).

3. **Local Testing**:
   - Due to browser security restrictions on loading local files (CORS policy), you must use a local web server for testing.
   - Opening files directly in a browser with `file://` URLs won't work.
   - VS Code Live Server, Python's `http.server`, or any basic web server will work.

## Quick Start Guide

### 1. Set Up Your Files

Create this folder structure:
```
your-website/
├── dsis/
│   ├── dsis.js
│   ├── header.html
│   └── footer.html
└── index.html
```

### 2. Add DSIS to Your Page

In each HTML page where you want to use components:

1. Add the DSIS script in the `<head>`:
   ```html
   <script src="dsis/dsis.js"></script>
   ```

2. Add a no-JavaScript warning:
   ```html
   <noscript>
       <div style="color: red; padding: 1rem; border: 1px solid red;">
           This website requires JavaScript to load components.
       </div>
   </noscript>
   ```

3. Add component placeholders where needed:
   ```html
   <div id="dsis-header"></div>
   <div id="dsis-footer"></div>
   ```

### 3. Create Your Components

1. Make a new file in the `dsis` folder for each component
2. Name it to match your placeholder (e.g., `header.html` for `dsis-header`)
3. Add your HTML content:

Example header (`dsis/header.html`):
```html
<header>
    <!-- Component-specific styles can be included here if needed -->
    <style>
        /* While not best practice, this works for component-specific styles */
        .my-header-nav { background: #f5f5f5; }
        .my-header-link { color: #333; }
    </style>
    <nav class="my-header-nav">
        <a class="my-header-link" href="/">Home</a>
        <a class="my-header-link" href="/about">About</a>
    </nav>
</header>
```

**Note about styling:**
- The preferred way to style components is to include all styles in the main page's `<head>` section
- However, you can include component-specific styles in three ways:
  1. In the main page's `<head>` (preferred)
  2. Using inline styles (`style="..."` attributes)
  3. Using `<style>` tags within the component (works but not best practice)

## Advanced Features

### 1. Error Styling

Add this CSS to style error messages:
```html
<style>
    .dsis-error {
        color: red;
        padding: 1rem;
        border: 1px solid red;
    }
</style>
```

### 2. Using Callbacks

You can run code after a component loads. This is useful for initializing interactive elements or handling dynamic content:

1. Add the callback attribute:
   ```html
   <div id="dsis-slider" data-dsis-callback="initializeSlider"></div>
   ```

2. Create the callback function:
   ```html
   <script>
       window.initializeSlider = () => {
           // Example: Initialize a slider after the component loads
           const slider = document.querySelector('.slider');
           if (slider) {
               // Your slider initialization code here
               console.log('Slider component loaded and initialized!');
           }
       };
   </script>
   ```

Common callback use cases:
- Initializing third-party components
- Setting up event listeners
- Loading dynamic content
- Applying custom animations

## Common Issues & Solutions

1. **Components Don't Load**
   - Make sure you're using a local web server
   - Check browser console for errors
   - Verify file paths are correct

2. **Images Break in Components**
   - Use absolute paths starting with `/`
   - Example: `/images/logo.png` instead of `images/logo.png`

3. **Styling Issues**
   - Preferably include all CSS in your main page's `<head>`
   - Components can use inline styles for simple cases
   - While not recommended, components can include their own `<style>` tags for component-specific styles
   - Be careful with style conflicts between components
   - Use specific class names to avoid conflicts (e.g., `my-header-nav` instead of just `nav`)

4. **Performance Considerations**
   - Components load asynchronously, which may cause a brief flicker
   - Place critical components higher in the HTML
   - Consider adding loading states for larger components
   - Use the callback feature to handle timing-dependent code

## Best Practices

1. **Keep Components Small**
   - Break large sections into smaller components
   - Easier to maintain and reuse

2. **Use Consistent Naming**
   - Keep file names simple and descriptive
   - Match IDs to file names

3. **Document Your Components**
   - Comment your HTML
   - Keep a list of available components

4. **Backup Your Components**
   - Keep copies of your component files
   - Use version control if possible

## Example Page Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Page</title>
    <script src="dsis/dsis.js"></script>
    <link rel="stylesheet" href="your-styles.css">
    <noscript>
        <div style="color: red;">JavaScript required for components</div>
    </noscript>
</head>
<body>
    <div id="dsis-header"></div>
    
    <main>
        Your page content here
    </main>
    
    <div id="dsis-footer"></div>
</body>
</html>
```

## Need Help?

If components aren't loading:
1. Open browser developer tools (F12)
2. Check the Console tab for error messages
3. Verify all files exist in the correct locations
4. Make sure you're using a local web server

Remember: DSIS is designed to be simple! If you find yourself needing more complex features, you might want to consider a static site generator or content management system instead. 