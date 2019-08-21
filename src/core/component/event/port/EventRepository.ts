import {Event} from '../domain/data/Event'

export interface EventRepository {
    findById(id: number): Promise<Event | null>;

    findByCreator(creatorId: number): Promise<Event[]>;

    findByStartDateRange(dateFrom: Date, dateTo: Date): Promise<Event[]>;

    save(event: Event): Promise<Event>;
}

const EventRepositoryType = Symbol.for('EventRepository');

export {EventRepositoryType};
