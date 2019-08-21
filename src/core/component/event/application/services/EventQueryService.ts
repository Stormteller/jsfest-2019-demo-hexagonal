import {inject, injectable} from 'inversify';
import {EventRepository, EventRepositoryType} from '../../port/EventRepository';
import {EventResponse} from '../data/output/EventResponse';
import {NotFound} from '../../../../sharedKernel/exceptions/NotFound';
import {Forbidden} from '../../../../sharedKernel/exceptions/Forbidden';
import {Converter} from '../../../../sharedKernel/interfaces/Converter';
import {EventConverter} from './converters/EventConverter';
import {Event} from '../../domain/data/Event';

@injectable()
export class EventQueryService {
    private eventRepo: EventRepository;
    private eventConverter: Converter<Event, EventResponse>;

    constructor(
        @inject(EventRepositoryType) eventRepo: EventRepository,
        @inject(EventConverter) eventConverter: Converter<Event, EventResponse>
    ) {
        this.eventRepo = eventRepo;
        this.eventConverter = eventConverter;
    }

    public async getEventById(eventId: number, actionUserId: number): Promise<EventResponse> {
        const event = await this.eventRepo.findById(eventId);
        if (!event) throw new NotFound('No such event');

        if (event.creatorId !== actionUserId) throw new Forbidden('Only creator can access event');

        return this.eventConverter.from(event);
    }

    public async getEventsCreatedByUser(actionUserId: number): Promise<EventResponse[]> {
        const events = await this.eventRepo.findByCreator(actionUserId);

        return events.map(event => this.eventConverter.from(event));
    }
}
