# Doug's Shack Injection System

A simple system that lets you reuse parts of your website (like headers and footers) across multiple pages without needing a server or complex programming knowledge. It's perfect for static websites hosted on platforms like Neocities, Nekoweb, or any basic web hosting.

## Features

- **No Server-Side Scripting Required**: Works with static HTML files
- **Easy to Use**: Simple setup with minimal to no JavaScript knowledge
- **Component Reuse**: Create reusable components for headers, footers, and more
- **Flexible Styling**: Support for component-specific and global styles
- **Callback Support**: Run code after components load
- **Cross-Browser Compatible**: Works in all modern browsers

## Quick Start

1. **Set up your directory structure:**
   ```
   your-website/
   ├── dsis/
   │   ├── dsis.js
   │   ├── header.html
   │   └── footer.html
   └── index.html
   ```

2. **Add DSIS to your page:**
   ```html
   <script src="dsis/dsis.js"></script>
   ```

3. **Add component placeholders:**
   ```html
   <div id="dsis-header"></div>
   <div id="dsis-footer"></div>
   ```

## Important Notes

- JavaScript is required for the system to work
- Local testing **requires a web server** due to CORS policies (local file:// URLs won't work)
- Head section content cannot be injected (must be included in each page)

## Documentation

For detailed usage instructions and examples, please see:
- [How To Guide](HOWTO.md)
- [Example Page](EXAMPLE.html)

## License

This project is licensed under:
- [The Unlicense](UNLICENSE)

## Testing Locally

To test locally, use one of these methods:
- Any basic web server
- VS Code Live Server extension
- Python's built-in server: `python -m http.server`

## Support

If you encounter issues:
1. Check the browser console (F12) for error messages
2. Verify file paths are correct
3. Ensure you're using a local web server for testing (local file:// URLs won't work)
4. Review the [How To Guide](HOWTO.md) for troubleshooting tips

## Contributing

Feel free to submit issues and enhancement requests!
