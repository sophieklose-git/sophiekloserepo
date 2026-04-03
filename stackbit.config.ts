import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  ssgName: "custom",
  devCommand: "npx serve . -p {port}",
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["."], // Tells it to look in your root folder for HTML files
      models: [
        {
          name: "Page",
          type: "page",
          urlPath: "/{slug}",
          filePath: "{slug}.html",
          fields: [
            { name: "title", type: "string" },
            { name: "body", type: "markdown" } // For the main content area
          ]
        }
      ]
    })
  ]
});
