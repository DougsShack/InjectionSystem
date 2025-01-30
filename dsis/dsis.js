/**
 * Doug's Shack Injection System (DSIS)
 * A simple system for injecting HTML components into static websites.
 * 
 * How it works:
 * 1. Waits for the DOM to be fully loaded
 * 2. Finds all elements with IDs starting with "dsis-"
 * 3. For each element, loads the corresponding HTML file from the dsis/ directory
 * 4. Injects the loaded HTML into the placeholder element
 * 5. Optionally executes a callback function after injection
 * 
 * Usage:
 * 1. Include this script in your HTML: <script src="dsis/dsis.js"></script>
 * 2. Add placeholder elements: <div id="dsis-header"></div>
 * 3. Create corresponding HTML files: dsis/header.html
 * 4. Optional: Add callbacks with data-dsis-callback="functionName"
 */

// Wait for DOM to be fully loaded before processing components
document.addEventListener('DOMContentLoaded', () => {
    // Find all elements with IDs starting with "dsis-"
    // These are our component placeholders
    const components = document.querySelectorAll('[id^="dsis-"]');

    // Process each component placeholder
    components.forEach(component => {
        // Extract component name from the ID (e.g., "dsis-header" -> "header")
        const name = component.id.replace('dsis-', '');
        // Construct the path to the component's HTML file
        const path = `dsis/${name}.html`;
        // Get the optional callback function name if specified
        const callback = component.getAttribute('data-dsis-callback');

        // Fetch the component's HTML file and inject it
        fetch(path)
            .then(response => {
                // Check if the file exists
                if (!response.ok) throw new Error(`File ${path} not found`);
                return response.text();
            })
            .then(html => {
                // Insert the component's HTML into the placeholder
                component.innerHTML = html;
                // If a callback was specified and exists as a global function, execute it
                if (callback && typeof window[callback] === 'function') {
                    window[callback]();
                }
            })
            .catch(error => {
                // Display error message if something goes wrong
                // Uses the dsis-error class which can be styled via CSS
                component.innerHTML = `
                    <div class="dsis-error">
                        [DSIS] Error: ${error.message}
                    </div>
                `;
                // Log the error to the console for debugging
                console.error('[DSIS]', error);
            });
    });
});
