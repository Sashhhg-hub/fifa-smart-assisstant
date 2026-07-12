export function validateEmergency(body: unknown): { valid: boolean; errors?: string[] } {
  const payload = body as {
    type?: unknown;
    locationDetails?: unknown;
    coordinates?: { x?: unknown; y?: unknown };
  } | null;
  
  const errors: string[] = [];
  
  if (!payload) {
    return { valid: false, errors: ['Body payload is missing'] };
  }
  if (payload.type !== 'medical' && payload.type !== 'security') {
    errors.push('"type" must be either "medical" or "security"');
  }
  if (typeof payload.locationDetails !== 'string' || !payload.locationDetails.trim()) {
    errors.push('"locationDetails" is required and must be a string');
  }
  if (!payload.coordinates || typeof payload.coordinates.x !== 'number' || typeof payload.coordinates.y !== 'number') {
    errors.push('"coordinates" is required with numeric x and y values');
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}
