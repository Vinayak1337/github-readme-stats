// Derived from ryo-ma/github-profile-trophy, MIT. See vendor/github-profile-trophy/LICENSE and README.md.
// vendor/github-profile-trophy/utils.ts
function abridgeScore(score) {
  if (Math.abs(score) < 1) {
    return "0pt";
  }
  if (Math.abs(score) > 999) {
    return (Math.sign(score) * (Math.abs(score) / 1e3)).toFixed(1) + "kpt";
  }
  return (Math.sign(score) * Math.abs(score)).toString() + "pt";
}
var HOUR_IN_MILLISECONDS = 60 * 60 * 1e3;
var CONSTANTS = {
  CACHE_MAX_AGE: 18800,
  CDN_CACHE_MAX_AGE: 28800,
  // 8 hours for CDN edge cache
  STALE_WHILE_REVALIDATE: 86400,
  // 24 hours - serve stale while revalidating
  DEFAULT_PANEL_SIZE: 110,
  DEFAULT_MAX_COLUMN: 8,
  DEFAULT_MAX_ROW: 3,
  DEFAULT_MARGIN_W: 0,
  DEFAULT_MARGIN_H: 0,
  DEFAULT_NO_BACKGROUND: false,
  DEFAULT_NO_FRAME: false,
  DEFAULT_GITHUB_API: "https://api.github.com/graphql",
  DEFAULT_GITHUB_RETRY_DELAY: 500,
  REVALIDATE_TIME: HOUR_IN_MILLISECONDS * 6,
  REDIS_TTL: HOUR_IN_MILLISECONDS * 4
};
var RANK = /* @__PURE__ */ ((RANK2) => {
  RANK2["SECRET"] = "SECRET";
  RANK2["SSS"] = "SSS";
  RANK2["SS"] = "SS";
  RANK2["S"] = "S";
  RANK2["AAA"] = "AAA";
  RANK2["AA"] = "AA";
  RANK2["A"] = "A";
  RANK2["B"] = "B";
  RANK2["C"] = "C";
  RANK2["UNKNOWN"] = "?";
  return RANK2;
})(RANK || {});
var RANK_ORDER = Object.values(RANK);

