export function validateMatch(query: unknown): { valid: boolean; errors?: string[] } {
  const payload = query as Record<string, unknown> | null;
  if (payload && payload.matchId && typeof payload.matchId !== 'string') {
    return { valid: false, errors: ['"matchId" must be a string if provided'] };
  }
  return { valid: true };
}
