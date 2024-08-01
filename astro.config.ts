import db from "@astrojs/db";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import imgAttr from "remark-imgattr";

import { autolinkConfig } from "./plugins/rehype-autolink-config";

export default defineConfig({
  site: "https://eva.town",
  output: "hybrid",
  prefetch: true,
  integrations: [
    react(),
    expressiveCode({
      styleOverrides: {
        codeFontFamily:
          "'MonoLisa', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
      },
    }),
    mdx(),
    sitemap(),
    db(),
  ],
  trailingSlash: "never",
  adapter: vercel(),
  markdown: {
    rehypePlugins: [rehypeHeadingIds, [rehypeAutolinkHeadings, autolinkConfig]],
    remarkPlugins: [imgAttr],
  },
  vite: {
    optimizeDeps: {
      exclude: ["fsevents"],
    },
  },
  redirects: {
    "/projects": "/",
    "/projects/genderswap": "/posts/genderswap",
    "/projects/boundaries-map": "/posts/boundaries-map",
    "/projects/commonplace": "/posts/commonplace",
    "/friends": "/webrings",
  },
});
