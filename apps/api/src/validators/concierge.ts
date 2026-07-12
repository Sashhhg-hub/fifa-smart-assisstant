export function validateConcierge(body: unknown): { valid: boolean; errors?: string[] } {
  const payload = body as Record<string, unknown> | null;
  if (!payload || typeof payload.prompt !== 'string' || !payload.prompt.trim()) {
    return { valid: false, errors: ['"prompt" is required and must be a non-empty string'] };
  }
  return { valid: true };
}
