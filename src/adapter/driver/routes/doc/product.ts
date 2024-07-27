export const SwaggerGetProducts = {
    schema: {
        summary: 'Get products',
        description: 'Returns products',
        tags: ['Product'],
        querystring: {
            type: "object",
            properties: {
                category: {
                    type: "string",
                },
            }
        },
        response: {
            200: {
                description: 'Success get products',
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
                        amount: {
                            type: 'string',
                            format: 'money'
                        },
                        category: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'string'
                                },
                                name: {
                                    type: 'string'
                                }
                            }
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
                description: 'Unexpected error when listing for products',
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