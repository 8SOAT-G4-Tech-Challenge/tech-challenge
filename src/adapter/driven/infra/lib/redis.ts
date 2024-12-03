import { createClient } from 'redis';

import logger from '@common/logger';

const redis = createClient({ url: process.env.REDIS_URL });

redis.on('error', (err) => {
	logger.info(`Redis Client Error: ${err}`);
	redis.quit();
});

(async () => {
	try {
		await redis.connect();
		logger.info('Connected to Redis');
	} catch (err) {
		logger.info(`Error connecting to Redis: ${err}`);
		redis.quit();
	}
})();

export default redis;
