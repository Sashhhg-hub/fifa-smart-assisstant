export class EmergencyService {
  async triggerAlert(type: 'medical' | 'security', locationDetails: string, coordinates: { x: number; y: number }): Promise<unknown> {
    return {
      alertId: `EMG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      type,
      locationDetails,
      coordinates,
      status: 'received',
      eta: '4 minutes',
      message: 'Responder unit has been dispatched to your current seat coordinates.',
    };
  }
}
