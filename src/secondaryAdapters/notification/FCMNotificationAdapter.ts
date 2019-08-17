import {NotificationService} from '../../core/port/notification/NotificationService';
import {NotificationMessage} from '../../core/port/notification/data/NotificationMessage';

export class FCMNotificationAdapter implements NotificationService {
    public async sendNotifications(message: NotificationMessage, tokens: string[]): Promise<void> {
        console.log(`Notification "${message.title}" sent to tokens ${tokens.join(', ')}!`);
    }

}
