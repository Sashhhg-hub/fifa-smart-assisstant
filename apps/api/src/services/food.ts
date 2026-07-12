export class FoodService {
  async getVendors(): Promise<unknown[]> {
    return [
      {
        id: 'vendor-1',
        name: 'Stadium Burgers & Fries',
        location: 'Section 114',
        crowdLevel: 'Moderate',
        estimatedWaitTime: 12,
      },
      {
        id: 'vendor-2',
        name: 'FIFA Official Tacos',
        location: 'Section 122',
        crowdLevel: 'Heavy',
        estimatedWaitTime: 25,
      },
    ];
  }
}
