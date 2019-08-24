import {ContainerModule, interfaces} from 'inversify';
import {UserController} from './user/UserController';
import {EventController} from './event/EventController';

export default new ContainerModule((
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind
) => {
    bind(UserController).toSelf();
    bind(EventController).toSelf();
});
