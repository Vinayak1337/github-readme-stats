import { mkdir, writeFile } from "node:fs/promises";
import { renderStreak, renderTrophy } from "../src/profile-cards/render.js";
const response = await fetch(
  `https://github-stats.vinayak1337.vercel.app/api/streak?username=Vinayak1337&type=json&snapshot=${Date.now()}`,
  { signal: AbortSignal.timeout(35000) },
);
if (
  !response.ok ||
  !["github", "memory"].includes(response.headers.get("x-card-source"))
)
  throw new Error("Live refresh failed; retaining previous snapshots");
const p = await response.json();
if (
  p.username !== "Vinayak1337" ||
  !Number.isFinite(Date.parse(p.updatedAt)) ||
  Date.now() - Date.parse(p.updatedAt) > 3600000
)
  throw new Error("Stale snapshot; retaining previous cards");
await mkdir(".profile-card-output", { recursive: true });
await writeFile(
  ".profile-card-output/profile.json",
  JSON.stringify(p, null, 2) + "\n",
);
await writeFile(".profile-card-output/streak.svg", renderStreak(p));
await writeFile(".profile-card-output/trophy.svg", renderTrophy(p));
console.log(`Generated profile cards from ${p.updatedAt}`);
