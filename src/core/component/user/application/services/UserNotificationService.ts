import {inject, injectable} from 'inversify';
import {UserRepository, UserRepositoryType} from '../../port/UserRepository';
import {NotFound} from '../../../../sharedKernel/exceptions/NotFound';
import {Converter} from '../../../../sharedKernel/interfaces/Converter';
import {User} from '../../domain/data/User';
import {UserResponse} from '../data/output/UserResponse';
import {UserConverter} from './converters/UserConverter';

@injectable()
export class UserNotificationService {
    private userRepo: UserRepository;
    private userConverter: Converter<User, UserResponse>;

    constructor(
        @inject(UserRepositoryType) userRepo: UserRepository,
        @inject(UserConverter) userConverter: Converter<User, UserResponse>
    ) {
        this.userRepo = userRepo;
        this.userConverter = userConverter;
    }

    public async addNotificationToken(token: string, actionUserId: number): Promise<UserResponse> {
        const user = await this.userRepo.findById(actionUserId);

        if(!user) throw new NotFound('No such user');

        const setOfTokens = new Set(user.notificationTokens);
        setOfTokens.add(token);
        user.notificationTokens = [...setOfTokens];

        const savedUser = await this.userRepo.save(user);

        return this.userConverter.from(savedUser);
    }
}
