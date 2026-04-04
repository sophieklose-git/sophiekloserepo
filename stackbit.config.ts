import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  ssgName: "custom",
  devCommand: "npx serve . -p {port}",

  contentSources: [
    new GitContentSource({
      rootPath: __dirname,

      // Your HTML files are in the repo root
      contentDirs: ["."],
      contentFileTypes: ["html"],

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
          name: "Page",
          type: "page",

          filePath: "*{slug}.html",
          urlPath: "/{slug}",

          fields: [
            { name: "title", type: "string" },
            { name: "body", type: "string" }
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
