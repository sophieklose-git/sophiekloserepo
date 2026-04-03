import { defineStackbitConfig } from '@stackbit/types';

export default defineStackbitConfig({
    stackbitVersion: '~0.6.0',
    ssgName: 'static', // Tells Netlify this is a static HTML site
    devCommand: 'npx serve . -p {port}', // Serves your root folder
    pagesDir: '.', // Tells it where your HTML files are
    // ... any other existing configuration
});
