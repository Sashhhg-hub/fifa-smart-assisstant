export class LostFoundService {
  async getReports(): Promise<unknown[]> {
    return [
      { id: 'rep-1', name: 'Leather Wallet', category: 'Wallet', type: 'lost', status: 'Reported' },
      { id: 'rep-2', name: 'iPhone 15', category: 'Phone', type: 'found', status: 'Processing' },
    ];
  }

  async createReport(data: unknown): Promise<unknown> {
    const payload = data as Record<string, unknown>;
    return {
      claimId: `LF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      ...payload,
      status: 'Reported',
      dateReported: new Date(),
    };
  }
}
