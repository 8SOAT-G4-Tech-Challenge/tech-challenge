import logger from '@common/logger';

import redisClient from '../ports/output/redisClient';

export class CacheService {
	private logError(action: string, key: string, error: any): void {
		logger.error(
			`Error during ${action} for key: ${key}. Error: ${error.message}`
		);
	}

	async get<T>(key: string): Promise<T | null> {
		try {
			const cacheData = await redisClient.get(key);
			if (!cacheData) {
				logger.info(`Cache miss for key: ${key}`);
				return null;
			}
			logger.info(`Cache hit for key: ${key}`);
			return JSON.parse(cacheData) as T;
		} catch (error) {
			this.logError('GET', key, error);
			throw error;
		}
	}

	async set<T>(key: string, value: T, ttlInSeconds: number): Promise<void> {
		try {
			await redisClient.set(key, JSON.stringify(value), { EX: ttlInSeconds });
			logger.info(
				`Cache set for key: ${key} with TTL: ${ttlInSeconds} seconds`
			);
		} catch (error) {
			this.logError('SET', key, error);
			throw error;
		}
	}

	async delete(key: string): Promise<void> {
		try {
			await redisClient.del(key);
			logger.info(`Cache deleted for key: ${key}`);
		} catch (error) {
			this.logError('DELETE', key, error);
			throw error;
		}
	}
}

export const cacheService = new CacheService();
