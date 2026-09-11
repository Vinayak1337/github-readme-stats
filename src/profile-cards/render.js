import themes from "../../themes/index.js";
import { COLORS, TrophyList } from "./trophy-vendor.js";
import { xml } from "./stats.js";
const fmt = (n) => new Intl.NumberFormat("en-US").format(n);
const text = (x, y, s, size, color, extra = "") =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" ${extra}>${xml(
    s,
  )}</text>`;
function colors(theme) {
  const t = Object.hasOwn(themes, theme) ? themes[theme] : themes.merko;
  return {
    background: `#${t.bg_color}`,
    title: `#${t.title_color}`,
    text: `#${t.text_color}`,
    icon: `#${t.icon_color}`,
  };
}
function footer(p) {
  return `Updated ${p.updatedAt
    .slice(0, 16)
    .replace("T", " ")} UTC · GitHub calendar dates`;
}
function base(width, height, title, description, background, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc"><title id="title">${xml(
    title,
  )}</title><desc id="desc">${xml(
    description,
  )}</desc><rect x=".5" y=".5" width="${width - 1}" height="${
    height - 1
  }" rx="12" fill="${background}" stroke="#354333"/><g font-family="Segoe UI,Arial,sans-serif">${body}</g></svg>`;
}
export function renderStreak(p, theme = "merko") {
  const c = colors(theme),
    cols = [
      ["Total contributions", fmt(p.streak.total), `Since ${p.since}`],
      [
        "Current streak",
        `${p.streak.current} days`,
        "Today may still be in progress",
      ],
      [
        "Longest streak",
        `${p.streak.longest} days`,
        p.streak.longestStart
          ? `${p.streak.longestStart} — ${p.streak.longestEnd}`
          : "No contributions yet",
      ],
    ];
  return base(
    840,
    230,
    "Vinayak · Contribution streak",
    cols.map((c) => c.join(": ")).join(". "),
    c.background,
    text(28, 33, "CONTRIBUTION STREAK", 12, c.title, 'letter-spacing="2"') +
      text(812, 33, "@" + p.username, 12, c.text, 'text-anchor="end"') +
      cols
        .map((col, i) => {
          const x = 28 + i * 270;
          return (
            text(x, 80, col[0], 14, c.text) +
            text(x, 126, col[1], 34, c.title) +
            text(x, 157, col[2], 11, c.text)
          );
        })
        .join("") +
      `<path d="M28 184H812" stroke="#354333"/>` +
      text(28, 213, footer(p), 11, c.text),
  );
}
export function renderTrophy(p, theme = "merko") {
  const c = colors(theme),
    palette = {
      ...(Object.hasOwn(COLORS, theme) ? COLORS[theme] : COLORS.default),
      BACKGROUND: c.background,
      TITLE: c.title,
      TEXT: c.text,
      LAUREL: c.icon,
      NEXT_RANK_BAR: c.title,
    };
  const trophies = new TrophyList(p);
  trophies.filterByHidden();
  trophies.sortByRank();
  const columns = 7,
    panel = 110,
    gap = 8,
    rows = Math.ceil(trophies.length / columns),
    width = 840,
    height = 75 + rows * (panel + gap);
  const body = trophies.getArray
    .map((t, i) =>
      t.render(
        palette,
        11 + (i % columns) * (panel + gap),
        46 + Math.floor(i / columns) * (panel + gap),
        panel,
        true,
        true,
      ),
    )
    .join("");
  return base(
    width,
    height,
    "Vinayak · GitHub trophies",
    trophies.getArray
      .map((t) => `${t.title}: ${t.rank}, ${t.bottomMessage}`)
      .join(". "),
    c.background,
    text(22, 28, "GITHUB TROPHIES", 12, c.title, 'letter-spacing="2"') +
      text(818, 28, "@" + p.username, 12, c.text, 'text-anchor="end"') +
      body +
      text(22, height - 12, footer(p), 11, c.text),
  );
}
