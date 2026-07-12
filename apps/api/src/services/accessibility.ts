export class AccessibilityService {
  async getAccessibilityServices(): Promise<unknown> {
    return {
      wheelchairEscortAvailable: true,
      sensoryRoomLocation: 'Section 215 Concourse',
      audioDescriptiveServiceFrequency: 'FM 88.5 MHz',
      accessibleGates: ['Gate A', 'Gate C Ramp'],
    };
  }
}
