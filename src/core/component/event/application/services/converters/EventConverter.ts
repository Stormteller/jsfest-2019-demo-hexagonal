import {Converter} from '../../../../../sharedKernel/interfaces/Converter';
import {EventResponse} from '../../data/output/EventResponse';
import {injectable} from 'inversify';
import {Event} from '../../../domain/data/Event';

@injectable()
export class EventConverter implements Converter<Event, EventResponse> {
    from(from: Event): EventResponse {
        return EventResponse.fromObject({...from});
    }

    to(to: EventResponse): Event {
        return EventResponse.fromObject({...to});
    }

}