// vendor/github-profile-trophy/icons.ts
var leafIcon = (laurel) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="90pt" height="90pt" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.15, written by Peter Selinger 2001-2017
</metadata>
<g transform="translate(20.000000,60.000000) scale(0.00400000,-0.00400000)" fill="${laurel}" stroke="none">
<path d="M200 5103 c0 -2 18 -40 41 -84 47 -95 62 -132 50 -125 -15 10 -18 -39 -6 -87 31 -121 265 -468 412 -608 124 -119 281 -222 383 -251 36 -10 49 -16 30 -13 -19 3 -78 12 -130 20 -117 17 -353 35 -477 35 l-93 0 53 -82 c72 -112 72 -112 59 -104 -18 11 -26 -41 -13 -84 25 -84 261 -376 404 -502 95 -83 222 -168 304 -205 98 -43 194 -73 242 -74 l46 -1 -45 -8 c-25 -5 -124 -21 -220 -36 -96 -15 -177 -29 -180 -31 -2 -2 0 -7 5 -11 27 -19 138 -144 123 -139 -18 6 -28 -10 -28 -47 0 -38 53 -108 141 -187 349 -313 631 -450 939 -453 63 0 131 2 150 7 19 4 -35 -17 -120 -46 -236 -82 -310 -110 -310 -117 0 -3 29 -28 65 -54 55 -40 102 -84 67 -62 -13 8 -32 -24 -32 -54 0 -99 486 -361 790 -426 125 -27 327 -25 444 4 113 28 261 98 309 145 39 40 56 92 38 124 -8 17 -4 24 29 49 22 16 40 32 40 36 0 4 -26 40 -58 80 -162 203 -368 328 -608 369 -89 15 -368 6 -474 -15 -131 -26 -147 -26 -59 -3 51 13 102 34 122 50 38 29 61 84 51 123 -5 18 1 26 25 39 17 8 31 19 31 23 0 4 -16 38 -35 75 -163 317 -424 501 -781 548 -113 15 -127 19 -91 30 51 14 84 58 89 118 1 20 9 33 20 37 23 7 23 6 -12 114 -108 329 -305 534 -640 662 -41 15 -59 25 -40 21 19 -5 82 -8 140 -8 81 0 113 4 142 18 39 20 73 76 65 107 -3 12 2 20 14 23 23 6 23 21 4 124 -61 320 -249 568 -544 718 -157 79 -394 147 -666 190 -88 13 -170 26 -182 29 -13 2 -23 2 -23 -1z"/>
<path d="M12550 5099 c-232 -36 -334 -55 -445 -84 -484 -122 -761 -346 -880 -712 -26 -79 -57 -242 -48 -255 2 -5 14 -8 26 -9 12 0 16 -3 10 -6 -17 -6 -16 -38 2 -72 25 -49 75 -66 200 -66 61 0 124 4 140 8 17 5 -13 -9 -66 -31 -136 -55 -250 -126 -341 -211 -128 -120 -217 -263 -272 -439 -32 -101 -32 -110 -3 -122 12 -5 17 -9 11 -9 -8 -1 -9 -12 -5 -34 15 -66 41 -95 94 -107 31 -7 31 -7 7 -12 -14 -3 -72 -13 -130 -22 -322 -51 -553 -206 -714 -479 -25 -42 -52 -92 -60 -111 -14 -33 -14 -33 23 -54 20 -12 31 -22 26 -22 -15 0 -17 -39 -4 -78 14 -42 76 -88 130 -97 22 -4 39 -9 36 -11 -2 -2 -55 3 -118 12 -154 22 -395 15 -494 -13 -216 -62 -391 -184 -545 -380 l-41 -52 40 -32 c34 -27 39 -35 30 -51 -17 -33 -1 -85 38 -125 48 -47 196 -117 309 -145 117 -29 319 -31 444 -4 300 64 790 328 790 425 0 29 -18 63 -31 56 -5 -4 -9 -4 -9 -2 0 3 34 29 75 59 41 29 75 56 75 59 0 3 -21 13 -47 22 -349 120 -422 146 -388 140 59 -12 241 -8 310 6 208 43 437 158 636 322 241 199 314 293 265 342 -13 12 -6 24 51 86 36 40 64 73 62 75 -4 2 -107 20 -359 60 -70 12 -77 14 -39 15 48 1 144 31 241 74 139 62 318 202 451 352 104 117 225 279 249 333 21 47 21 99 0 94 -16 -3 -10 9 58 116 l50 77 -72 3 c-91 4 -362 -14 -488 -33 -179 -26 -179 -26 -116 -9 93 26 244 120 365 230 193 174 467 605 443 696 -2 10 -8 15 -13 12 -12 -7 3 30 51 126 23 45 40 85 38 89 -2 4 -23 4 -48 0z m-933 -1185 c-3 -3 -12 -4 -19 -1 -8 3 -5 6 6 6 11 1 17 -2 13 -5z m-1290 -1860 c-3 -3 -12 -4 -19 -1 -8 3 -5 6 6 6 11 1 17 -2 13 -5z m40 -10 c-3 -3 -12 -4 -19 -1 -8 3 -5 6 6 6 11 1 17 -2 13 -5z"/>
<path d="M10242 4632 c-46 -140 -92 -319 -118 -457 -18 -94 -28 -519 -12 -509 4 3 5 -8 2 -25 -8 -40 21 -179 58 -274 75 -195 297 -437 400 -437 57 0 124 70 177 185 53 112 67 224 65 510 -1 120 -5 166 -23 233 -66 252 -206 515 -423 795 -39 51 -74 95 -77 99 -4 4 -26 -50 -49 -120z"/>
<path d="M2407 4612 c-305 -408 -443 -757 -422 -1067 3 -55 8 -140 10 -190 5 -113 30 -204 83 -293 44 -74 88 -118 128 -128 102 -26 339 218 422 433 34 87 67 235 58 258 -3 9 -1 39 5 68 5 28 10 117 10 197 1 155 -15 284 -57 455 -33 137 -117 405 -126 405 -5 0 -55 -62 -111 -138z"/>
<path d="M2970 3839 c-189 -385 -254 -632 -248 -941 2 -86 6 -151 10 -145 5 7 5 -2 2 -19 -19 -98 77 -354 181 -487 76 -96 141 -120 210 -77 70 43 195 240 239 375 20 63 46 197 40 207 -3 4 0 54 6 111 26 257 -51 553 -240 922 -42 83 -87 165 -98 184 l-21 35 -81 -165z"/>
<path d="M9711 3929 c-124 -219 -230 -466 -276 -642 -39 -151 -47 -234 -41 -426 7 -237 39 -357 136 -517 136 -225 233 -251 355 -97 94 121 171 313 181 453 2 36 8 111 13 167 26 288 -56 600 -266 1017 l-60 120 -42 -75z"/>
<path d="M3645 3278 c-2 -7 -14 -78 -27 -158 -19 -123 -22 -188 -23 -430 -2 -309 7 -401 50 -555 66 -232 204 -430 388 -552 120 -80 189 -70 245 34 36 69 74 205 78 283 1 30 5 109 9 175 9 135 -1 213 -41 339 -66 208 -198 406 -429 645 -147 152 -244 237 -250 219z"/>
<path d="M8994 3143 c-289 -284 -435 -492 -514 -732 -32 -100 -55 -261 -45 -330 3 -25 8 -91 10 -146 7 -168 66 -347 129 -387 77 -48 196 11 347 170 94 98 156 199 205 331 37 99 67 234 59 262 -4 11 -2 19 5 19 8 0 10 8 7 21 -3 11 1 77 10 147 10 89 13 172 9 277 -7 191 -48 515 -65 515 -3 0 -74 -66 -157 -147z"/>
<path d="M4501 2358 c52 -129 69 -179 59 -173 -6 4 -10 -12 -10 -42 0 -78 115 -313 252 -514 215 -317 529 -509 832 -509 124 0 166 27 180 112 1 11 8 23 15 27 10 7 11 27 2 98 -66 545 -401 836 -1164 1012 -97 23 -179 41 -182 41 -3 0 5 -24 16 -52z"/>
<path d="M8159 2375 c-609 -138 -940 -344 -1096 -683 -59 -127 -110 -377 -88 -429 5 -10 10 -29 12 -42 13 -75 59 -101 179 -101 316 0 625 196 854 543 110 165 222 395 228 465 3 40 2 53 -7 48 -11 -7 -3 15 53 153 28 68 31 81 19 80 -5 0 -74 -16 -154 -34z"/>
<path d="M4032 1479 c-193 -25 -435 -124 -667 -274 -108 -69 -314 -218 -315 -226 0 -4 28 -16 63 -29 66 -24 92 -40 65 -40 -10 0 -19 -12 -23 -30 -14 -65 45 -105 226 -154 572 -155 982 -93 1270 194 75 74 101 131 81 174 -9 21 -6 31 29 77 21 29 39 55 39 58 0 3 -25 24 -55 46 -229 167 -469 236 -713 204z"/>
<path d="M8513 1476 c-155 -30 -317 -101 -446 -196 l-67 -50 40 -54 c37 -49 40 -56 29 -80 -21 -46 4 -101 80 -176 288 -287 698 -349 1270 -194 180 49 240 89 226 153 -3 16 -14 31 -23 33 -9 2 18 18 61 35 l79 30 -126 92 c-304 223 -550 347 -780 395 -113 23 -257 28 -343 12z"/>
<path d="M6324 1249 c-48 -14 -120 -83 -139 -134 -13 -34 -16 -60 -11 -112 4 -37 6 -84 6 -103 -2 -95 62 -193 145 -220 138 -46 285 52 292 195 1 28 8 71 14 97 10 37 10 60 0 101 -31 139 -167 217 -307 176z"/>
<path d="M5255 1054 c-276 -46 -587 -227 -935 -541 l-54 -50 74 -23 c41 -13 67 -25 58 -27 -23 -6 -34 -48 -20 -78 16 -35 75 -61 188 -84 568 -115 968 -37 1250 243 69 69 110 130 114 171 5 42 0 66 -12 59 -12 -8 -12 -7 39 73 18 29 33 56 33 62 0 15 -49 46 -147 95 -207 104 -386 135 -588 100z"/>
<path d="M7249 1054 c-42 -7 -109 -25 -150 -40 -76 -27 -226 -101 -267 -133 l-24 -18 41 -66 c22 -37 36 -67 31 -67 -18 0 -11 -80 11 -121 11 -22 53 -73 92 -113 279 -282 682 -361 1251 -245 113 23 172 49 188 84 14 30 3 72 -20 77 -9 3 18 15 61 29 l78 24 -93 81 c-362 313 -622 460 -902 509 -106 18 -194 18 -297 -1z"/>
</g>
</svg>`;
};
var getNextRankBar = (title, percentage, color) => {
  const maxWidth = 80;
  return `
    <style>
    @keyframes ${title}RankAnimation {
      from {
        width: 0px;
      }
      to {
        width: ${maxWidth * percentage}px;
      }
    }
    #${title}-rank-progress{
      animation: ${title}RankAnimation 1s forwards ease-in-out;
    }
    </style>
    <rect
      x="15"
      y="101"
      rx="1"
      width="${maxWidth}"
      height="3.2"
      opacity="0.3"
      fill="${color}"
    />
    <rect
      id="${title}-rank-progress"
      x="15"
      y="101"
      rx="1"
      height="3.2"
      fill="${color}"
    />
  `;
};
var getSmallTrophyIcon = (icon, color, count) => {
  const leftXPosition = 7;
  const rightXPosition = 68;
  const getIcon = (x) => {
    return `<svg x="${x}" y="35" width="65" height="65" viewBox="0 0 30 30" fill="${color}" xmlns="http://www.w3.org/2000/svg">
      ${icon}
    </svg>`;
  };
  if (count == 1) {
    return getIcon(rightXPosition);
  } else if (count == 2) {
    return `${getIcon(leftXPosition)}${getIcon(rightXPosition)}`;
  }
  return "";
};
var getTrophyIcon = (theme, rank = "?" /* UNKNOWN */) => {
  let color = theme.DEFAULT_RANK_BASE;
  let rankColor = theme.DEFAULT_RANK_TEXT;
  let backgroundIcon = "";
  let gradationColor = `
      <stop offset="0%" stop-color="${theme.DEFAULT_RANK_BASE}"/>
      <stop offset="50%" stop-color="${theme.DEFAULT_RANK_BASE}"/>
      <stop offset="100%" stop-color="${theme.DEFAULT_RANK_SHADOW}"/>
  `;
  const { ICON_CIRCLE } = theme;
  if (rank === "SECRET" /* SECRET */) {
    rankColor = theme.SECRET_RANK_TEXT;
    gradationColor = `
    <stop offset="0%" stop-color="${theme.SECRET_RANK_1}"/>
    <stop offset="50%" stop-color="${theme.SECRET_RANK_2}"/>
    <stop offset="100%" stop-color="${theme.SECRET_RANK_3}"/>
    `;
  } else if (rank.slice(0, 1) === "S" /* S */) {
    color = theme.S_RANK_BASE;
    rankColor = theme.S_RANK_TEXT;
    backgroundIcon = leafIcon(theme.LAUREL);
    gradationColor = `
    <stop offset="0%" stop-color="${color}"/>
    <stop offset="70%" stop-color="${color}"/>
    <stop offset="100%" stop-color="${theme.S_RANK_SHADOW}"/>
    `;
  } else if (rank.slice(0, 1) === "A" /* A */) {
    color = theme.A_RANK_BASE;
    rankColor = theme.A_RANK_TEXT;
    backgroundIcon = leafIcon(theme.LAUREL);
    gradationColor = `
    <stop offset="0%" stop-color="${color}"/>
    <stop offset="70%" stop-color="${color}"/>
    <stop offset="100%" stop-color="${theme.A_RANK_SHADOW}"/>
    `;
  } else if (rank === "B" /* B */) {
    color = theme.B_RANK_BASE;
    rankColor = theme.B_RANK_TEXT;
    gradationColor = `
    <stop offset="0%" stop-color="${color}"/>
    <stop offset="70%" stop-color="${color}"/>
    <stop offset="100%" stop-color="${theme.B_RANK_SHADOW}"/>
    `;
  }
  const icon = `
    <path d="M7 10h2v4H7v-4z"/>
    <path d="M10 11c0 .552-.895 1-2 1s-2-.448-2-1 .895-1 2-1 2 .448 2 1z"/>
    <path fill-rule="evenodd" d="M12.5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm-6-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0z"/>
    <path d="M3 1h10c-.495 3.467-.5 10-5 10S3.495 4.467 3 1zm0 15a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1H3zm2-1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1H5z"/>
    <circle cx="8" cy="6" r="4" fill="${ICON_CIRCLE}" />
    <text x="6" y="8" font-family="Courier, Monospace" font-size="7" fill="${rankColor}">${rank.slice(0, 1)}</text>
  `;
  const optionRankIcon = getSmallTrophyIcon(icon, color, rank.length - 1);
  return `
  ${backgroundIcon}
  ${optionRankIcon}
  <defs>
    <linearGradient id="${rank}" gradientTransform="rotate(45)">
    ${gradationColor}
    </linearGradient>
  </defs>
  <svg x="28" y="20" width="100" height="100" viewBox="0 0 30 30" fill="url(#${rank})" xmlns="http://www.w3.org/2000/svg">
    ${icon}
  </svg>
  `;
};

// vendor/github-profile-trophy/trophy.ts
var RankCondition = class {
  constructor(rank, message, requiredScore) {
    this.rank = rank;
    this.message = message;
    this.requiredScore = requiredScore;
  }
};
var Trophy = class {
  constructor(score, rankConditions) {
    this.score = score;
    this.rankConditions = rankConditions;
    this.bottomMessage = abridgeScore(score);
    this.setRank();
  }
  rankCondition = null;
  rank = "?" /* UNKNOWN */;
  topMessage = "Unknown";
  bottomMessage = "0";
  title = "";
  filterTitles = [];
  hidden = false;
  setRank() {
    const sortedRankConditions = this.rankConditions.slice().sort(
      (a, b) => RANK_ORDER.indexOf(a.rank) - RANK_ORDER.indexOf(b.rank)
    );
    const rankCondition = sortedRankConditions.find(
      (r) => this.score >= r.requiredScore
    );
    if (rankCondition != null) {
      this.rank = rankCondition.rank;
      this.rankCondition = rankCondition;
      this.topMessage = rankCondition.message;
    }
  }
  calculateNextRankPercentage() {
    if (this.rank === "?" /* UNKNOWN */) {
      return 0;
    }
    const nextRankIndex = RANK_ORDER.indexOf(this.rank) - 1;
    if (nextRankIndex < 0 || this.rank === "SSS" /* SSS */) {
      return 1;
    }
    const nextRank = RANK_ORDER[nextRankIndex];
    const nextRankCondition = this.rankConditions.find(
      (r) => r.rank == nextRank
    );
    const distance = nextRankCondition.requiredScore - this.rankCondition.requiredScore;
    const progress = this.score - this.rankCondition.requiredScore;
    const result = progress / distance;
    return result;
  }
  render(theme, x = 0, y = 0, panelSize = CONSTANTS.DEFAULT_PANEL_SIZE, noBackground = CONSTANTS.DEFAULT_NO_BACKGROUND, noFrame = CONSTANTS.DEFAULT_NO_FRAME) {
    const { BACKGROUND: PRIMARY, TITLE: SECONDARY, TEXT, NEXT_RANK_BAR } = theme;
    const nextRankBar = getNextRankBar(
      this.title,
      this.calculateNextRankPercentage(),
      NEXT_RANK_BAR
    );
    return `
        <svg
          x="${x}"
          y="${y}"
          width="${panelSize}"
          height="${panelSize}"
          viewBox="0 0 ${panelSize} ${panelSize}"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            rx="4.5"
            width="${panelSize - 1}"
            height="${panelSize - 1}"
            stroke="#e1e4e8"
            fill="${PRIMARY}"
            stroke-opacity="${noFrame ? "0" : "1"}"
            fill-opacity="${noBackground ? "0" : "1"}"
          />
          ${getTrophyIcon(theme, this.rank)}
          <text x="50%" y="18" text-anchor="middle" font-family="Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji" font-weight="bold" font-size="13" fill="${SECONDARY}">${this.title}</text>
          <text x="50%" y="85" text-anchor="middle" font-family="Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji" font-weight="bold" font-size="10.5" fill="${TEXT}">${this.topMessage}</text>
          <text x="50%" y="97" text-anchor="middle" font-family="Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji" font-weight="bold" font-size="10" fill="${TEXT}">${this.bottomMessage}</text>
          ${nextRankBar}
        </svg>
        `;
  }
};
var MultipleLangTrophy = class extends Trophy {
  constructor(score) {
    const rankConditions = [
      new RankCondition(
        "SECRET" /* SECRET */,
        "Rainbow Lang User",
        10
      )
    ];
    super(score, rankConditions);
    this.title = "MultiLanguage";
    this.filterTitles = ["MultipleLang", "MultiLanguage"];
    this.hidden = true;
  }
};
var AllSuperRankTrophy = class extends Trophy {
  constructor(score) {
    const rankConditions = [
      new RankCondition(
        "SECRET" /* SECRET */,
        "S Rank Hacker",
        1
      )
    ];
    super(score, rankConditions);
    this.title = "AllSuperRank";
    this.filterTitles = ["AllSuperRank"];
    this.bottomMessage = "All S Rank";
    this.hidden = true;
  }
};
var Joined2020Trophy = class extends Trophy {
  constructor(score) {
    const rankConditions = [
      new RankCondition(
        "SECRET" /* SECRET */,
        "Everything started...",
        1
      )
    ];
    super(score, rankConditions);
    this.title = "Joined2020";
    this.filterTitles = ["Joined2020"];
    this.bottomMessage = "Joined 2020";
    this.hidden = true;
  }
};
var AncientAccountTrophy = class extends Trophy {
  constructor(score) {
    const rankConditions = [
      new RankCondition(
        "SECRET" /* SECRET */,
        "Ancient User",
        1
      )
    ];
    super(score, rankConditions);
    this.title = "AncientUser";
    this.filterTitles = ["AncientUser"];
    this.bottomMessage = "Before 2010";
    this.hidden = true;
  }
};
var LongTimeAccountTrophy = class extends Trophy {
  constructor(score) {
    const rankConditions = [
      new RankCondition(
        "SECRET" /* SECRET */,
        "Village Elder",
        10
      )
    ];
    super(score, rankConditions);
    this.title = "LongTimeUser";
    this.filterTitles = ["LongTimeUser"];
    this.hidden = true;
  }
};
var MultipleOrganizationsTrophy = class extends Trophy {
  constructor(score) {
    const rankConditions = [
      new RankCondition(
        "SECRET" /* SECRET */,
        // or if this doesn't render well: "Factorum"
        "Jack of all Trades",
        3
      )
    ];
    super(score, rankConditions);
    this.title = "Organizations";
    this.filterTitles = ["Organizations", "Orgs", "Teams"];
    this.hidden = true;
  }
};
var OGAccountTrophy = class extends Trophy {
  constructor(score) {
    const rankConditions = [
      new RankCondition(
        "SECRET" /* SECRET */,
        "OG User",
        1
      )
    ];
    super(score, rankConditions);
    this.title = "OGUser";
    this.filterTitles = ["OGUser"];
    this.bottomMessage = "Joined 2008";
    this.hidden = true;
  }
};
var TotalReviewsTrophy = class extends Trophy {
  constructor(score) {
    const rankConditions = [
      new RankCondition(
        "SSS" /* SSS */,
        "God Reviewer",
        70
      ),
      new RankCondition(
        "SS" /* SS */,
        "Deep Reviewer",
        57
      ),
      new RankCondition(
        "S" /* S */,
        "Super Reviewer",
        45
      ),
      new RankCondition(
        "AAA" /* AAA */,
        "Ultra Reviewer",
        30
      ),
      new RankCondition(
        "AA" /* AA */,
        "Hyper Reviewer",
        20
      ),
      new RankCondition(
        "A" /* A */,
        "Active Reviewer",
        8
      ),
      new RankCondition(
        "B" /* B */,
        "Intermediate Reviewer",
        3
      ),
      new RankCondition(
        "C" /* C */,
        "New Reviewer",
        1
      )
    ];
    super(score, rankConditions);
    this.title = "Reviews";
    this.filterTitles = ["Review", "Reviews"];
  }
};
var AccountDurationTrophy = class extends Trophy {
  constructor(score) {
    const rankConditions = [
      new RankCondition(
        "SSS" /* SSS */,
        "Seasoned Veteran",
        70
        // 20 years
      ),
      new RankCondition(
        "SS" /* SS */,
        "Grandmaster",
        55
        // 15 years
      ),
      new RankCondition(
        "S" /* S */,
        "Master Dev",
        40
        // 10 years
      ),
      new RankCondition(
        "AAA" /* AAA */,
        "Expert Dev",
        28
        // 7.5 years
      ),
      new RankCondition(
        "AA" /* AA */,
        "Experienced Dev",
        18
        // 5 years
      ),
      new RankCondition(
        "A" /* A */,
        "Intermediate Dev",
        11
        // 3 years
      ),
      new RankCondition(
        "B" /* B */,
        "Junior Dev",
        6
        // 1.5 years
      ),
      new RankCondition(
        "C" /* C */,
        "Newbie",
        2
        // 0.5 year
      )
    ];
    super(score, rankConditions);
    this.title = "Experience";
    this.filterTitles = ["Experience", "Duration", "Since"];
  }
};
var TotalStarTrophy = class extends Trophy {
  constructor(score) {
    const rankConditions = [
      new RankCondition(
        "SSS" /* SSS */,
        "Super Stargazer",
        2e3
      ),
      new RankCondition(
        "SS" /* SS */,
        "High Stargazer",
        700
      ),
      new RankCondition(
        "S" /* S */,
        "Stargazer",
        200
      ),
      new RankCondition(
        "AAA" /* AAA */,
        "Super Star",
        100
      ),
      new RankCondition(
        "AA" /* AA */,
        "High Star",
        50
      ),
      new RankCondition(
        "A" /* A */,
        "You are a Star",
        30
      ),
      new RankCondition(
        "B" /* B */,
        "Middle Star",
        10
      ),
      new RankCondition(
        "C" /* C */,
        "First Star",
        1
      )
    ];
    super(score, rankConditions);
    this.title = "Stars";
    this.filterTitles = ["Star", "Stars"];
  }
};
var TotalCommitTrophy = class extends Trophy {
  constructor(score) {
    const rankConditions = [
      new RankCondition(
        "SSS" /* SSS */,
        "God Committer",
        4e3
      ),
      new RankCondition(
        "SS" /* SS */,
        "Deep Committer",
        2e3
      ),
      new RankCondition(
        "S" /* S */,
        "Super Committer",
        1e3
      ),
      new RankCondition(
        "AAA" /* AAA */,
        "Ultra Committer",
        500
      ),
      new RankCondition(
        "AA" /* AA */,
        "Hyper Committer",
        200
      ),
      new RankCondition(
        "A" /* A */,
        "High Committer",
        100
      ),
      new RankCondition(
        "B" /* B */,
        "Middle Committer",
        10
      ),
      new RankCondition(
        "C" /* C */,
        "First Commit",
        1
      )
    ];
    super(score, rankConditions);
    this.title = "Commits";
    this.filterTitles = ["Commit", "Commits"];
  }
};
var TotalFollowerTrophy = class extends Trophy {
  constructor(score) {
    const rankConditions = [
      new RankCondition(
        "SSS" /* SSS */,
        "Super Celebrity",
        1e3
      ),
      new RankCondition(
        "SS" /* SS */,
        "Ultra Celebrity",
        400
      ),
      new RankCondition(
        "S" /* S */,
        "Hyper Celebrity",
        200
      ),
      new RankCondition(
        "AAA" /* AAA */,
        "Famous User",
        100
      ),
      new RankCondition(
        "AA" /* AA */,
        "Active User",
        50
      ),
      new RankCondition(
        "A" /* A */,
        "Dynamic User",
        20
      ),
      new RankCondition(
        "B" /* B */,
        "Many Friends",
        10
      ),
      new RankCondition(
        "C" /* C */,
        "First Friend",
        1
      )
    ];
    super(score, rankConditions);
    this.title = "Followers";
    this.filterTitles = ["Follower", "Followers"];
  }
};
var TotalIssueTrophy = class extends Trophy {
  constructor(score) {
    const rankConditions = [
      new RankCondition(
        "SSS" /* SSS */,
        "God Issuer",
        1e3
      ),
      new RankCondition(
        "SS" /* SS */,
        "Deep Issuer",
        500
      ),
      new RankCondition(
        "S" /* S */,
        "Super Issuer",
        200
      ),
      new RankCondition(
        "AAA" /* AAA */,
        "Ultra Issuer",
        100
      ),
      new RankCondition(
        "AA" /* AA */,
        "Hyper Issuer",
        50
      ),
      new RankCondition(
        "A" /* A */,
        "High Issuer",
        20
      ),
      new RankCondition(
        "B" /* B */,
        "Middle Issuer",
        10
      ),
      new RankCondition(
        "C" /* C */,
        "First Issue",
        1
      )
    ];
    super(score, rankConditions);
    this.title = "Issues";
    this.filterTitles = ["Issue", "Issues"];
  }
};
var TotalPullRequestTrophy = class extends Trophy {
  constructor(score) {
    const rankConditions = [
      new RankCondition(
        "SSS" /* SSS */,
        "God Puller",
        1e3
      ),
      new RankCondition(
        "SS" /* SS */,
        "Deep Puller",
        500
      ),
      new RankCondition(
        "S" /* S */,
        "Super Puller",
        200
      ),
      new RankCondition(
        "AAA" /* AAA */,
        "Ultra Puller",
        100
      ),
      new RankCondition(
        "AA" /* AA */,
        "Hyper Puller",
        50
      ),
      new RankCondition(
        "A" /* A */,
        "High Puller",
        20
      ),
      new RankCondition(
        "B" /* B */,
        "Middle Puller",
        10
      ),
      new RankCondition(
        "C" /* C */,
        "First Pull",
        1
      )
    ];
    super(score, rankConditions);
    this.title = "PullRequest";
    this.filterTitles = ["PR", "PullRequest", "Pulls", "Puller"];
  }
};
var TotalRepositoryTrophy = class extends Trophy {
  constructor(score) {
    const rankConditions = [
      new RankCondition(
        "SSS" /* SSS */,
        "God Repo Creator",
        50
      ),
      new RankCondition(
        "SS" /* SS */,
        "Deep Repo Creator",
        45
      ),
      new RankCondition(
        "S" /* S */,
        "Super Repo Creator",
        40
      ),
      new RankCondition(
        "AAA" /* AAA */,
        "Ultra Repo Creator",
        35
      ),
      new RankCondition(
        "AA" /* AA */,
        "Hyper Repo Creator",
        30
      ),
      new RankCondition(
        "A" /* A */,
        "High Repo Creator",
        20
      ),
      new RankCondition(
        "B" /* B */,
        "Middle Repo Creator",
        10
      ),
      new RankCondition(
        "C" /* C */,
        "First Repository",
        1
      )
    ];
    super(score, rankConditions);
    this.title = "Repositories";
    this.filterTitles = ["Repo", "Repository", "Repositories"];
  }
};

// vendor/github-profile-trophy/trophy_list.ts
var TrophyList = class {
  trophies = new Array();
  constructor(userInfo) {
    this.trophies.push(
      new TotalStarTrophy(userInfo.totalStargazers),
      new TotalCommitTrophy(userInfo.totalCommits),
      new TotalFollowerTrophy(userInfo.totalFollowers),
      new TotalIssueTrophy(userInfo.totalIssues),
      new TotalPullRequestTrophy(userInfo.totalPullRequests),
      new TotalRepositoryTrophy(userInfo.totalRepositories),
      new TotalReviewsTrophy(userInfo.totalReviews)
    );
    this.trophies.push(
      new AllSuperRankTrophy(this.isAllSRank),
      new MultipleLangTrophy(userInfo.languageCount),
      new LongTimeAccountTrophy(userInfo.durationYear),
      new AncientAccountTrophy(userInfo.ancientAccount),
      new OGAccountTrophy(userInfo.ogAccount),
      new Joined2020Trophy(userInfo.joined2020),
      new MultipleOrganizationsTrophy(userInfo.totalOrganizations),
      new AccountDurationTrophy(userInfo.durationDays)
    );
  }
  get length() {
    return this.trophies.length;
  }
  get getArray() {
    return this.trophies;
  }
  get isAllSRank() {
    return this.trophies.every((trophy) => trophy.rank.slice(0, 1) == "S" /* S */) ? 1 : 0;
  }
  filterByHidden() {
    this.trophies = this.trophies.filter(
      (trophy) => !trophy.hidden || trophy.rank !== "?" /* UNKNOWN */
    );
  }
  filterByTitles(titles) {
    this.trophies = this.trophies.filter((trophy) => {
      return trophy.filterTitles.some((title) => titles.includes(title));
    });
  }
  filterByRanks(ranks) {
    if (ranks.filter((rank) => rank.includes("-")).length !== 0) {
      this.trophies = this.trophies.filter(
        (trophy) => !ranks.map((rank) => rank.substring(1)).includes(trophy.rank)
      );
      return;
    }
    this.trophies = this.trophies.filter(
      (trophy) => ranks.includes(trophy.rank)
    );
  }
  filterByExclusionTitles(titles) {
    const excludeTitles = titles.filter((title) => title.startsWith("-")).map(
      (title) => title.substring(1)
    );
    if (excludeTitles.length > 0) {
      this.trophies = this.trophies.filter(
        (trophy) => !excludeTitles.includes(trophy.title)
      );
    }
  }
  sortByRank() {
    this.trophies = this.trophies.slice().sort(
      (a, b) => RANK_ORDER.indexOf(a.rank) - RANK_ORDER.indexOf(b.rank)
    );
  }
};

// vendor/github-profile-trophy/theme.ts
var COLORS = {
  default: {
    BACKGROUND: "#FFF",
    TITLE: "#000",
    ICON_CIRCLE: "#FFF",
    TEXT: "#666",
    LAUREL: "#009366",
    SECRET_RANK_1: "red",
    SECRET_RANK_2: "fuchsia",
    SECRET_RANK_3: "blue",
    SECRET_RANK_TEXT: "fuchsia",
    NEXT_RANK_BAR: "#0366d6",
    S_RANK_BASE: "#FAD200",
    S_RANK_SHADOW: "#C8A090",
    S_RANK_TEXT: "#886000",
    A_RANK_BASE: "#B0B0B0",
    A_RANK_SHADOW: "#9090C0",
    A_RANK_TEXT: "#505050",
    B_RANK_BASE: "#A18D66",
    B_RANK_SHADOW: "#816D96",
    B_RANK_TEXT: "#412D06",
    DEFAULT_RANK_BASE: "#777",
    DEFAULT_RANK_SHADOW: "#333",
    DEFAULT_RANK_TEXT: "#333"
  },
  dracula: {
    BACKGROUND: "#282a36",
    TITLE: "#ff79c6",
    ICON_CIRCLE: "#f8f8f2",
    TEXT: "#f8f8f2",
    LAUREL: "#50fa7b",
    SECRET_RANK_1: "#ff5555",
    SECRET_RANK_2: "#ff79c6",
    SECRET_RANK_3: "#bd93f9",
    SECRET_RANK_TEXT: "#bd93f9",
    NEXT_RANK_BAR: "#ff79c6",
    S_RANK_BASE: "#ffb86c",
    S_RANK_SHADOW: "#ffb86c",
    S_RANK_TEXT: "#6272a4",
    A_RANK_BASE: "#8be9fd",
    A_RANK_SHADOW: "#8be9fd",
    A_RANK_TEXT: "#6272a4",
    B_RANK_BASE: "#ff5555",
    B_RANK_SHADOW: "#ff5555",
    B_RANK_TEXT: "#6272a4",
    DEFAULT_RANK_BASE: "#6272a4",
    DEFAULT_RANK_SHADOW: "#6272a4",
    DEFAULT_RANK_TEXT: "#6272a4"
  },
  flat: {
    BACKGROUND: "#FFF",
    TITLE: "#000",
    ICON_CIRCLE: "#FFF",
    TEXT: "#666",
    LAUREL: "#009366",
    SECRET_RANK_1: "red",
    SECRET_RANK_2: "fuchsia",
    SECRET_RANK_3: "blue",
    SECRET_RANK_TEXT: "fuchsia",
    NEXT_RANK_BAR: "#0366d6",
    S_RANK_BASE: "#eac200",
    S_RANK_SHADOW: "#eac200",
    S_RANK_TEXT: "#886000",
    A_RANK_BASE: "#B0B0B0",
    A_RANK_SHADOW: "#B0B0B0",
    A_RANK_TEXT: "#505050",
    B_RANK_BASE: "#A18D66",
    B_RANK_SHADOW: "#A18D66",
    B_RANK_TEXT: "#412D06",
    DEFAULT_RANK_BASE: "#777",
    DEFAULT_RANK_SHADOW: "#777",
    DEFAULT_RANK_TEXT: "#333"
  },
  onedark: {
    BACKGROUND: "#282c34",
    TITLE: "#e5c07b",
    ICON_CIRCLE: "#FFF",
    TEXT: "#e06c75",
    LAUREL: "#98c379",
    SECRET_RANK_1: "#e06c75",
    SECRET_RANK_2: "#c678dd",
    SECRET_RANK_3: "#61afef",
    SECRET_RANK_TEXT: "#c678dd",
    NEXT_RANK_BAR: "#e5c07b",
    S_RANK_BASE: "#e5c07b",
    S_RANK_SHADOW: "#e5c07b",
    S_RANK_TEXT: "#282c34",
    A_RANK_BASE: "#56b6c2",
    A_RANK_SHADOW: "#56b6c2",
    A_RANK_TEXT: "#282c34",
    B_RANK_BASE: "#c678dd",
    B_RANK_SHADOW: "#c678dd",
    B_RANK_TEXT: "#282c34",
    DEFAULT_RANK_BASE: "#abb2bf",
    DEFAULT_RANK_SHADOW: "#abb2bf",
    DEFAULT_RANK_TEXT: "#282c34"
  },
  gruvbox: {
    BACKGROUND: "#282828",
    TITLE: "#ebdbb2",
    ICON_CIRCLE: "#ebdbb2",
    TEXT: "#98971a",
    LAUREL: "#689d6a",
    SECRET_RANK_1: "#fb4934",
    SECRET_RANK_2: "#d3869b",
    SECRET_RANK_3: "#458588",
    SECRET_RANK_TEXT: "#b16286",
    NEXT_RANK_BAR: "#fabd26",
    S_RANK_BASE: "#fabd2f",
    S_RANK_SHADOW: "#fabd2f",
    S_RANK_TEXT: "#322301",
    A_RANK_BASE: "#83a598",
    A_RANK_SHADOW: "#83a598",
    A_RANK_TEXT: "#151e1a",
    B_RANK_BASE: "#d65d0e",
    B_RANK_SHADOW: "#d65d0e",
    B_RANK_TEXT: "#301503",
    DEFAULT_RANK_BASE: "#928374",
    DEFAULT_RANK_SHADOW: "#928374",
    DEFAULT_RANK_TEXT: "#282828"
  },
  monokai: {
    BACKGROUND: "#272822",
    TITLE: "#f92672",
    ICON_CIRCLE: "#fff",
    TEXT: "#fff",
    LAUREL: "#a6e22e",
    SECRET_RANK_1: "#f92672",
    SECRET_RANK_2: "#ae81ff",
    SECRET_RANK_3: "#66d9ef",
    SECRET_RANK_TEXT: "#b16286",
    NEXT_RANK_BAR: "#f92672",
    S_RANK_BASE: "#e6db74",
    S_RANK_SHADOW: "#e6db74",
    S_RANK_TEXT: "#272822",
    A_RANK_BASE: "#66d9ef",
    A_RANK_SHADOW: "#66d9ef",
    A_RANK_TEXT: "#272822",
    B_RANK_BASE: "#fd971f",
    B_RANK_SHADOW: "#fd971f",
    B_RANK_TEXT: "#272822",
    DEFAULT_RANK_BASE: "#75715e",
    DEFAULT_RANK_SHADOW: "#75715e",
    DEFAULT_RANK_TEXT: "#282828"
  },
  nord: {
    BACKGROUND: "#2E3440",
    TITLE: "#81A1C1",
    ICON_CIRCLE: "#D8DEE9",
    TEXT: "#ECEFF4",
    LAUREL: "#A3BE8C",
    SECRET_RANK_1: "#BF616A",
    SECRET_RANK_2: "#B48EAD",
    SECRET_RANK_3: "#81A1C1",
    SECRET_RANK_TEXT: "#B48EAD",
    NEXT_RANK_BAR: "#81A1C1",
    S_RANK_BASE: "#EBCB8B",
    S_RANK_SHADOW: "#EBCB8B",
    S_RANK_TEXT: "#3B4252",
    A_RANK_BASE: "#8FBCBB",
    A_RANK_SHADOW: "#8FBCBB",
    A_RANK_TEXT: "#3B4252",
    B_RANK_BASE: "#D08770",
    B_RANK_SHADOW: "#D08770",
    B_RANK_TEXT: "#3B4252",
    DEFAULT_RANK_BASE: "#5E81AC",
    DEFAULT_RANK_SHADOW: "#5E81AC",
    DEFAULT_RANK_TEXT: "#3B4252"
  },
  discord: {
    BACKGROUND: "#23272A",
    TITLE: "#7289DA",
    ICON_CIRCLE: "#FFFFFF",
    TEXT: "#FFFFFF",
    LAUREL: "#57F287",
    SECRET_RANK_1: "#ED4245",
    SECRET_RANK_2: "#57F287",
    SECRET_RANK_3: "#5865F2",
    SECRET_RANK_TEXT: "#000000",
    NEXT_RANK_BAR: "#5865F2",
    S_RANK_BASE: "#FEE75C",
    S_RANK_SHADOW: "#FEE75C",
    S_RANK_TEXT: "#000000",
    A_RANK_BASE: "#EB459E",
    A_RANK_SHADOW: "#ED4245",
    A_RANK_TEXT: "#000000",
    B_RANK_BASE: "#ED4245",
    B_RANK_SHADOW: "#ED4245",
    B_RANK_TEXT: "#000000",
    DEFAULT_RANK_BASE: "#5865F2",
    DEFAULT_RANK_SHADOW: "#5865F2",
    DEFAULT_RANK_TEXT: "#000000"
  },
  chalk: {
    BACKGROUND: "#2d2d2d",
    TITLE: "#fed37e",
    ICON_CIRCLE: "#e4e4e4",
    TEXT: "#d4d4d4",
    LAUREL: "#a9d3ab",
    SECRET_RANK_1: "#f58e8e",
    SECRET_RANK_2: "#d6add5",
    SECRET_RANK_3: "#66d9ef",
    SECRET_RANK_TEXT: "#f58e8e",
    NEXT_RANK_BAR: "#7aabd4",
    S_RANK_BASE: "#fed37e",
    S_RANK_SHADOW: "#fed37e",
    S_RANK_TEXT: "#2d2d2d",
    A_RANK_BASE: "#79D4D5",
    A_RANK_SHADOW: "#79D4D5",
    A_RANK_TEXT: "#2d2d2d",
    B_RANK_BASE: "#f58e8e",
    B_RANK_SHADOW: "#f58e8e",
    B_RANK_TEXT: "#2d2d2d",
    DEFAULT_RANK_BASE: "#75715e",
    DEFAULT_RANK_SHADOW: "#75715e",
    DEFAULT_RANK_TEXT: "#2d2d2d"
  },
  alduin: {
    BACKGROUND: "#1c1c1c",
    TITLE: "#dfd7af",
    ICON_CIRCLE: "#e3e3e3",
    TEXT: "#dfd7af",
    LAUREL: "#a9d3ab",
    SECRET_RANK_1: "#f58e8e",
    SECRET_RANK_2: "#d6add5",
    SECRET_RANK_3: "#66d9ef",
    SECRET_RANK_TEXT: "#f58e8e",
    NEXT_RANK_BAR: "#dfd7af",
    S_RANK_BASE: "#fed37e",
    S_RANK_SHADOW: "#fed37e",
    S_RANK_TEXT: "#2d2d2d",
    A_RANK_BASE: "#79D4D5",
    A_RANK_SHADOW: "#79D4D5",
    A_RANK_TEXT: "#2d2d2d",
    B_RANK_BASE: "#f58e8e",
    B_RANK_SHADOW: "#f58e8e",
    B_RANK_TEXT: "#2d2d2d",
    DEFAULT_RANK_BASE: "#75715e",
    DEFAULT_RANK_SHADOW: "#75715e",
    DEFAULT_RANK_TEXT: "#2d2d2d"
  },
  darkhub: {
    BACKGROUND: "#0d1117",
    TITLE: "#c9d1d9",
    ICON_CIRCLE: "#f0f6fb",
    TEXT: "#8b949e",
    LAUREL: "#178600",
    SECRET_RANK_1: "#ff5555",
    SECRET_RANK_2: "#ff79c6",
    SECRET_RANK_3: "#388bfd",
    SECRET_RANK_TEXT: "#ff79c6",
    NEXT_RANK_BAR: "#ff79c6",
    S_RANK_BASE: "#ffb86c",
    S_RANK_SHADOW: "#ffb86c",
    S_RANK_TEXT: "#0d1117",
    A_RANK_BASE: "#8be9fd",
    A_RANK_SHADOW: "#8be9fd",
    A_RANK_TEXT: "#0d1117",
    B_RANK_BASE: "#ff5555",
    B_RANK_SHADOW: "#ff5555",
    B_RANK_TEXT: "#0d1117",
    DEFAULT_RANK_BASE: "#6272a4",
    DEFAULT_RANK_SHADOW: "#6272a4",
    DEFAULT_RANK_TEXT: "#0d1117"
  },
  juicyfresh: {
    BACKGROUND: "#0d0c15",
    TITLE: "#f7d745",
    ICON_CIRCLE: "#FFF",
    TEXT: "#b2d76c",
    LAUREL: "#8bb071",
    SECRET_RANK_1: "#a8d937",
    SECRET_RANK_2: "#f7e662",
    SECRET_RANK_3: "#4d9b1c",
    SECRET_RANK_TEXT: "#ff5700",
    NEXT_RANK_BAR: "#6562af",
    S_RANK_BASE: "#f7d644",
    S_RANK_SHADOW: "#f69e44",
    S_RANK_TEXT: "#ff5700",
    A_RANK_BASE: "#f69e44",
    A_RANK_SHADOW: "#f46d5a",
    A_RANK_TEXT: "#ff5700",
    B_RANK_BASE: "#f46d5a",
    B_RANK_SHADOW: "#f73155",
    B_RANK_TEXT: "#ff5700",
    DEFAULT_RANK_BASE: "#f0d7d6",
    DEFAULT_RANK_SHADOW: "#f58867",
    DEFAULT_RANK_TEXT: "#ff5700"
  },
  oldie: {
    BACKGROUND: "#F0F0F0",
    TITLE: "#111",
    ICON_CIRCLE: "#FFF",
    TEXT: "#666",
    LAUREL: "#535353",
    SECRET_RANK_1: "#738986",
    SECRET_RANK_2: "#B36154",
    SECRET_RANK_3: "#91A16A",
    SECRET_RANK_TEXT: "#4D4D4D",
    NEXT_RANK_BAR: "#8E8680",
    S_RANK_BASE: "#8E8E8E",
    S_RANK_SHADOW: "#8E8E8E",
    S_RANK_TEXT: "#4D4D4D",
    A_RANK_BASE: "#AFAFAF",
    A_RANK_SHADOW: "#AFAFAF",
    A_RANK_TEXT: "#4D4D4D",
    B_RANK_BASE: "#858585",
    B_RANK_SHADOW: "#858585",
    B_RANK_TEXT: "#4D4D4D",
    DEFAULT_RANK_BASE: "#535353",
    DEFAULT_RANK_SHADOW: "#535353",
    DEFAULT_RANK_TEXT: "#4D4D4D"
  },
  buddhism: {
    BACKGROUND: "#ffc20e",
    TITLE: "#FFF",
    ICON_CIRCLE: "#FFF",
    TEXT: "#FFF",
    LAUREL: "#27c5ff",
    SECRET_RANK_1: "#FFF",
    SECRET_RANK_2: "#f73155",
    SECRET_RANK_3: "#fff",
    SECRET_RANK_TEXT: "#f73155",
    NEXT_RANK_BAR: "#f73155",
    S_RANK_BASE: "#ff8400",
    S_RANK_SHADOW: "#ff8400",
    S_RANK_TEXT: "#ffc20e",
    A_RANK_BASE: "#fff",
    A_RANK_SHADOW: "#fff",
    A_RANK_TEXT: "#ffc20e",
    B_RANK_BASE: "#f73155",
    B_RANK_SHADOW: "#f73155",
    B_RANK_TEXT: "#ffc20e",
    DEFAULT_RANK_BASE: "#27c5ff",
    DEFAULT_RANK_SHADOW: "#27c5ff",
    DEFAULT_RANK_TEXT: "#ffc20e"
  },
  radical: {
    BACKGROUND: "#141321",
    ICON_CIRCLE: "#EEEEEE",
    TITLE: "#fe428e",
    TEXT: "#a9fef7",
    LAUREL: "#50fa7b",
    SECRET_RANK_1: "#ff5555",
    SECRET_RANK_2: "#ff15d9",
    SECRET_RANK_3: "#1E65F5",
    SECRET_RANK_TEXT: "#ff61c6",
    NEXT_RANK_BAR: "#fe428e",
    S_RANK_BASE: "#ffce32",
    S_RANK_SHADOW: "#ffce32",
    S_RANK_TEXT: "#CB8A30",
    A_RANK_BASE: "#8DF7B5",
    A_RANK_SHADOW: "#8DF7B5",
    A_RANK_TEXT: "#3A3A3A",
    B_RANK_BASE: "#EA3F25",
    B_RANK_SHADOW: "#EA3F25",
    B_RANK_TEXT: "#3A3A3A",
    DEFAULT_RANK_BASE: "#1E65F5",
    DEFAULT_RANK_SHADOW: "#1E65F5",
    DEFAULT_RANK_TEXT: "#3A3A3A"
  },
  onestar: {
    BACKGROUND: "#0d1117",
    ICON_CIRCLE: "#EEEEEE",
    TITLE: "#EEEEEE",
    TEXT: "#c7c7c7",
    LAUREL: "#0dbc79",
    SECRET_RANK_1: "#ff5555",
    SECRET_RANK_2: "#d861d8",
    SECRET_RANK_3: "#3b8eea",
    SECRET_RANK_TEXT: "#ff61c6",
    NEXT_RANK_BAR: "#9e9e9e",
    S_RANK_BASE: "#FFD54F",
    S_RANK_SHADOW: "#FFE082",
    S_RANK_TEXT: "#CB8A30",
    A_RANK_BASE: "#23d18b",
    A_RANK_SHADOW: "#8DF7B5",
    A_RANK_TEXT: "#3A3A3A",
    B_RANK_BASE: "#d13b3b",
    B_RANK_SHADOW: "#fa4b4b",
    B_RANK_TEXT: "#3A3A3A",
    DEFAULT_RANK_BASE: "#2472c8",
    DEFAULT_RANK_SHADOW: "#3b8eea",
    DEFAULT_RANK_TEXT: "#3A3A3A"
  },
  algolia: {
    BACKGROUND: "#050f2c",
    TITLE: "#00aeff",
    ICON_CIRCLE: "#f0f6fb",
    TEXT: "#7eace9",
    LAUREL: "#178600",
    SECRET_RANK_1: "#ff5555",
    SECRET_RANK_2: "#ff79c6",
    SECRET_RANK_3: "#388bfd",
    SECRET_RANK_TEXT: "#ff79c6",
    NEXT_RANK_BAR: "#00aeff",
    S_RANK_BASE: "#ffb86c",
    S_RANK_SHADOW: "#ffb86c",
    S_RANK_TEXT: "#0d1117",
    A_RANK_BASE: "#2dde98",
    A_RANK_TEXT: "#0d1117",
    A_RANK_SHADOW: "#2dde98",
    B_RANK_BASE: "#8be9fd",
    B_RANK_SHADOW: "#8be9fd",
    B_RANK_TEXT: "#0d1117",
    DEFAULT_RANK_BASE: "#5c75c3",
    DEFAULT_RANK_SHADOW: "#6272a4",
    DEFAULT_RANK_TEXT: "#0d1117"
  },
  gitdimmed: {
    BACKGROUND: "#333",
    TITLE: "#f0f6fb",
    ICON_CIRCLE: "#f0f6fb",
    TEXT: "#FFF",
    LAUREL: "#178600",
    SECRET_RANK_1: "#ff5555",
    SECRET_RANK_2: "#ff79c6",
    SECRET_RANK_3: "#388bfd",
    SECRET_RANK_TEXT: "#ff79c6",
    NEXT_RANK_BAR: "#00aeff",
    S_RANK_BASE: "#ffb86c",
    S_RANK_SHADOW: "#ffb86c",
    S_RANK_TEXT: "#0d1117",
    A_RANK_BASE: "#2dde98",
    A_RANK_TEXT: "#0d1117",
    A_RANK_SHADOW: "#2dde98",
    B_RANK_BASE: "#8be9fd",
    B_RANK_SHADOW: "#8be9fd",
    B_RANK_TEXT: "#0d1117",
    DEFAULT_RANK_BASE: "#5c75c3",
    DEFAULT_RANK_SHADOW: "#6272a4",
    DEFAULT_RANK_TEXT: "#0d1117"
  },
  tokyonight: {
    BACKGROUND: "#1a1b27",
    TITLE: "#70a5fd",
    ICON_CIRCLE: "#bf91f3",
    TEXT: "#38bdae",
    LAUREL: "#178600",
    SECRET_RANK_1: "#ff5555",
    SECRET_RANK_2: "#ff79c6",
    SECRET_RANK_3: "#388bfd",
    SECRET_RANK_TEXT: "#ff79c6",
    NEXT_RANK_BAR: "#00aeff",
    S_RANK_BASE: "#ffb86c",
    S_RANK_SHADOW: "#ffb86c",
    S_RANK_TEXT: "#0d1117",
    A_RANK_BASE: "#2dde98",
    A_RANK_TEXT: "#0d1117",
    A_RANK_SHADOW: "#2dde98",
    B_RANK_BASE: "#8be9fd",
    B_RANK_SHADOW: "#8be9fd",
    B_RANK_TEXT: "#0d1117",
    DEFAULT_RANK_BASE: "#5c75c3",
    DEFAULT_RANK_SHADOW: "#6272a4",
    DEFAULT_RANK_TEXT: "#0d1117"
  },
  matrix: {
    BACKGROUND: "#000000",
    TITLE: "#00cc00",
    ICON_CIRCLE: "#002200",
    TEXT: "#00cc00",
    LAUREL: "#178600",
    SECRET_RANK_1: "#ffd700",
    SECRET_RANK_2: "#ffffff",
    SECRET_RANK_3: "#ffd700",
    SECRET_RANK_TEXT: "#00ff00",
    NEXT_RANK_BAR: "#00ff00",
    S_RANK_BASE: "#ffd700",
    S_RANK_SHADOW: "#ffd700",
    S_RANK_TEXT: "#00ff00",
    A_RANK_BASE: "#c0c0c0",
    A_RANK_TEXT: "#00ff00",
    A_RANK_SHADOW: "#c0c0c0",
    B_RANK_BASE: "#b08d57",
    B_RANK_SHADOW: "#b08d57",
    B_RANK_TEXT: "#00ff00",
    DEFAULT_RANK_BASE: "#b08d57",
    DEFAULT_RANK_SHADOW: "#b08d57",
    DEFAULT_RANK_TEXT: "#00ff00"
  },
  apprentice: {
    BACKGROUND: "#262626",
    TITLE: "#BCBCBC",
    ICON_CIRCLE: "#BCBCBC",
    TEXT: "#5F875F",
    LAUREL: "#5F8787",
    SECRET_RANK_1: "#FF8700",
    SECRET_RANK_2: "#8787AF",
    SECRET_RANK_3: "#5F87AF",
    SECRET_RANK_TEXT: "#5F5F87",
    NEXT_RANK_BAR: "#FFFFA9",
    S_RANK_BASE: "#FFFFAF",
    S_RANK_SHADOW: "#FFFFAF",
    S_RANK_TEXT: "#87875F",
    A_RANK_BASE: "#8FAFD7",
    A_RANK_SHADOW: "#8FAFD7",
    A_RANK_TEXT: "#5F875F",
    B_RANK_BASE: "#AF5F5F",
    B_RANK_SHADOW: "#AF5F5F",
    B_RANK_TEXT: "#AF5F5F",
    DEFAULT_RANK_BASE: "#6C6C6C",
    DEFAULT_RANK_SHADOW: "#6C6C6C",
    DEFAULT_RANK_TEXT: "#1C1C1C"
  },
  dark_dimmed: {
    BACKGROUND: "#22272e",
    TITLE: "#adbac7",
    ICON_CIRCLE: "#002200",
    TEXT: "#adbac7",
    LAUREL: "#178600",
    SECRET_RANK_1: "red",
    SECRET_RANK_2: "fuchsia",
    SECRET_RANK_3: "blue",
    SECRET_RANK_TEXT: "fuchsia",
    NEXT_RANK_BAR: "#0366d6",
    S_RANK_BASE: "#FAD200",
    S_RANK_SHADOW: "#C8A090",
    S_RANK_TEXT: "#886000",
    A_RANK_BASE: "#B0B0B0",
    A_RANK_SHADOW: "#9090C0",
    A_RANK_TEXT: "#505050",
    B_RANK_BASE: "#A18D66",
    B_RANK_SHADOW: "#816D96",
    B_RANK_TEXT: "#412D06",
    DEFAULT_RANK_BASE: "#777",
    DEFAULT_RANK_SHADOW: "#333",
    DEFAULT_RANK_TEXT: "#333"
  },
  dark_lover: {
    BACKGROUND: "#0d0d0d",
    TITLE: "#e8aa64",
    ICON_CIRCLE: "white",
    TEXT: "#e8aa64",
    LAUREL: "#e86464",
    SECRET_RANK_1: "#e05555",
    SECRET_RANK_2: "#e05555",
    SECRET_RANK_3: "#e05555",
    SECRET_RANK_TEXT: "#e05555",
    NEXT_RANK_BAR: "#e05555",
    S_RANK_BASE: "#f2c635",
    S_RANK_SHADOW: "#e0d7b8",
    S_RANK_TEXT: "#b35707",
    A_RANK_BASE: "#f25755",
    A_RANK_SHADOW: "#e69493",
    A_RANK_TEXT: "#f5352f",
    B_RANK_BASE: "#63db93",
    B_RANK_SHADOW: "#8cd1a8",
    B_RANK_TEXT: "#07b84e",
    DEFAULT_RANK_BASE: "#7f6ceb",
    DEFAULT_RANK_SHADOW: "#a598ed",
    DEFAULT_RANK_TEXT: "#7f6ceb"
  },
  kimbie_dark: {
    BACKGROUND: "#221a0f",
    TITLE: "#d3af86",
    ICON_CIRCLE: "#7e602c",
    TEXT: "#d3af86",
    LAUREL: "#889b4a",
    SECRET_RANK_1: "#f14a68",
    SECRET_RANK_2: "#f14a68",
    SECRET_RANK_3: "#dc3958",
    SECRET_RANK_TEXT: "#dc3958",
    NEXT_RANK_BAR: "#dc3958",
    S_RANK_BASE: "#fcac51",
    S_RANK_SHADOW: "#f79a32",
    S_RANK_TEXT: "#d3af86",
    A_RANK_BASE: "#a3B95a",
    A_RANK_SHADOW: "#889b4a",
    A_RANK_TEXT: "#d3af86",
    B_RANK_BASE: "#4c96a8",
    B_RANK_SHADOW: "#418292",
    B_RANK_TEXT: "#d3af86",
    DEFAULT_RANK_BASE: "#8ab1b0",
    DEFAULT_RANK_SHADOW: "#719190",
    DEFAULT_RANK_TEXT: "#d3af86"
  },
  aura: {
    BACKGROUND: "#1E1D26",
    TITLE: "#FFFFFF",
    ICON_CIRCLE: "#FFFFFF",
    TEXT: "#dbffe6",
    LAUREL: "#a9fcca",
    SECRET_RANK_1: "#c273ff",
    SECRET_RANK_2: "#c273ff",
    SECRET_RANK_3: "#c273ff",
    SECRET_RANK_TEXT: "#bd93f9",
    NEXT_RANK_BAR: "#715df5",
    S_RANK_BASE: "#8e57ff",
    S_RANK_SHADOW: "#2361ad",
    S_RANK_TEXT: "#6272a4",
    A_RANK_BASE: "#7c71f5",
    A_RANK_SHADOW: "#3ae056",
    A_RANK_TEXT: "#6272a4",
    B_RANK_BASE: "#226a80",
    B_RANK_SHADOW: "#226a80",
    B_RANK_TEXT: "#6272a4",
    DEFAULT_RANK_BASE: "#5e8c2a",
    DEFAULT_RANK_SHADOW: "#5e8c2a",
    DEFAULT_RANK_TEXT: "#5e8c2a"
  }
};
export {
  COLORS,
  TrophyList
};
