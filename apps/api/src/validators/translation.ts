export function validateTranslation(body: unknown): { valid: boolean; errors?: string[] } {
  const payload = body as Record<string, unknown> | null;
  const errors: string[] = [];
  
  if (!payload) {
    return { valid: false, errors: ['Body payload is missing'] };
  }
  if (typeof payload.text !== 'string' || !payload.text.trim()) {
    errors.push('"text" parameter is required');
  }
  if (typeof payload.sourceLang !== 'string' || typeof payload.targetLang !== 'string') {
    errors.push('"sourceLang" and "targetLang" parameters are required');
  }
  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}
