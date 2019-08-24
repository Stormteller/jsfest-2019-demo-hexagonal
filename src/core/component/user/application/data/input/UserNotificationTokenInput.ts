import {IsString, MaxLength} from 'class-validator';

export class UserNotificationTokenInput {
    @IsString()
    @MaxLength(255)
    notificationToken: string;
}
