import { UserService } from '@src/core/application/services/userService';
import { UserMockBuilder } from '@tests/mocks/user.mock-builder';

describe('UserService -> Test', () => {
	let service: UserService;
	let mockUserRepository: any;

	beforeEach(() => {
		mockUserRepository = {
			getUsers: jest.fn(),
		};

		service = new UserService(mockUserRepository);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getUsers', () => {
		test('should get all product categories', async () => {
			const users = [new UserMockBuilder().withDefaultValues().build()];

			mockUserRepository.getUsers.mockResolvedValue(users);

			const response = await service.getUsers();

			expect(mockUserRepository.getUsers).toHaveBeenCalled();
			expect(response).toEqual(users);
		});
	});
});
