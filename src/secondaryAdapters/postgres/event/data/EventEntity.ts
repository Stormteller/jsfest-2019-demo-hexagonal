import {Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {EventType} from '../../../../core/component/event/domain/data/EventType';

interface EventBuilderObj {
    id?: number | null | undefined,
    title: string,
    startDate: Date,
    endDate: Date,
    creatorId: number,
    eventType: EventType,
    createdAt?: Date | null | undefined
}

@Entity({name: 'event'})
export class EventEntity {
    @PrimaryColumn({name: 'id', generated: true})
    id?: number;

    @Column({name: 'title'})
    title: string;

    @Column({name: 'start_date'})
    startDate: Date;

    @Column({name: 'end_date'})
    endDate: Date;

    @Column({name: 'creator_id'})
    creatorId: number;

    @Column({name: 'event_type', type: 'enum', enum: EventType})
    eventType: EventType;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date = new Date();

    public static fromObject(builder: EventBuilderObj): EventEntity {
        const event = new EventEntity();
        event.id = builder.id || undefined;
        event.title = builder.title;
        event.startDate = builder.startDate;
        event.endDate = builder.endDate;
        event.creatorId = builder.creatorId;
        event.eventType = builder.eventType;
        if(builder.createdAt) event.createdAt = builder.createdAt;
        return event;
    }
}
