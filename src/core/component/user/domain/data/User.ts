interface UserBuilderObj {
    id?: number;

    phone: string;

    username: string;

    notificationTokens?: string[] | undefined | null;
}

export class User {
    id: number | null;

    phone: string;

    username: string;

    notificationTokens: string[] = [];

    public static fromObject(builder: UserBuilderObj): User {
        const user = new User();
        user.id = builder.id || null;
        user.phone = builder.phone;
        user.username = builder.username;
        if(builder.notificationTokens != null) user.notificationTokens = builder.notificationTokens;
        return user;
    }
}
