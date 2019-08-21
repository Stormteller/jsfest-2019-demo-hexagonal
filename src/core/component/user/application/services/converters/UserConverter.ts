import {Converter} from '../../../../../sharedKernel/interfaces/Converter';
import {UserResponse} from '../../data/output/UserResponse';
import {User} from '../../../domain/data/User';
import {injectable} from 'inversify';

@injectable()
export class UserConverter implements Converter<User, UserResponse> {
    from(from: User): UserResponse {
        return UserResponse.fromObject({
            phone: from.phone,
            id: from.id,
            username: from.username
        });
    }

    to(to: UserResponse): User {
        throw new Error('Cannot be implemented');
    }

}
