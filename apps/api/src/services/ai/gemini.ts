export class GeminiService {
  async generateReply(
    prompt: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _context?: unknown
  ): Promise<{ replyText: string; suggestions: string[] }> {
    return {
      replyText: `This is a placeholder AI response to your prompt: "${prompt}". In the future, this will connect to the Google Gemini API.`,
      suggestions: ['Find concession stands', 'Show nearest exit', 'Check match score'],
    };
  }
}
