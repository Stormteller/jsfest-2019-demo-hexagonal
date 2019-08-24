import {EventRepository, EventRepositoryType} from '../../port/EventRepository';
import {inject, injectable} from 'inversify';
import {EventResponse} from '../data/output/EventResponse';
import {EventCreationInput} from '../data/input/EventCreationInput';
import {EventReminderService} from './EventReminderService';
import {Event} from '../../domain/data/Event';
import {Converter} from '../../../../sharedKernel/interfaces/Converter';
import {EventConverter} from './converters/EventConverter';

@injectable()
export class EventCreationService {
    private eventRepo: EventRepository;
    private reminderService: EventReminderService;
    private eventConverter: Converter<Event, EventResponse>;

    constructor(
        @inject(EventRepositoryType) eventRepo: EventRepository,
        @inject(EventReminderService) reminderService: EventReminderService,
        @inject(EventConverter) eventConverter: Converter<Event, EventResponse>
    ) {
        this.eventRepo = eventRepo;
        this.reminderService = reminderService;
        this.eventConverter = eventConverter;
    }

    public async createEvent(input: EventCreationInput, actionUserId: number): Promise<EventResponse> {
        const newEvent = Event.fromObject({
            ...input,
            creatorId: actionUserId
        });

        const savedEvent = await this.eventRepo.save(newEvent);

        await this.reminderService.setupReminder(savedEvent);

        return this.eventConverter.from(savedEvent);
    }
}
