export function streaks(input, today) {
  const days = [
    ...new Map(
      input.filter((d) => d.date <= today).map((d) => [d.date, d]),
    ).values(),
  ].sort((a, b) => a.date.localeCompare(b.date));
  let longest = 0,
    run = 0,
    previous = null,
    longestStart = null,
    longestEnd = null,
    runStart = null;
  for (const day of days) {
    const consecutive =
      previous && Date.parse(day.date) - Date.parse(previous) === 86400000;
    if (day.contributionCount > 0) {
      run = consecutive ? run + 1 : 1;
      if (run === 1) runStart = day.date;
      if (run > longest) {
        longest = run;
        longestStart = runStart;
        longestEnd = day.date;
      }
    } else run = 0;
    previous = day.date;
  }
  const yesterday = new Date(Date.parse(today) - 86400000)
    .toISOString()
    .slice(0, 10);
  const byDate = new Map(days.map((d) => [d.date, d.contributionCount]));
  let cursor = byDate.get(today) > 0 ? today : yesterday,
    current = 0;
  while (byDate.get(cursor) > 0) {
    current++;
    cursor = new Date(Date.parse(cursor) - 86400000).toISOString().slice(0, 10);
  }
  return {
    current,
    longest,
    longestStart,
    longestEnd,
    total: days.reduce((n, d) => n + d.contributionCount, 0),
    activeDays: days.filter((d) => d.contributionCount > 0).length,
  };
}
export function xml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[
        c
      ]),
  );
}
