export const SwaggerGetCustomers = {
    schema: {
        summary: 'Get customers',
        description: 'Returns customers data',
        tags: ['Customer'],
        response: {
            200: {
                description: 'Success get customers data',
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
                        cpf: {
                            type: 'string',
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
                description: 'Unexpected error when listing for customers',
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

export const SwaggerGetCustomersProperty = {
    schema: {
        summary: 'Get customer by property',
        description: 'Get a customer by ID or CPF',
        tags: ['Customer'],
        querystring: {
            type: 'object',
            properties: {
                id: { type: 'string', format: 'uuid' },
                cpf: { type: 'string' }
            },
            additionalProperties: false,
            required: []
        },
        response: {
            200: {
                description: 'Customer found',
                type: 'object',
                properties: {
                    id: { 
                        type: 'string' 
                    },
                    name: { 
                        type: 'string'
                    },
                    email: { 
                        type: 'string' 
                    },
                    cpf: { 
                        type: 'string' 
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
            },
            400: {
                description: 'Invalid parameters to get customer',
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
            },
            500: {
                description: 'Unexpected error when getting customer',
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

export const SwaggerCreateCustomers = {
    schema: {
        summary: 'Create customer',
        description: 'Create customer',
        tags: ['Customer'],
        body: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    description: 'Customer name'
                },
                email: {
                    type: 'string',
                    description: 'Customer email'
                },
                cpf: {
                    type: 'string',
                    description: 'Customer cpf'
                }
            }
        },
        response: {
            201: {
                description: 'Created customer',
                type: 'object',
                properties: {
                    id: {
                        type: 'string'
                    },
                    name: {
                        type: 'string'
                    },
                    email: {
                        type: 'string'
                    },
                    cpf: {
                        type: 'string'
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
            },
            400: {
                description: 'Invalid parameters to customer create',
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
            },
            500: {
                description: 'Unexpected error when creating customer',
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

export const SwaggerDeleteCustomers = {
    schema: {
        summary: 'Delete customer',
        description: 'Delete a customer by ID',
        tags: ['Customer'],
        params: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'The unique identifier of the customer to delete'
                }
            },
            required: ['id'],
            additionalProperties: false
        },
        response: {
            200: {
                description: 'Customer successfully deleted',
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'Customer successfully deleted'
                    }
                }
            },
            404: {
                description: 'Customer not found',
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
            },
            500: {
                description: 'Unexpected error when deleting customer',
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
