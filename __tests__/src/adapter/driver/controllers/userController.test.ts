import { UserMockBuilder } from '@src/__mocks__/user.mock-builder';
import { UserController } from '@src/adapter/driver/controllers/userController';
import logger from '@src/core/common/logger';

describe('UserController -> Test', () => {
	let controller: UserController;
	let userService: any;

	beforeEach(() => {
		userService = {
			getUsers: jest.fn(),
		};

		controller = new UserController(userService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getUsers', () => {
		test('should reply 200 and list all users', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const user = new UserMockBuilder().withDefaultValues().build();

			const req = {};
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			userService.getUsers.mockResolvedValue([user]);

			await controller.getUsers(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(200);
			expect(reply.send).toHaveBeenCalledWith([user]);
			expect(loggerSpy).toHaveBeenCalledWith('Listing users');
		});

		test('should fail to list users', async () => {
			const loggerSpy = jest.spyOn(logger, 'error');

			const req = { url: '/get-users-mock' };
			const reply = {
				send: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			userService.getUsers.mockRejectedValue({ message: 'error' });

			await controller.getUsers(req as any, reply as any);

			expect(loggerSpy).toHaveBeenCalledWith(
				'Unexpected error when listing for users: {"message":"error"}'
			);
			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith({
				message: 'error',
				path: '/get-users-mock',
				status: 500,
			});
		});
	});
});
