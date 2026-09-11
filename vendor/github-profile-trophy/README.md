# Vendored trophy renderer

Source: https://github.com/ryo-ma/github-profile-trophy/tree/e3c89df995e92e67cdd4b2acaab9d974583dc1f7/src

MIT license retained in LICENSE. Original TypeScript is kept unchanged for auditability. entry.ts exports only TrophyList and COLORS. The runtime bundle is generated with:

```sh
npx --yes esbuild@0.25.12 vendor/github-profile-trophy/entry.ts --bundle --format=esm --platform=node --target=node16 --outfile=src/profile-cards/trophy-vendor.js
```

The bundle replaces the ES2023 `toSorted` calls with `slice().sort` for the parent project's Node 16 tests. No network, Redis, Deno server or token code is included. Live fetching, caching, fallback snapshots and the outer SVG are local code.
