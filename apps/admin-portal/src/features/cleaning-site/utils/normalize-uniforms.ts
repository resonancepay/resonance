// The API returns uniform names with inconsistent stray whitespace and
// occasional duplicates (e.g. "Rubber Boot", "  Rubber Boot", " Rubber Boot"
// all meaning the same uniform) — trim and dedupe before comparing against
// the fixed uniformOptions list or displaying to the user.
export const normalizeUniforms = (uniforms: string[]): string[] => {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const raw of uniforms) {
    const trimmed = raw.trim();
    if (trimmed && !seen.has(trimmed)) {
      seen.add(trimmed);
      result.push(trimmed);
    }
  }

  return result;
};
