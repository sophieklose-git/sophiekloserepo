import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';

export default defineStackbitConfig({
    stackbitVersion: '~0.6.0',
    ssgName: 'custom', // Using 'custom' is often safer for debugging
    contentSources: [
        new GitContentSource({
            rootPath: __dirname,
            contentDirs: ['content'], // Ensure this matches your folder name exactly
            models: [
                {
                    name: "Page",
                    type: "page", // This tells Netlify this model represents a URL-able page
                    urlPath: "/{slug}", // How the filename relates to the URL
                    filePath: "{slug}.md", // Assumes your files are Markdown
                    fields: [
                        { name: "title", type: "string", required: true },
                        { name: "body", type: "markdown" }
                    ]
                }
            ]
        })
    ]
});
