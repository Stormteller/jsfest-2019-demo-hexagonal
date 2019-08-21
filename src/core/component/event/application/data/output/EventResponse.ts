import {EventType} from '../../../domain/data/EventType';

interface EventResponseBuilderObj {
    id?: number | undefined | null,
    title: string,
    startDate: Date,
    endDate: Date,
    creatorId: number,
    eventType: EventType,
    createdAt?: Date | undefined| null
}

export class EventResponse {
    id: number | null;

    title: string;

    startDate: Date;

    endDate: Date;

    creatorId: number;

    eventType: EventType;

    createdAt: Date | null;

    public static fromObject(builder: EventResponseBuilderObj): EventResponse {
        const event = new EventResponse();
        event.id = builder.id || null;
        event.title = builder.title;
        event.startDate = builder.startDate;
        event.endDate = builder.endDate;
        event.creatorId = builder.creatorId;
        event.eventType = builder.eventType;
        event.createdAt = builder.createdAt || null;
        return event;
    }
}
