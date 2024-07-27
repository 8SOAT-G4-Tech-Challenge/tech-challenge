import { User } from '@models/user';
import { UserRepository } from '@ports/repository/userRepository';

export class UserService {
	private readonly userRepository;

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async getUsers(): Promise<User[]> {
		const costumers = await this.userRepository.getUsers();
		return costumers;
	}
}
