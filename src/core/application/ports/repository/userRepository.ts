import { User } from '@models/user';

export interface UserRepository {
    getUsers(): Promise<User[] | []>;
}
