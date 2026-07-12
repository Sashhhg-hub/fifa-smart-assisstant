export class NotificationService {
  async sendPushNotification(
    userId: string,
    title: string,
    body: string
  ): Promise<boolean> {
    console.log(`[Notification Service] Dispatching to User ${userId}: ${title} - ${body}`);
    return true;
  }
}
