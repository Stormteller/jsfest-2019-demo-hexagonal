import {ContainerModule, interfaces} from 'inversify';
import {UserNotificationService} from './application/services/UserNotificationService';
import {UserRegistrationService} from './application/services/UserRegistrationService';
import {UserConverter} from './application/services/converters/UserConverter';

export default new ContainerModule((
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind
) => {
    bind(UserConverter).toSelf();
    bind(UserNotificationService).toSelf();
    bind(UserRegistrationService).toSelf();
});
