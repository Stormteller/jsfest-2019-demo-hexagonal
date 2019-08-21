import {EventRepository} from '../../../../core/component/event/port/EventRepository';
import {Event} from '../../../../core/component/event/domain/data/Event'
import {inject, injectable} from 'inversify';
import {BaseTypeORMRepository} from '../../common/BaseTypeORMRepository';
import {EventEntity} from '../data/EventEntity';
import {Converter} from '../../../../core/sharedKernel/interfaces/Converter';
import {EventEntityConverter} from '../converters/EventEntityConverter';
import {Between} from 'typeorm';

@injectable()
export class EventRepositoryAdapter extends BaseTypeORMRepository<EventEntity> implements EventRepository {
    private entityConverter: Converter<EventEntity, Event>;

    constructor(
        @inject(EventEntityConverter) entityConverter: Converter<EventEntity, Event>
    ) {
        super(EventEntity);
        this.entityConverter = entityConverter;
    }

    public async findByCreator(creatorId: number): Promise<Event[]> {
        const entities = await this.repository.find({where: {creatorId}});
        return entities.map(entity => this.entityConverter.from(entity));
    }

    public async findById(id: number): Promise<Event | null> {
        const maybeEntity = await this.repository.findOne({where: {id}});
        return maybeEntity ? this.entityConverter.from(maybeEntity) : null;
    }

    public async findByStartDateRange(dateFrom: Date, dateTo: Date): Promise<Event[]> {
        const entities = await this.repository.find({where: {startDate: Between(dateFrom, dateTo)}});
        return entities.map(entity => this.entityConverter.from(entity));
    }

    public async save(event: Event): Promise<Event> {
        const entity = this.entityConverter.to(event);
        const savedEntity = await this.repository.save(entity);
        return this.entityConverter.from(savedEntity);
    }

}
