import {ContainerModule, interfaces} from 'inversify';
import {EventEntityConverter} from './event/converters/EventEntityConverter';
import {EventRepository, EventRepositoryType} from '../../core/component/event/port/EventRepository';
import {EventRepositoryAdapter} from './event/repository/EventRepositoryAdapter';
import {UserEntityConverter} from './user/converters/UserEntityConverter';
import {UserRepository, UserRepositoryType} from '../../core/component/user/port/UserRepository';
import {UserRepositoryAdapter} from './user/repository/UserRepositoryAdapter';

export default new ContainerModule((
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind
) => {
    bind(EventEntityConverter).toSelf();
    bind<EventRepository>(EventRepositoryType).to(EventRepositoryAdapter);

    bind(UserEntityConverter).toSelf();
    bind<UserRepository>(UserRepositoryType).to(UserRepositoryAdapter);
});
