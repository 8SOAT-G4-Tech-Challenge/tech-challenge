import { ProductMockBuilder } from '@src/__mocks__/product.mock-builder';
import redis from '@src/adapter/driven/infra/lib/redis';
import { CacheService } from '@src/core/application/services/cacheService';
import logger from '@src/core/common/logger';

jest.mock('@src/adapter/driven/infra/lib/redis', () => ({
	get: jest.fn(),
	set: jest.fn(),
	del: jest.fn(),
}));

describe('CacheService -> Test', () => {
	let service: CacheService;

	beforeEach(() => {
		service = new CacheService();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('get', () => {
		test('should not find cache', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			await service.get('local:key');

			expect(loggerSpy).toHaveBeenCalledWith('Cache miss for key: local:key');
		});

		test('should find cache', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			jest.spyOn(redis, 'get').mockResolvedValue('{"value": "cache"}');

			const result = await service.get('local:key');

			expect(loggerSpy).toHaveBeenCalledWith('Cache hit for key: local:key');
			expect(result).toEqual({ value: 'cache' });
		});

		test('should trigger logger error', async () => {
			jest.spyOn(redis, 'get').mockRejectedValue({ message: 'error' });

			const rejectedFunction = async () => {
				await service.get('local:key');
			};

			expect(rejectedFunction()).rejects.toThrow(Error);
			expect(rejectedFunction()).rejects.toThrow('[CacheService] Error: error');
		});
	});

	describe('set', () => {
		test('should set cache', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const objectToCache = new ProductMockBuilder()
				.withDefaultValues()
				.build();

			jest.spyOn(redis, 'set').mockResolvedValue('{"value": "cache"}');

			await service.set('local:key', objectToCache, 4000);

			expect(loggerSpy).toHaveBeenCalledWith(
				'Cache set for key: local:key with TTL: 4000 seconds'
			);
		});

		test('should trigger logger error', async () => {
			const objectToCache = new ProductMockBuilder()
				.withDefaultValues()
				.build();

			jest.spyOn(redis, 'set').mockRejectedValue({ message: 'error' });

			const rejectedFunction = async () => {
				await service.set('local:key', objectToCache, 4000);
			};

			expect(rejectedFunction()).rejects.toThrow(Error);
			expect(rejectedFunction()).rejects.toThrow('[CacheService] Error: error');
		});
	});

	describe('delete', () => {
		test('should delete cache', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			jest.spyOn(redis, 'del').mockResolvedValue(0);

			await service.delete('local:key');

			expect(loggerSpy).toHaveBeenCalledWith(
				'Cache deleted for key: local:key'
			);
		});

		test('should trigger logger error', async () => {
			jest.spyOn(redis, 'del').mockRejectedValue({ message: 'error' });

			const rejectedFunction = async () => {
				await service.delete('local:key');
			};

			expect(rejectedFunction()).rejects.toThrow(Error);
			expect(rejectedFunction()).rejects.toThrow('[CacheService] Error: error');
		});
	});
});
