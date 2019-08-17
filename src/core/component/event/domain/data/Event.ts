import {EventType} from './EventType';

export class Event {
    id?: number;

    title: string;

    startDate: Date;

    endDate: Date;

    creatorId: number;

    eventType: EventType;

    createdAt: Date;
}
