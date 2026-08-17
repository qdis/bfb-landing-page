// ABOUTME: Builds /llms.txt in the llmstxt.org shape from the shared page list.
// ABOUTME: H1, blockquote summary, then H2 file lists of public pages.

import { COPY, SITE_NAME, publicPages } from "./copy";
import { absoluteUrl } from "./site";

export function generateLlmsTxt(origin: string): string {
  const pages = publicPages()
    .map((page) => `- [${page.title}](${absoluteUrl(page.path, origin)}): ${page.summary}`)
    .join("\n");

  return `# ${SITE_NAME}

> ${COPY.description}

${COPY.claims.traditionalDead} ${COPY.claims.jiraDead} ${COPY.claims.aiNative} ${COPY.claims.timeTracking} ${COPY.claims.remoteStart} ${COPY.claims.trio}

## Pages

${pages}
`;
}
