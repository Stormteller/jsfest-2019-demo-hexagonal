import {NotificationMessage} from './data/NotificationMessage';

export interface NotificationService {
    sendNotifications(message: NotificationMessage, tokens: string[]): Promise<void>;
}

const NotificationServiceType = Symbol.for('NotificationService');

export {NotificationServiceType};
