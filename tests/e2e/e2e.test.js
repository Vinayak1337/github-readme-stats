/** Deployment smoke tests use repositories controlled by this fork's owner.
 * Exact live counts deliberately belong in mocked unit tests, not remote fixtures.
 */
import { describe, test, expect, beforeAll, jest } from "@jest/globals";
import axios from "axios";

jest.setTimeout(40000);
let base;
beforeAll(() => {
  expect(process.env.VERCEL_PREVIEW_URL).toBeDefined();
  base = new URL(process.env.VERCEL_PREVIEW_URL).origin;
});

async function request(path) {
  const response = await axios.get(`${base}${path}`, {
    timeout: 35000,
    validateStatus: () => true,
  });
  expect(response.headers["content-type"]).toContain("image/svg+xml");
  expect(response.data).toMatch(/<svg\b/);
  expect(response.data).toContain("</svg>");
  return response;
}

describe("Live profile deployment", () => {
  test.each([
    [
      "stats",
      "/api?username=Vinayak1337&theme=merko",
      "Vinayak's GitHub Stats",
    ],
    [
      "languages",
      "/api/top-langs?username=Vinayak1337&layout=compact&theme=merko",
      "Most Used Languages",
    ],
    [
      "repository",
      "/api/pin?username=Vinayak1337&repo=github-readme-stats",
      "github-readme-stats",
    ],
    [
      "streak",
      "/api/streak?username=Vinayak1337&theme=merko",
      "Current Streak",
    ],
    [
      "trophy",
      "/api/trophy?username=Vinayak1337&theme=merko",
      "GitHub Trophies",
    ],
  ])("serves the %s card", async (_name, path, title) => {
    const response = await request(path);
    expect(response.status).toBe(200);
    expect(response.data).toContain(title);
    expect(response.data).not.toMatch(
      /Something went wrong|temporarily unavailable/,
    );
    if (path.startsWith("/api/streak") || path.startsWith("/api/trophy")) {
      expect(["github", "memory", "fallback"]).toContain(
        response.headers["x-card-source"],
      );
      expect(
        Number.isFinite(Date.parse(response.headers["x-card-updated-at"])),
      ).toBe(true);
      expect(response.data).toContain("Updated ");
    }
  });

  test("keeps Wakatime parameter validation available without a third-party account", async () => {
    const response = await request("/api/wakatime");
    expect(response.status).toBe(200);
    expect(response.data).toContain("Missing params");
  });

  test("does not show personal data under a different username", async () => {
    const response = await request("/api/streak?username=other-user");
    expect(response.status).toBe(400);
    expect(response.data).toContain("configured for Vinayak1337");
    expect(response.headers["cache-control"]).toContain("no-store");
  });
});
