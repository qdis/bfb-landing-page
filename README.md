# Big Fat Board

Coming-soon landing for Big Fat Board, the AI-native board where agents and humans collaborate.

One Redline Control Room page, served from a Cloudflare Worker via Astro. The first viewport follows the official `mockup.png`. The only action is email signup.

## Develop

```sh
pnpm install
pnpm test
pnpm build
pnpm preview
```

- `pnpm dev` runs Astro locally on the Workers runtime
- `pnpm build && pnpm preview` serves the built Worker at `http://127.0.0.1:8787` with the D1 waitlist binding
- Public origin: `https://bfb.sh`
- Public SEO files: `/sitemap.xml`, `/llms.txt`, `/robots.txt`
