import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  ssgName: "custom",
  devCommand: "npx serve . -p {port}",
  
  // NOTE: Top-level "assets" removed to fix the "forbidden peer" error

  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["."],
      
      // MOVED HERE: This fixes the "No assetsConfig" warning safely
      assetsConfig: {
        referenceType: "static",
        staticDir: ".",
        uploadDir: "images",
        publicPath: "/"
      },

      exclude: [
        ".netlify/**",
        "node_modules/**",
        ".git/**",
        "stackbit.config.ts",
        "package*.json"
      ],
      
      models: [
        {
          name: "Page", // Matches your :Page in HTML
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

  siteMap: ({ documents }) => {
    return documents
      .filter((doc) => doc.modelName === "Page")
      .map((doc) => {
        const slug = doc.id.replace(/\.html$/, "");
        return {
          urlPath: slug === "index" ? "/" : `/${slug}`,
          document: doc
        };
      });
  }
});
