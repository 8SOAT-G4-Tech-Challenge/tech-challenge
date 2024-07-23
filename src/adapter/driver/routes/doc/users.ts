export const SwaggerGetUsers = {
    schema: {
        summary: 'Get users',
        description: 'Returns users data',
        tags: ['User'],
        response: {
            200: {
                description: 'Success get users data',
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid'
                        },
                        name: {
                            type: 'string'
                        },
                        email: {
                            type: 'string',
                            format: 'email'
                        },
                        password: {
                            type: 'string',
                        },
                        sessionToken: {
                            type: 'string',
                        },
                        isAdmin: {
                            type: 'boolean'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'datetime'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'datetime'
                        }
                    }
                } 
            },
            500: {
                description: 'Unexpected error when listing for users',
                type: 'object',
                properties: {
                    path: {
                        type: 'string'
                    },
                    status: {
                        type: 'string'
                    },
                    message: {
                        type: 'string'
                    },
                    details: {
                        type: 'array',
                        items: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    }
}