export function validateLostFound(body: unknown): { valid: boolean; errors?: string[] } {
  const payload = body as Record<string, unknown> | null;
  const errors: string[] = [];
  
  if (!payload) {
    return { valid: false, errors: ['Body payload is missing'] };
  }
  if (payload.type !== 'lost' && payload.type !== 'found') {
    errors.push('"type" must be either "lost" or "found"');
  }
  if (typeof payload.name !== 'string' || !payload.name.trim()) {
    errors.push('"name" parameter is required');
  }
  if (typeof payload.category !== 'string' || !payload.category.trim()) {
    errors.push('"category" parameter is required');
  }
  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}
