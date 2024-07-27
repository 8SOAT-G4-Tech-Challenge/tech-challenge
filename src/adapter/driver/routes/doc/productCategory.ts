export const SwaggerCreateProductCategories = {
	schema: {
		summary: 'Create product category',
		description: 'Create product category',
		tags: ['Product Category'],
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
};

export const SwaggerGetProductCategories = {
	schema: {
		summary: 'Get product categories',
		description: 'Returns product categories',
		tags: ['Product Category'],
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
};
