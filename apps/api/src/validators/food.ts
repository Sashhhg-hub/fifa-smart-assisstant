export function validateFood(query: unknown): { valid: boolean; errors?: string[] } {
  const payload = query as Record<string, unknown> | null;
  if (payload && payload.vendorId && typeof payload.vendorId !== 'string') {
    return { valid: false, errors: ['"vendorId" must be a string if provided'] };
  }
  return { valid: true };
}
