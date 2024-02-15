// @ts-check
import { withContent } from "@fuma-content/next";
import rehypeShiki from "@shikijs/rehype";

export default withContent({
  content: {
    files: ["./content/**/*"],
    outputDir: "./.content",
    mdxOptions: {
      rehypePlugins: [[rehypeShiki, { theme: "github-dark" }]],
    },
  },
});
