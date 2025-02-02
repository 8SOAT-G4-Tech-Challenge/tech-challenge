import { UserMockBuilder } from '@src/__mocks__/user.mock-builder';
import { UserRepositoryImpl } from '@src/adapter/driven/infra';
import { prisma } from '@src/adapter/driven/infra/lib/prisma';

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

jest.mock('@src/core/application/services/cacheService', () => ({
	cacheService: {
		get: jest.fn(),
		set: jest.fn(),
		del: jest.fn(),
	},
}));

describe('UserRepositoryImpl -> Test', () => {
	let repository: UserRepositoryImpl;

	beforeEach(() => {
		repository = new UserRepositoryImpl();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getUsers', () => {
		test('should get users', async () => {
			const users = [new UserMockBuilder().withDefaultValues().build()];

			jest.spyOn(prisma.user, 'findMany').mockResolvedValue(users as any);

			const response = await repository.getUsers();

			expect(response).toEqual(users);
		});
	});
});
