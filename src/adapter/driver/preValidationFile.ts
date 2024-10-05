import { FastifyReply, FastifyRequest } from 'fastify';

export const preValidationFile = async (
	req: FastifyRequest,
	reply: FastifyReply
) => {
	console.log('testetetete');
	// const file = { ...req.body.file };
	// req.body.file = '@images';
	// req.body[Symbol.for('images')] = file;
};
