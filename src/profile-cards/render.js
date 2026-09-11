import themes from "../../themes/index.js";
import { COLORS, TrophyList } from "./trophy-vendor.js";
import { xml } from "./stats.js";

const fmt = (n) => new Intl.NumberFormat("en-US").format(n);
const text = (x, y, value, size, color, extra = "") =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" ${extra}>${xml(
    value,
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
function updated(p) {
  return `Updated ${p.updatedAt.slice(0, 16).replace("T", " ")} UTC`;
}
function date(value, year = false) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    ...(year ? { year: "numeric" } : {}),
    timeZone: "UTC",
  }).format(new Date(value));
}
function base(height, title, description, background, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="495" height="${height}" viewBox="0 0 495 ${height}" role="img" aria-labelledby="title desc"><title id="title">${xml(
    title,
  )}</title><desc id="desc">${xml(
    description,
  )}</desc><rect x=".5" y=".5" width="494" height="${
    height - 1
  }" rx="4.5" fill="${background}" stroke="#e4e2e2"/><g font-family="Segoe UI, Ubuntu, Helvetica Neue, sans-serif">${body}</g></svg>`;
}

export function renderStreak(p, theme = "merko") {
  const c = colors(theme);
  const center = 'text-anchor="middle"';
  const range = p.streak.longestStart
    ? `${date(p.streak.longestStart)} – ${date(p.streak.longestEnd, true)}`
    : "No contributions yet";
  const description = `Total contributions: ${
    p.streak.total
  }. Current streak: ${p.streak.current} days. Longest streak: ${
    p.streak.longest
  } days. ${updated(p)}. GitHub calendar dates.`;
  return base(
    195,
    `${p.username}'s GitHub Streak`,
    description,
    c.background,
    `<path d="M165 30v123M330 30v123" stroke="${c.text}" stroke-opacity=".22"/>` +
      text(
        82.5,
        83,
        fmt(p.streak.total),
        28,
        c.title,
        `${center} font-weight="700"`,
      ) +
      text(82.5, 112, "Total Contributions", 14, c.title, center) +
      text(
        82.5,
        136,
        `${date(p.since, true)} – Present`,
        10.5,
        c.text,
        center,
      ) +
      `<circle cx="247.5" cy="76" r="38" stroke="${c.icon}" stroke-width="4" fill="none"/>` +
      `<rect x="236" y="26" width="23" height="21" fill="${c.background}"/>` +
      `<g transform="translate(239.5 26)" fill="${c.icon}"><path d="M8 0c1 5-3 6-2 10 1-1 2-2 2-4 5 3 8 6 8 10a8 8 0 0 1-16 0C0 10 6 8 8 0Zm0 12c-1 3-4 4-4 7a4 4 0 0 0 8 0c0-2-1-4-4-7Z"/></g>` +
      text(
        247.5,
        86,
        fmt(p.streak.current),
        28,
        c.icon,
        `${center} font-weight="700"`,
      ) +
      text(
        247.5,
        135,
        "Current Streak",
        14,
        c.icon,
        `${center} font-weight="700"`,
      ) +
      text(
        247.5,
        155,
        p.streak.current
          ? `${p.streak.current} consecutive ${
              p.streak.current === 1 ? "day" : "days"
            }`
          : "No active streak",
        11,
        c.text,
        center,
      ) +
      text(
        412.5,
        83,
        fmt(p.streak.longest),
        28,
        c.title,
        `${center} font-weight="700"`,
      ) +
      text(412.5, 112, "Longest Streak", 14, c.title, center) +
      text(412.5, 136, range, 10.5, c.text, center) +
      text(247.5, 182, updated(p), 8.5, c.text, `${center} opacity=".65"`),
  );
}

export function renderTrophy(p, theme = "merko") {
  const c = colors(theme);
  const palette = {
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
  const columns = 5,
    tile = 92,
    gap = 3,
    rows = Math.ceil(trophies.length / columns),
    height = 58 + rows * 101;
  const body = trophies.getArray
    .map((t, i) => {
      const row = Math.floor(i / columns),
        count = Math.min(columns, trophies.length - row * columns);
      const offset = (495 - (count * tile + (count - 1) * gap)) / 2;
      const x = offset + (i % columns) * (tile + gap),
        y = 45 + row * 101;
      // Preserve upstream artwork proportions while fitting the standard card width.
      return `<g transform="translate(${x} ${y}) scale(${
        tile / 110
      })">${t.render(palette, 0, 0, 110, true, true)}</g>`;
    })
    .join("");
  return base(
    height,
    `${p.username}'s GitHub Trophies`,
    trophies.getArray
      .map((t) => `${t.title}: ${t.rank}, ${t.bottomMessage}`)
      .join(". ") + `. ${updated(p)}.`,
    c.background,
    text(25, 32, "GitHub Trophies", 18, c.title, 'font-weight="600"') +
      body +
      text(
        247.5,
        height - 10,
        updated(p),
        8.5,
        c.text,
        'text-anchor="middle" opacity=".65"',
      ),
  );
}
