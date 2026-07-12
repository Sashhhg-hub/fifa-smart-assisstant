export function validateFood(query: unknown): { valid: boolean; errors?: string[] } {
  const payload = query as Record<string, unknown> | null;
  if (payload) {
    if (payload.vendorId && typeof payload.vendorId !== 'string') {
      return { valid: false, errors: ['"vendorId" must be a string if provided'] };
    }
    if (payload.preferences && typeof payload.preferences !== 'string') {
      return { valid: false, errors: ['"preferences" must be a string if provided'] };
    }
  }
  return { valid: true };
}
