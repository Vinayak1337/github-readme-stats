/** @jest-environment node */
import { jest } from "@jest/globals";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { streaks } from "../src/profile-cards/stats.js";
import { fetchProfile, validateProfile } from "../src/profile-cards/fetch.js";
import { renderStreak, renderTrophy } from "../src/profile-cards/render.js";
import { createHandler } from "../src/profile-cards/handler.js";
import { readFileSync } from "node:fs";

const day = (date, contributionCount) => ({ date, contributionCount });
const baseline = JSON.parse(
  readFileSync(new URL("../src/data/profile-cards.json", import.meta.url)),
);
const mock = new MockAdapter(axios);
const originalToken = process.env.PAT_1;
beforeEach(() => {
  mock.reset();
  process.env.PAT_1 = "test-only-not-a-real-token";
});
afterAll(() => {
  mock.restore();
  if (originalToken === undefined) delete process.env.PAT_1;
  else process.env.PAT_1 = originalToken;
});

it("keeps yesterday's streak alive until today finishes", () => {
  const result = streaks(
    [day("2026-09-03", 2), day("2026-09-04", 1), day("2026-09-05", 0)],
    "2026-09-05",
  );
  expect(result.current).toBe(2);
  expect(result.longest).toBe(2);
});
it("breaks on missing dates and ignores future contributions", () => {
  const result = streaks(
    [day("2026-09-01", 1), day("2026-09-03", 1), day("2026-09-06", 8)],
    "2026-09-05",
  );
  expect(result.current).toBe(0);
  expect(result.longest).toBe(1);
  expect(result.total).toBe(2);
});
it("deduplicates overlapping dates across calendar years", () => {
  const r = streaks(
    [day("2025-12-31", 3), day("2026-01-01", 2), day("2025-12-31", 3)],
    "2026-01-01",
  );
  expect(r.current).toBe(2);
  expect(r.total).toBe(5);
  expect(r.longestStart).toBe("2025-12-31");
});
it("renders an empty account without fake achievements or NaN", () => {
  const p = {
    ...baseline,
    streak: streaks([], "2026-09-05"),
    totalCommits: 0,
    totalReviews: 0,
    totalFollowers: 0,
    totalIssues: 0,
    totalPullRequests: 0,
    totalOrganizations: 0,
    totalRepositories: 0,
    totalStargazers: 0,
    languageCount: 0,
    durationYear: 0,
    durationDays: 0,
  };
  expect(renderStreak(p)).toContain("0 days");
  expect(renderTrophy(p)).not.toMatch(/NaN|Infinity|LongTimeUser/);
});
it("uses upstream earned ranks and escapes untrusted text", () => {
  const p = { ...baseline, username: "<script>&", totalFollowers: 100 };
  const svg = renderTrophy(p, "radical");
  expect(svg).toContain("Followers");
  expect(svg).toContain("100pt");
  expect(svg).not.toContain("<script>");
  expect(svg).toContain("&lt;script&gt;&amp;");
  expect(svg).toContain("Updated ");
});
it("rejects malformed and mismatched durable snapshots", () => {
  expect(() =>
    validateProfile({ ...baseline, username: "someone-else" }),
  ).toThrow();
  expect(() =>
    validateProfile({
      ...baseline,
      streak: { ...baseline.streak, total: NaN },
    }),
  ).toThrow();
});
it("fetches all pages and non-overlapping years with existing PAT configuration", async () => {
  const creation = "2025-12-30T00:00:00Z";
  mock.onPost("https://api.github.com/graphql").reply((config) => {
    const { query, variables } = JSON.parse(config.data);
    expect(config.headers.Authorization).toBe(
      "bearer test-only-not-a-real-token",
    );
    if (query.includes("createdAt"))
      return [
        200,
        {
          data: {
            user: {
              createdAt: creation,
              followers: { totalCount: 2 },
              organizations: { totalCount: 0 },
              issues: { totalCount: 3 },
              pullRequests: { totalCount: 4 },
              repositories: {
                totalCount: 2,
                nodes: [
                  { stargazerCount: 2, languages: { nodes: [{ name: "JS" }] } },
                ],
                pageInfo: { hasNextPage: true, endCursor: "next" },
              },
            },
          },
        },
      ];
    if (variables.after === "next")
      return [
        200,
        {
          data: {
            user: {
              repositories: {
                nodes: [
                  { stargazerCount: 5, languages: { nodes: [{ name: "TS" }] } },
                ],
                pageInfo: { hasNextPage: false, endCursor: null },
              },
            },
          },
        },
      ];
    expect(query).toContain('to:"2025-12-31T23:59:59Z"');
    expect(query).toContain('from:"2026-01-01T00:00:00Z"');
    const calendar = (days, commits) => ({
      totalCommitContributions: commits,
      totalPullRequestReviewContributions: 1,
      contributionCalendar: { weeks: [{ contributionDays: days }] },
    });
    return [
      200,
      {
        data: {
          user: {
            y2025: calendar([day("2025-12-31", 2)], 1),
            y2026: calendar([day("2026-01-01", 4)], 2),
          },
        },
      },
    ];
  });
  const result = await fetchProfile(new Date("2026-01-01T12:00:00Z"));
  expect(result.streak.current).toBe(2);
  expect(result.streak.total).toBe(6);
  expect(result.totalCommits).toBe(3);
  expect(result.totalStargazers).toBe(7);
  expect(result.languageCount).toBe(2);
});
it("does not turn partial GitHub failures into zero-valued stats", async () => {
  mock
    .onPost()
    .reply(200, { data: { user: null }, errors: [{ message: "Unavailable" }] });
  await expect(fetchProfile()).rejects.toThrow("refresh failed");
});
it("rejects other usernames before fetching or using personal fallback data", async () => {
  const res = { setHeader: jest.fn(), send: jest.fn() };
  await createHandler("streak")({ query: { username: "other-user" } }, res);
  expect(res.statusCode).toBe(400);
  expect(mock.history.post).toHaveLength(0);
  expect(res.send.mock.calls[0][0]).toContain("configured for Vinayak1337");
});
it("can serve the bundled baseline on a cold-start double outage", async () => {
  mock.onPost().reply(503);
  mock.onGet().reply(503);
  const res = { setHeader: jest.fn(), send: jest.fn() };
  await createHandler("trophy")({ query: {} }, res);
  expect(res.statusCode).toBeUndefined();
  expect(res.send.mock.calls[0][0]).toContain("GITHUB TROPHIES");
  expect(res.setHeader).toHaveBeenCalledWith("X-Card-Source", "fallback");
});
it("keeps a valid saved card available during a GitHub outage", async () => {
  mock.onPost().reply(503);
  mock.onGet().reply(200, baseline);
  const res = { setHeader: jest.fn(), send: jest.fn() };
  await createHandler("streak")({ query: { username: "Vinayak1337" } }, res);
  expect(res.send.mock.calls[0][0]).toContain("<svg");
  expect(res.send.mock.calls[0][0]).toContain(
    baseline.updatedAt.slice(0, 16).replace("T", " "),
  );
  expect(res.setHeader).toHaveBeenCalledWith("X-Card-Source", "fallback");
  expect(res.setHeader).toHaveBeenCalledWith(
    "X-Card-Updated-At",
    baseline.updatedAt,
  );
});
