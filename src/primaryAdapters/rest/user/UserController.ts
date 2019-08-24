import {Body, CurrentUser, JsonController, Post} from 'routing-controllers';
import {inject, injectable} from 'inversify';
import {UserRegistrationService} from '../../../core/component/user/application/services/UserRegistrationService';
import {UserRegistrationInput} from '../../../core/component/user/application/data/input/UserRegistrationInput';
import {validateOrReject} from 'class-validator';
import {UserResponse} from '../../../core/component/user/application/data/output/UserResponse';
import {UserNotificationTokenInput} from '../../../core/component/user/application/data/input/UserNotificationTokenInput';
import {UserNotificationService} from '../../../core/component/user/application/services/UserNotificationService';

@injectable()
@JsonController('/user')
export class UserController {
    private userRegistrationService: UserRegistrationService;
    private userNotificationService: UserNotificationService;

    constructor(
        @inject(UserRegistrationService) userRegistrationService: UserRegistrationService,
        @inject(UserNotificationService) userNotificationService: UserNotificationService
    ) {
        this.userRegistrationService = userRegistrationService;
        this.userNotificationService = userNotificationService;
    }

    @Post()
    public async register(@Body() input: UserRegistrationInput): Promise<UserResponse> {
        await validateOrReject(input);
        return this.userRegistrationService.registerUser(input);
    }

    @Post('/notification_token')
    public async addNotificationToken(
        @Body() input: UserNotificationTokenInput,
        @CurrentUser({required: true}) userId: number
    ): Promise<UserResponse> {
        await validateOrReject(input);
        return await this.userNotificationService.addNotificationToken(input.notificationToken, userId);
    }
}
