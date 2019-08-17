import {User} from '../domain/data/User';

export interface UserRepository {
    findByUsername(username: string): Promise<User | null>;

    findById(id: number): Promise<User | null>;

    save(user: User): Promise<User>;
}
