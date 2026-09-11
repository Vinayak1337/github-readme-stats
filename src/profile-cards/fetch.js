import axios from "axios";
import { streaks } from "./stats.js";
export const USERNAME = "Vinayak1337";

async function graphql(query, variables, deadline) {
  const tokens = Object.keys(process.env)
    .filter((k) => /^PAT_\d+$/.test(k))
    .sort((a, b) => Number(a.slice(4)) - Number(b.slice(4)))
    .map((k) => process.env[k])
    .filter(Boolean);
  if (!tokens.length) throw new Error("GitHub token is not configured");
  for (let i = 0; i < tokens.length; i++) {
    const remaining = deadline - Date.now();
    if (remaining <= 0) throw new Error("GitHub request deadline exceeded");
    try {
      const { data } = await axios.post(
        "https://api.github.com/graphql",
        { query, variables },
        {
          headers: { Authorization: `bearer ${tokens[i]}` },
          timeout: Math.min(10000, remaining),
        },
      );
      if (
        data.errors?.some((e) => e.type === "RATE_LIMITED") &&
        i + 1 < tokens.length
      )
        continue;
      if (data.errors || !data.data)
        throw new Error("GitHub returned an incomplete response");
      return data.data;
    } catch (error) {
      if (
        [401, 403, 429].includes(error.response?.status) &&
        i + 1 < tokens.length
      )
        continue;
      throw new Error("GitHub profile refresh failed");
    }
  }
  throw new Error("GitHub tokens unavailable");
}

export function validateProfile(p) {
  const numbers = [
    p?.streak?.total,
    p?.streak?.current,
    p?.streak?.longest,
    p?.totalCommits,
    p?.totalFollowers,
    p?.totalIssues,
    p?.totalOrganizations,
    p?.totalPullRequests,
    p?.totalReviews,
    p?.totalStargazers,
    p?.totalRepositories,
    p?.languageCount,
    p?.durationYear,
    p?.durationDays,
    p?.ancientAccount,
    p?.ogAccount,
    p?.joined2020,
  ];
  if (
    p?.username !== USERNAME ||
    !Number.isFinite(Date.parse(p?.updatedAt)) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(p?.since) ||
    numbers.some((n) => !Number.isInteger(n) || n < 0)
  )
    throw new Error("Invalid profile snapshot");
  return p;
}

export async function fetchProfile(now = new Date()) {
  const deadline = Date.now() + 23000;
  const repositories = `repositories(first:100,after:$after,privacy:PUBLIC,ownerAffiliations:OWNER,isFork:false){totalCount nodes{stargazerCount languages(first:100){nodes{name}}}pageInfo{hasNextPage endCursor}}`;
  const { user } = await graphql(
    `query($after:String){user(login:"${USERNAME}"){createdAt followers{totalCount} organizations{totalCount} issues{totalCount} pullRequests{totalCount} ${repositories}}}`,
    { after: null },
    deadline,
  );
  if (!user) throw new Error("GitHub user not found");
  const year = Number(user.createdAt.slice(0, 4));
  if (!Number.isInteger(year) || year < 2005 || year > now.getUTCFullYear())
    throw new Error("Invalid account creation date");
  let nodes = [...user.repositories.nodes],
    page = user.repositories.pageInfo;
  while (page.hasNextPage) {
    const { user: u } = await graphql(
      `query($after:String){user(login:"${USERNAME}"){${repositories}}}`,
      { after: page.endCursor },
      deadline,
    );
    nodes.push(...u.repositories.nodes);
    page = u.repositories.pageInfo;
  }
  // One aliased request covers every calendar year; boundaries do not overlap.
  const years = [];
  for (let y = year; y <= now.getUTCFullYear(); y++) years.push(y);
  const fields = years
    .map(
      (y) =>
        `y${y}:contributionsCollection(from:"${y}-01-01T00:00:00Z",to:"${
          y === now.getUTCFullYear()
            ? now.toISOString()
            : `${y}-12-31T23:59:59Z`
        }"){totalCommitContributions totalPullRequestReviewContributions contributionCalendar{weeks{contributionDays{date contributionCount}}}}`,
    )
    .join("\n");
  const { user: calendar } = await graphql(
    `query{user(login:"${USERNAME}"){${fields}}}`,
    {},
    deadline,
  );
  let days = [],
    totalCommits = 0,
    totalReviews = 0;
  for (const y of years) {
    const c = calendar?.[`y${y}`];
    const part = c?.contributionCalendar?.weeks?.flatMap(
      (w) => w.contributionDays,
    );
    if (
      !part?.length ||
      !Number.isInteger(c.totalCommitContributions) ||
      !Number.isInteger(c.totalPullRequestReviewContributions) ||
      part.some(
        (d) =>
          !/^\d{4}-\d{2}-\d{2}$/.test(d.date) ||
          !Number.isInteger(d.contributionCount) ||
          d.contributionCount < 0,
      )
    )
      throw new Error("Incomplete contribution calendar");
    days.push(...part);
    totalCommits += c.totalCommitContributions;
    totalReviews += c.totalPullRequestReviewContributions;
  }
  const age = now.getTime() - Date.parse(user.createdAt);
  return validateProfile({
    username: USERNAME,
    updatedAt: now.toISOString(),
    since: user.createdAt.slice(0, 10),
    streak: streaks(days, now.toISOString().slice(0, 10)),
    totalCommits,
    totalReviews,
    totalFollowers: user.followers.totalCount,
    totalIssues: user.issues.totalCount,
    totalPullRequests: user.pullRequests.totalCount,
    totalOrganizations: user.organizations.totalCount,
    totalRepositories: user.repositories.totalCount,
    totalStargazers: nodes.reduce((sum, r) => sum + r.stargazerCount, 0),
    languageCount: new Set(
      nodes.flatMap((r) => r.languages.nodes.map((l) => l.name)),
    ).size,
    durationYear: new Date(age).getUTCFullYear() - 1970,
    durationDays: Math.floor(age / 86400000 / 100),
    ancientAccount: year <= 2010 ? 1 : 0,
    ogAccount: year <= 2008 ? 1 : 0,
    joined2020: year === 2020 ? 1 : 0,
  });
}
