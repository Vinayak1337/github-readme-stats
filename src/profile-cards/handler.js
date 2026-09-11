import axios from "axios";
import { readFileSync } from "node:fs";
import { fetchProfile, validateProfile, USERNAME } from "./fetch.js";
import { renderStreak, renderTrophy } from "./render.js";
import { xml } from "./stats.js";
let good, pending;
let lastLiveFetch = 0;
const TTL = 15 * 60 * 1000;
const snapshotUrl =
  "https://raw.githubusercontent.com/Vinayak1337/github-readme-stats/profile-card-snapshots/profile.json";
async function profile() {
  if (good && Date.now() - lastLiveFetch < TTL)
    return { data: good, source: "memory" };
  if (!pending)
    pending = fetchProfile().finally(() => {
      pending = null;
    });
  try {
    good = await pending;
    lastLiveFetch = Date.now();
    return { data: good, source: "github" };
  } catch {
    // Recover the latest durable snapshot even after a cold start or token outage.
    try {
      const { data } = await axios.get(snapshotUrl, {
        timeout: 2500,
        maxContentLength: 50000,
      });
      const saved = validateProfile(data);
      if (!good || Date.parse(saved.updatedAt) > Date.parse(good.updatedAt))
        good = saved;
    } catch {
      /* Keep the last successful data. */
    }
    if (!good)
      good = validateProfile(
        JSON.parse(
          readFileSync(
            new URL("../data/profile-cards.json", import.meta.url),
            "utf8",
          ),
        ),
      );
    return { data: good, source: "fallback" };
  }
}
export function createHandler(kind) {
  return async (req, res) => {
    const username = req.query?.username ?? req.query?.user ?? USERNAME;
    const theme =
      typeof req.query?.theme === "string" ? req.query.theme : "merko";
    res.setHeader("X-Content-Type-Options", "nosniff");
    if (
      typeof username !== "string" ||
      username.toLowerCase() !== USERNAME.toLowerCase()
    ) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "image/svg+xml");
      res.setHeader("Cache-Control", "no-store");
      return res.send(
        `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="60"><text x="15" y="35">These cards are configured for ${xml(
          USERNAME,
        )}.</text></svg>`,
      );
    }
    try {
      const { data, source } = await profile();
      res.setHeader("X-Card-Source", source);
      res.setHeader("X-Card-Updated-At", data.updatedAt);
      res.setHeader(
        "Cache-Control",
        source === "fallback"
          ? "public, max-age=60, s-maxage=60"
          : "public, max-age=300, s-maxage=900, stale-while-revalidate=86400",
      );
      if (req.query?.type === "json") {
        res.setHeader("Content-Type", "application/json");
        return res.send(JSON.stringify(data));
      }
      res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
      return res.send(
        kind === "streak"
          ? renderStreak(data, theme)
          : renderTrophy(data, theme),
      );
    } catch {
      res.statusCode = 503;
      res.setHeader("Content-Type", "image/svg+xml");
      res.setHeader("Cache-Control", "no-store");
      return res.send(
        '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="60"><text x="15" y="35">Profile data temporarily unavailable.</text></svg>',
      );
    }
  };
}
