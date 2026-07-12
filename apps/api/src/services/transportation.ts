export class TransportationService {
  async getTransitOptions(): Promise<unknown[]> {
    return [
      { id: 'trans-1', name: 'MetLife Metro Link', type: 'Metro', travelTime: 30, cost: '$2.75' },
      { id: 'trans-2', name: 'Uber pickup zone', type: 'Uber', travelTime: 20, cost: '$30.00+' },
    ];
  }
}
