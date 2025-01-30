/**
 * Doug's Shack Injection System (DSIS)
 * A simple system for injecting HTML components into static websites
 */

document.addEventListener('DOMContentLoaded', () => {
    // Find all DSIS placeholders
    const components = document.querySelectorAll('[id^="dsis-"]');

    components.forEach(component => {
        const name = component.id.replace('dsis-', '');
        const path = `dsis/${name}.html`;
        const callback = component.getAttribute('data-dsis-callback');

        // Fetch and inject component
        fetch(path)
            .then(response => {
                if (!response.ok) throw new Error(`File ${path} not found`);
                return response.text();
            })
            .then(html => {
                component.innerHTML = html;
                // Execute callback if specified
                if (callback && typeof window[callback] === 'function') {
                    window[callback]();
                }
            })
            .catch(error => {
                component.innerHTML = `
                    <div class="dsis-error">
                        [DSIS] Error: ${error.message}
                    </div>
                `;
                console.error('[DSIS]', error);
            });
    });
});
