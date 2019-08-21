import {Converter} from '../../../../core/sharedKernel/interfaces/Converter';
import {Event} from '../../../../core/component/event/domain/data/Event';
import {EventEntity} from '../data/EventEntity';
import {injectable} from 'inversify';

@injectable()
export class EventEntityConverter implements Converter<EventEntity, Event> {
    from(from: EventEntity): Event {
        return Event.fromObject({
            ...from
        });
    }

    to(to: Event): EventEntity {
        return EventEntity.fromObject({
            ...to
        });
    }


}
