import {Column, Entity, PrimaryColumn} from 'typeorm';

interface UserBuilderObj {
    id?: number | undefined | null;

    phone: string;

    username: string;

    notificationTokens?: string[] | undefined | null;
}

@Entity({name: 'users'})
export class UserEntity {
    @PrimaryColumn({name: 'id', generated: true})
    id?: number;

    @Column({name: 'phone'})
    phone: string;

    @Column({name: 'username'})
    username: string;

    @Column('text', {name: 'notification_tokens', array: true})
    notificationTokens: string[] = [];

    public static fromObject(builder: UserBuilderObj): UserEntity {
        const user = new UserEntity();
        user.id = builder.id || undefined;
        user.phone = builder.phone;
        user.username = builder.username;
        if (builder.notificationTokens != null) user.notificationTokens = builder.notificationTokens;
        return user;
    }
}
