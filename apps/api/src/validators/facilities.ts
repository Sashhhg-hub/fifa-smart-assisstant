export function validateFacilities(query: unknown): { valid: boolean; errors?: string[] } {
  const payload = query as Record<string, unknown> | null;
  if (payload && payload.category && typeof payload.category !== 'string') {
    return { valid: false, errors: ['"category" must be a string if provided'] };
  }
  return { valid: true };
}
