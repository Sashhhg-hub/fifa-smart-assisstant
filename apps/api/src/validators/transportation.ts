export function validateTransportation(query: unknown): { valid: boolean; errors?: string[] } {
  const payload = query as Record<string, unknown> | null;
  if (payload && payload.type && typeof payload.type !== 'string') {
    return { valid: false, errors: ['"type" must be a string if provided'] };
  }
  return { valid: true };
}
