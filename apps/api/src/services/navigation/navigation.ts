export class NavigationService {
  async calculateRoute(
    fromId: string,
    toId: string
  ): Promise<{ route: string[]; eta: number; distance: number }> {
    return {
      route: [fromId, 'concourse-north', 'portal-114', toId],
      eta: 4,
      distance: 120, // in meters
    };
  }
}
