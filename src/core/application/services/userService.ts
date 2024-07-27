import { UserRepository } from '@ports/repository/userRepository';
import { User } from '@src/core/domain/models/user';

export class UserService {
	private readonly userRepository;

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async getUsers(): Promise<User[]> {
		const users: User[] = await this.userRepository.getUsers();
		return users;
	}
}
