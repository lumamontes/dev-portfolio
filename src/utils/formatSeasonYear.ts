// Editorial-style date label ("Fall 2025" / "Outono 2025") instead of an
// exact day, matching the reference archive's tag-badge style — the point
// is a vibe, not a precise timestamp.
const seasonsByMonth: Record<'en' | 'br', string[]> = {
  // index = month (0 = January), Northern-hemisphere convention
  en: ['Winter', 'Winter', 'Spring', 'Spring', 'Spring', 'Summer', 'Summer', 'Summer', 'Fall', 'Fall', 'Fall', 'Winter'],
  // Southern-hemisphere convention — Brazil's actual seasons, not a literal
  // translation of the Northern labels above (that would read backwards,
  // e.g. calling August "Summer").
  br: ['Verão', 'Verão', 'Outono', 'Outono', 'Outono', 'Inverno', 'Inverno', 'Inverno', 'Primavera', 'Primavera', 'Primavera', 'Verão'],
};

export default function formatSeasonYear(date: Date, lang: 'en' | 'br' = 'en'): string {
  const season = seasonsByMonth[lang][date.getMonth()];
  return `${season} ${date.getFullYear()}`;
}
