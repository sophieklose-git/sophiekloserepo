import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  ssgName: "custom",
  devCommand: "npx serve . -p {port}",
  
  // 1. Asset Handling: Stops the 'assetsConfig' warning
  assets: {
    referenceType: "static",
    staticDir: ".",
    uploadDir: "images",
    publicPath: "/"
  },

  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["."],
      // 2. Exclusions: Stops errors from .netlify and node_modules folders
      exclude: [
        ".netlify/**",
        "node_modules/**",
        ".git/**",
        "stackbit.config.ts",
        "package*.json"
      ],
      models: [
        {
          name: "Page",
          type: "page",
          urlPath: "/{slug}",
          filePath: "{slug}.html",
          fields: [
            { name: "title", type: "string" },
            { name: "body", type: "markdown" }
          ]
        }
      ]
    })
  ],

  // 3. Sitemap Mapper: Forces the Visual Editor to see your .html files as pages
  siteMap: ({ documents }) => {
    return documents
      .filter((doc) => doc.modelName === "Page")
      .map((doc) => {
        // Remove .html for the URL, handle index.html as root '/'
        const slug = doc.id.replace(/\.html$/, "");
        return {
          urlPath: slug === "index" ? "/" : `/${slug}`,
          document: doc
        };
      });
  }
});
