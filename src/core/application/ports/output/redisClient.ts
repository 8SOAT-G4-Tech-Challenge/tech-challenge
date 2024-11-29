import { createClient } from 'redis';

const redisClient = createClient({
	url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));

(async () => {
	try {
		await redisClient.connect();
		console.log('Connected to Redis');
	} catch (err) {
		console.error('Error connecting to Redis:', err);
	}
})();

export default redisClient;
