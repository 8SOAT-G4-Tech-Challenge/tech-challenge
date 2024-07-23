import { User } from '@models/user';
import { UserRepository } from '@ports/repository/userRepository';

export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async getUsers(): Promise<User[]> {
		const costumers = await this.userRepository.getUsers();
		return costumers;
	}
}
