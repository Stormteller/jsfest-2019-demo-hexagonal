import {inject, injectable} from 'inversify';
import {UserRepository, UserRepositoryType} from '../../port/UserRepository';
import {NotFound} from '../../../../sharedKernel/exceptions/NotFound';

@injectable()
export class UserNotificationService {
    private userRepo: UserRepository;

    constructor(@inject(UserRepositoryType) userRepo: UserRepository) {
        this.userRepo = userRepo;
    }

    public async addNotificationToken(token: string, actionUserId: number): Promise<void> {
        const user = await this.userRepo.findById(actionUserId);

        if(!user) throw new NotFound('No such user');

        user.notificationTokens.push(token);

        await this.userRepo.save(user);
    }
}
