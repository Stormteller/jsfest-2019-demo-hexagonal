import {inject, injectable} from 'inversify';
import {Body, CurrentUser, Get, JsonController, Param, Post} from 'routing-controllers';
import {EventCreationService} from '../../../core/component/event/application/services/EventCreationService';
import {EventQueryService} from '../../../core/component/event/application/services/EventQueryService';
import {EventResponse} from '../../../core/component/event/application/data/output/EventResponse';
import {EventCreationInput} from '../../../core/component/event/application/data/input/EventCreationInput';
import {validateOrReject} from 'class-validator';

@injectable()
@JsonController('/event')
export class EventController {
    private eventCreationService: EventCreationService;
    private eventQueryService: EventQueryService;

    constructor(
        @inject(EventCreationService) eventCreationService: EventCreationService,
        @inject(EventQueryService) eventQueryService: EventQueryService
    ) {
        this.eventCreationService = eventCreationService;
        this.eventQueryService = eventQueryService;
    }

    @Post()
    public async createEvent(
        @Body() input: EventCreationInput,
        @CurrentUser({required: true}) userId: number
    ): Promise<EventResponse> {
        await validateOrReject(input);
        return await this.eventCreationService.createEvent(input, userId);
    }

    @Get('/user/my')
    public async getUsersEvents(@CurrentUser({required: true}) userId: number): Promise<EventResponse[]> {
        return this.eventQueryService.getEventsCreatedByUser(userId);
    }

    @Get('/:id')
    public async getEventById(
        @Param('id') eventId: number,
        @CurrentUser({required: true}) userId: number
    ): Promise<EventResponse> {
        return await this.eventQueryService.getEventById(eventId, userId);
    }
}
