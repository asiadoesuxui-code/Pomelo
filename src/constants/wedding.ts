export const WEDDING_DATE = new Date(2026, 7, 21, 16, 0, 0, 0);

export const WEDDING_DATE_ISO = WEDDING_DATE.toISOString();

const LEGACY_WEDDING_KEYS = ["pomelo-wedding", "pomelo-wedding-date"];

export function clearLegacyWeddingDateStorage() {
  for (const key of LEGACY_WEDDING_KEYS) {
    localStorage.removeItem(key);
  }
}
