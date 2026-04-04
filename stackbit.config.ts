import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  ssgName: "eleventy",
  nodeVersion: "22",
  devCommand: "npx @11ty/eleventy --serve --port {port}",

  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["content"],
      models: [
        {
          name: "Page",
          type: "page",
          urlPath: "/{slug}",
          filePath: "content/{slug}.md",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "layout", type: "string", const: "base.njk", hidden: true },
            { name: "permalink", type: "string" }
          ]
        }
      ],
      assetsConfig: {
        referenceType: "static",
        staticDir: ".",
        uploadDir: "images",
        publicPath: "/"
      }
    })
  ],

  siteMap: ({ documents }) => {
    return documents
      .filter((doc) => doc.modelName === "Page")
      .map((doc) => {
        const slug = doc.id.replace(/^content\//, "").replace(/\.md$/, "");
        return {
          urlPath: slug === "index" ? "/" : `/${slug}/`,
          document: doc
        };
      });
  }
});
