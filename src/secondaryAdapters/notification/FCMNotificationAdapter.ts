import {NotificationService} from '../../core/port/notification/NotificationService';
import {NotificationMessage} from '../../core/port/notification/data/NotificationMessage';
import {injectable} from 'inversify';

@injectable()
export class FCMNotificationAdapter implements NotificationService {
    public async sendNotifications(message: NotificationMessage, tokens: string[]): Promise<void> {
        console.log(`Notification "${message.title}" sent to tokens ${tokens.join(', ')}!`);
    }

}
