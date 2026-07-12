export class FacilitiesService {
  async getFacilities(): Promise<unknown[]> {
    return [
      { id: 'fac-1', name: 'Restroom Block A', category: 'Washrooms', crowdLevel: 'Low' },
      { id: 'fac-2', name: 'Chase ATM Plaza', category: 'ATMs', crowdLevel: 'Low' },
    ];
  }
}
