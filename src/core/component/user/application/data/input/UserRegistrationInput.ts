import {IsPhoneNumber, IsString, Length} from 'class-validator';

export class UserRegistrationInput {
    @IsString()
    @Length(3, 30)
    username: string;

    @IsPhoneNumber('ZZ')
    phone: string;
}
