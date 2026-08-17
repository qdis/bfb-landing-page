# Big Fat Board

Coming-soon landing for Big Fat Board, the AI-native board where agents and humans collaborate.

Five visual variants of the same page, served from a Cloudflare Worker via Astro.

## Develop

```sh
pnpm install
pnpm test
pnpm build
pnpm preview:worker
```

- `pnpm dev` runs Astro locally on the Workers runtime
- `pnpm build && pnpm preview` serves the built Worker at `http://127.0.0.1:8787` with the SIGNUPS KV binding
- Public SEO files: `/sitemap.xml`, `/llms.txt`, `/robots.txt`

## Variants

- `/` default (obit)
- `/v/obit`
- `/v/dispatch`
- `/v/stencil`
- `/v/split`
- `/v/tape`
