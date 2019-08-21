import {inject, injectable} from 'inversify';
import {NotificationService, NotificationServiceType} from '../../../../port/notification/NotificationService';
import {Event} from '../../domain/data/Event';
import {UserRepository, UserRepositoryType} from '../../../user/port/UserRepository';
import {NotFound} from '../../../../sharedKernel/exceptions/NotFound';

@injectable()
export class EventReminderService {
    private notificationService: NotificationService;
    private userRepo: UserRepository;

    constructor(
        @inject(NotificationServiceType) notificationService: NotificationService,
        @inject(UserRepositoryType) userRepo: UserRepository
    ) {
        this.notificationService = notificationService;
        this.userRepo = userRepo;
    }

    public async setupReminder(event: Event): Promise<void> {
        const user = await this.userRepo.findById(event.creatorId);

        if(!user) throw new NotFound('No such user');

        setTimeout(()=> {
            this.sendReminder(event, user.notificationTokens)
        }, event.startDate.valueOf() - Date.now())
    }

    public async sendReminder(event: Event, tokens: string[]): Promise<void> {
        const message = {
            title: `It is time to ${event.title}`,
            body: 'Hello from JSFest!',
            data: {eventId: event.id}
        };
        await this.notificationService.sendNotifications(message, tokens);
    }
}
