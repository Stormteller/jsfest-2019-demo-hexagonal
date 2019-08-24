import {ContainerModule, interfaces} from 'inversify';
import {EventConverter} from './application/services/converters/EventConverter';
import {EventCreationInput} from './application/data/input/EventCreationInput';
import {EventCreationService} from './application/services/EventCreationService';
import {EventQueryService} from './application/services/EventQueryService';
import {EventReminderService} from './application/services/EventReminderService';

export default new ContainerModule((
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind
) => {
    bind(EventConverter).toSelf();
    bind(EventCreationService).toSelf();
    bind(EventQueryService).toSelf();
    bind(EventReminderService).toSelf();
});
