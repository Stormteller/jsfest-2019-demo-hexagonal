export interface EventRepository {
    findById(id: number): Promise<Event | null>;

    findByCreator(creatorId: number): Promise<Event[]>;

    findByStartDateRange(dateFrom: Date, dateTo: Date): Promise<Event[]>;

    save(): Promise<Event>;
}
