interface UserBuilderObj {
    id?: number | null;

    phone: string;

    username: string;
}

export class UserResponse {
    id: number | null;

    phone: string;

    username: string;

    public static fromObject(builder: UserBuilderObj): UserResponse {
        const user = new UserResponse();
        user.id = builder.id || null;
        user.phone = builder.phone;
        user.username = builder.username;
        return user;
    }
}
