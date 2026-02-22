import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';

export default defineStackbitConfig({
    stackbitVersion: '~0.6.0',
    ssgName: 'nextjs', // Change to 'gatsby', 'hugo', 'eleventy', etc.
    nodeVersion: '18',
    contentSources: [
        new GitContentSource({
            rootPath: __dirname,
            contentDirs: ['content'], // Folder where your content files live
            models: [], // You will define your content models here later
            assetsConfig: {
                referenceType: 'static',
                staticDir: 'public',
                uploadDir: 'images',
                publicPath: '/'
            }
        })
    ]
});
