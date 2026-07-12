export function validateAccessibility(query: unknown): { valid: boolean; errors?: string[] } {
  const payload = query as Record<string, unknown> | null;
  if (payload && payload.serviceType && typeof payload.serviceType !== 'string') {
    return { valid: false, errors: ['"serviceType" must be a string if provided'] };
  }
  return { valid: true };
}
