# Self-hosted streak and trophy cards

The existing `/api`, `/api/top-langs`, `/api/pin`, and `/api/wakatime` handlers are unchanged. New Vercel functions share the deployment's existing `PAT_1`, `PAT_2`, … configuration; no Next.js migration, new hosting project, or new token is needed.

- `/api/streak?username=Vinayak1337&theme=merko`
- `/api/trophy?username=Vinayak1337&theme=merko`
- Add `type=json` to inspect the numeric source data and its timestamp.

These personal endpoints only accept Vinayak1337 (`user` is an alias for `username`). GitHub data is cached in process for 15 minutes and at the CDN for 15 minutes, with a five-minute browser cache. Requests coalesce within each function. Token retries and the API deadline are bounded. Existing card cache settings remain unchanged.

## Streaks and trophies

Streaks use every contribution-calendar year since account creation, deduplicate boundary dates, count consecutive calendar days and allow today to be unfinished. Today is UTC; the contribution dates come directly from GitHub. The returned calendar includes whatever public/private aggregate activity the configured token can see. Backdated work appears only once GitHub includes it in its calendar.

Trophy ranks and artwork are vendored from [ryo-ma/github-profile-trophy](../vendor/github-profile-trophy/README.md) at a pinned revision under MIT. Trophy counts are lifetime commit contributions and reviews, total issues/PRs/followers, and public owned non-fork repository stars, languages and counts. Private repository names and content are never returned or stored. Unlike upstream's recent-window commit calculation, lifetime commit trophies use `totalCommitContributions` summed over non-overlapping years; restricted contribution totals are not mislabeled as commits. Hidden trophies are shown only when earned. Other existing card themes also work; merko matches the existing README.

## Durable fallback

Every six hours, the scheduled workflow calls the live deployment and saves fresh data and SVGs to `profile-card-snapshots`. Bot commits stay off the default branch. Failed or stale refreshes leave that branch untouched. Live API failures fall back to the newest saved JSON, then the bundled baseline `src/data/profile-cards.json`. Fallbacks retain their original timestamp and have a short cache so recovery can happen quickly. Response headers `X-Card-Source` and `X-Card-Updated-At` expose freshness. Preview deployments of the snapshot branch are disabled.

The GitHub profile image proxy may add delay; this is not an instant-update service. Check Actions and the visible timestamp if updates stop. GitHub may disable scheduled workflows in public repositories after 60 days without activity. Run **Refresh profile card snapshots** manually to verify the updater. The snapshot SVGs can also be embedded directly from GitHub as an independent hosting fallback.
