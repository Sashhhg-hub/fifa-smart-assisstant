export function validateNavigation(query: unknown): { valid: boolean; errors?: string[] } {
  const payload = query as Record<string, unknown> | null;
  if (!payload || typeof payload.from !== 'string' || typeof payload.to !== 'string') {
    return { valid: false, errors: ['"from" and "to" parameters are required strings'] };
  }
  return { valid: true };
}
