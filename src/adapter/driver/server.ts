import fastifyCors from '@fastify/cors';
import fastifyMultipart from '@fastify/multipart';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { routes } from '@routes/index';
import { errorHandler } from '@src/core/common/errorHandler';
import logger from '@src/core/common/logger';
import fastify from 'fastify';
import helmet from '@fastify/helmet';

export const app = fastify();

app.register(fastifyCors, {
    origin: '*',
});

app.register(fastifySwagger, {
    swagger: {
        consumes: ['application/json', 'multipart/form-data'],
        produces: ['application/json', 'multipart/form-data'],
        info: {
            title: 'FIAP - Tech Challenge',
            description: 'Especificações da API para o back-end da aplicação de restaurante FIAP Tech Challenge.',
            version: '1.0.0',
        },
    }
});

app.register(fastifySwaggerUI, {
    routePrefix: '/docs',
});

app.register(fastifyMultipart);

app.register(helmet, {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        },
    },
    frameguard: {
        action: 'deny',
    },
    referrerPolicy: {
        policy: 'no-referrer',
    },
    xssFilter: true,
    noSniff: true,
});

app.register(routes);

app.setErrorHandler(errorHandler);

async function run() {
    await app.ready();

    await app.listen({
        port: Number(process.env.API_PORT) || 3333,
        host: '0.0.0.0',
    });

    logger.info('Documentation running at http://localhost:3333/docs');
}

run();
