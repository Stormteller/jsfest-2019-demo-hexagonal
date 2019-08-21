import {inject, injectable} from 'inversify';
import {UserRepository, UserRepositoryType} from '../../port/UserRepository';
import {Converter} from '../../../../sharedKernel/interfaces/Converter';
import {User} from '../../domain/data/User';
import {UserConverter} from './converters/UserConverter';
import {UserResponse} from '../data/output/UserResponse';
import {UserRegistrationInput} from '../data/input/UserRegistrationInput';
import {BadRequest} from '../../../../sharedKernel/exceptions/BadRequest';

@injectable()
export class UserRegistrationService {
    private userRepo: UserRepository;
    private userConverter: Converter<User, UserResponse>;

    constructor(
        @inject(UserRepositoryType) userRepo: UserRepository,
        @inject(UserConverter) userConverter: Converter<User, UserResponse>
    ) {
        this.userRepo = userRepo;
        this.userConverter = userConverter;
    }

    public async registerUser(input: UserRegistrationInput): Promise<UserResponse> {
        const userWithUsername = await this.userRepo.findByUsername(input.username);

        if(userWithUsername) throw new BadRequest('Username already exists');

        const newUser = User.fromObject({
            ...input
        });

        const user = await this.userRepo.save(newUser);

        return this.userConverter.from(user);
    }
}
