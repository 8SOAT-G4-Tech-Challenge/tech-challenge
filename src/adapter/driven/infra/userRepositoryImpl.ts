import { prisma } from '@driven/infra/lib/prisma';
import { User } from '@models/user';
import { UserRepository } from '@ports/repository/userRepository';

export class UserRepositoryImpl implements UserRepository {
	async getUsers(): Promise<User[]> {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				password: false,
				sessionToken: false,
				isAdmin: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		return users;
	}
}
