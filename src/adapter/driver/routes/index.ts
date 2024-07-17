import { CustomerController } from '@controllers/customerController';
import { UserController } from '@controllers/userController';
import { ProductController } from '../controllers/productController';
import { CustomerRepositoryImpl } from '@driven/infra/customerRepositoryImpl';
import { UserRepositoryImpl } from '@driven/infra/userRepositoryImpl';
import { ProductRepositoryImpl } from '@driven/infra/productRepositoryImpl';
import { CustomerService } from '@services/customerService';
import { UserService } from '@services/userService';
import { ProductService } from '@services/productService';
import { FastifyInstance } from 'fastify';

const userRepository = new UserRepositoryImpl();
const customerRepository = new CustomerRepositoryImpl();
const productRepository = new ProductRepositoryImpl();

const userService = new UserService(userRepository);
const customerService = new CustomerService(customerRepository);
const productService = new ProductService(productRepository);

const userController = new UserController(userService);
const customerController = new CustomerController(customerService);
const productController = new ProductController(productService);

export const routes = async (fastify: FastifyInstance) => {
	fastify.get('/users', {
		schema: {
			summary: 'Get users data',
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
	}, userController.getUsers.bind(userController));

	fastify.get('/customers', customerController.getCustomers.bind(customerController));
	fastify.get('/customers/property', customerController.getCustomerByProperty.bind(customerController));
	fastify.post('/customers', customerController.createCustomer.bind(customerController));
	fastify.get('/products', {
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
	}, productController.getProducts.bind(productController));

	fastify.post('/products/categories', {
		schema: {
			summary: 'Create product category',
			description: 'Create product category',
			tags: ['Product'],
			body: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Product category name'
                    }
                }
            },
			response: {
				201: {
					description: 'Created product category',
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
				400: {
					description: 'Invalid parameters to product category create',
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
					description: 'Unexpected error when creating product category',
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
	}, productController.createProductCategory.bind(productController));

	fastify.get('/products/categories', {
		schema: {
			summary: 'Get product categories',
			description: 'Returns product categories',
			tags: ['Product'],
			response: {
				200: {
					description: 'Success get product categories',
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
					description: 'Unexpected error when listing for product categories',
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
	}, productController.getProductCategories.bind(productController));
};
