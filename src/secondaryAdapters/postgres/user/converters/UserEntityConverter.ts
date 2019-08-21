import {injectable} from 'inversify';
import {Converter} from '../../../../core/sharedKernel/interfaces/Converter';
import {UserEntity} from '../data/UserEntity';
import {User} from '../../../../core/component/user/domain/data/User';

@injectable()
export class UserEntityConverter implements Converter<UserEntity, User> {
    from(from: UserEntity): User {
        return User.fromObject({...from});
    }

    to(to: User): UserEntity {
        return UserEntity.fromObject({...to});
    }

}
