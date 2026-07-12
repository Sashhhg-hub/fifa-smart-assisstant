import { LostFoundReport, ILostFoundReport } from '../models/LostFoundReport.js';
import { GeminiService } from './ai/gemini.js';

const geminiService = new GeminiService();

// Local fallback lists when database is offline/empty
const fallbackReports: ILostFoundReport[] = [
  {
    claimId: 'LF-W1',
    name: 'Leather Wallet',
    category: 'Wallet',
    type: 'lost',
    description: 'Black leather tri-fold wallet containing ID and credit cards.',
    contactInfo: 'user1@example.com',
    status: 'Reported',
  },
  {
    claimId: 'LF-P1',
    name: 'iPhone 15',
    category: 'Phone',
    type: 'found',
    description: 'iPhone 15 Pro Max with a clear case and blue background.',
    contactInfo: 'staff@metlifestadium.com',
    status: 'Processing',
  },
];

export class LostFoundService {
  async getReports(): Promise<ILostFoundReport[]> {
    try {
      const dbReports = await LostFoundReport.find().lean();
      if (dbReports && dbReports.length > 0) {
        return dbReports as unknown as ILostFoundReport[];
      }
    } catch (err) {
      console.warn(
        '[Lost & Found Service] Database query failed. Falling back to local array:',
        err
      );
    }
    return fallbackReports;
  }

  async createReport(data: unknown): Promise<unknown> {
    const payload = data as Partial<ILostFoundReport>;
    const claimId = `LF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const newReport: Record<string, unknown> = {
      claimId,
      name: payload.name || 'Unnamed Item',
      category: payload.category || 'Other',
      type: payload.type || 'lost',
      description: payload.description || '',
      contactInfo: payload.contactInfo || 'anonymous',
      status: 'Reported',
      matchedReportId: undefined,
      matchConfidence: 0,
    };

    // Attempt semantic matching via GeminiService
    try {
      const allReports = await this.getReports();
      const counterpartType = newReport.type === 'lost' ? 'found' : 'lost';
      const candidates = allReports.filter((r) => r.type === counterpartType);

      for (const candidate of candidates) {
        try {
          const matchResult = await geminiService.matchLostItem(
            (newReport.description as string) || '',
            candidate.description || candidate.name
          );

          if (matchResult.matchConfirmed || matchResult.matchScore >= 75) {
            newReport.matchedReportId = candidate.claimId || candidate.name;
            newReport.matchConfidence = matchResult.matchScore;
            newReport.status = 'Matched';
            console.log(
              `[Lost & Found Service] Semantic Match Found! Score: ${matchResult.matchScore}%`
            );
            break;
          }
        } catch (matchErr) {
          console.warn('[Lost & Found Service] Single candidate match check failed:', matchErr);
        }
      }
    } catch (matchLoopErr) {
      console.warn('[Lost & Found Service] Semantic match loop failed:', matchLoopErr);
    }

    // Try saving to DB, otherwise fall back to memory instance
    try {
      const created = await LostFoundReport.create(newReport);
      return created;
    } catch (dbErr) {
      console.warn(
        '[Lost & Found Service] Database write failed. Returning in-memory report instance:',
        dbErr
      );
      return newReport;
    }
  }
}
