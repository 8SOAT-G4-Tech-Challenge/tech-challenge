import { UserRepository } from '@ports/repository/userRepository';
import { User } from '@src/core/domain/models/user';

export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async getUsers(): Promise<User[]> {
		const users: User[] = await this.userRepository.getUsers();
		return users;
	}
}
