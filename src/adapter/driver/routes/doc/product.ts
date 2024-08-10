export const SwaggerGetProducts = {
	schema: {
		summary: 'Get products',
		description: 'Returns products',
		tags: ['Product'],
		querystring: {
			type: 'object',
			properties: {
				category: {
					type: 'string',
				},
			},
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
							format: 'uuid',
						},
						name: {
							type: 'string',
						},
						value: {
							type: 'string',
							format: 'money',
						},
						description: {
							type: 'string',
						},
						category: {
							type: 'object',
							properties: {
								id: {
									type: 'string',
								},
								name: {
									type: 'string',
								},
							},
						},
						images: {
							type: 'array',
							items: {
								type: 'object',
								properties: {
									id: {
										type: 'string',
										format: 'uuid',
									},
									url: {
										type: 'string',
									},
									createdAt: {
										type: 'string',
										format: 'datetime',
									},
									updatedAt: {
										type: 'string',
										format: 'datetime',
									},
								},
							},
						},
						createdAt: {
							type: 'string',
							format: 'datetime',
						},
						updatedAt: {
							type: 'string',
							format: 'datetime',
						},
					},
				},
			},
			500: {
				description: 'Unexpected error when listing for products',
				type: 'object',
				properties: {
					path: {
						type: 'string',
					},
					status: {
						type: 'string',
					},
					message: {
						type: 'string',
					},
					details: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
				},
			},
		},
	},
};

export const SwaggerDeleteProducts = {
	schema: {
		summary: 'Delete products',
		description: 'Delete a product by ID',
		tags: ['Product'],
		params: {
			type: 'object',
			properties: {
				id: {
					type: 'string',
					format: 'uuid',
					description: 'The unique identifier of the product to delete',
				},
			},
			required: ['id'],
			additionalProperties: false,
		},
		response: {
			200: {
				description: 'Product successfully deleted',
				type: 'object',
				properties: {
					message: {
						type: 'string',
						example: 'Product successfully deleted',
					},
				},
			},
			404: {
				description: 'Product not found',
				type: 'object',
				properties: {
					path: {
						type: 'string',
					},
					status: {
						type: 'string',
					},
					message: {
						type: 'string',
					},
					details: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
				},
			},
			500: {
				description: 'Unexpected error when deleting product',
				type: 'object',
				properties: {
					path: {
						type: 'string',
					},
					status: {
						type: 'string',
					},
					message: {
						type: 'string',
					},
					details: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
				},
			},
		},
	},
};

export const SwaggerCreateProducts = {
	schema: {
		summary: 'Create products',
		description: 'Create products',
		consumes: ['multipart/form-data'],
		tags: ['Product'],
		body: {
			type: 'array',
			required: ['name', 'value', 'description', 'categoryId'],
			properties: {
				name: {
					type: 'string',
					description: 'Product name',
				},
				value: {
					type: 'number',
					description: 'Product value',
				},
				description: {
					type: 'string',
					description: 'Product description',
				},
				categoryId: {
					type: 'string',
					format: 'uuid',
					description: 'Product category',
				},
				images: {
					type: 'array',
					items: {
						type: 'string',
						description: 'Product images',
					},
				},
			},
		},
		response: {
			201: {
				description: 'Created products',
				type: 'object',
				properties: {
					id: {
						type: 'string',
					},
					name: {
						type: 'string',
					},
					value: {
						type: 'number',
					},
					description: {
						type: 'string',
					},
					categoryId: {
						type: 'string',
					},
					createdAt: {
						type: 'string',
						format: 'datetime',
					},
					updatedAt: {
						type: 'string',
						format: 'datetime',
					},
				},
			},
			400: {
				description: 'Invalid parameters to products create',
				type: 'object',
				properties: {
					path: {
						type: 'string',
					},
					status: {
						type: 'string',
					},
					message: {
						type: 'string',
					},
					details: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
				},
			},
			500: {
				description: 'Unexpected error when creating products',
				type: 'object',
				properties: {
					path: {
						type: 'string',
					},
					status: {
						type: 'string',
					},
					message: {
						type: 'string',
					},
					details: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
				},
			},
		},
	},
};

export const SwaggerUpdateProducts = {
	schema: {
		summary: 'Update products',
		description: 'Update products',
		consumes: ['multipart/form-data'],
		tags: ['Product'],
		params: { id: { type: 'string', format: 'uuid' } },
		body: {
			type: 'array',
			properties: {
				name: {
					type: 'string',
					description: 'Product name',
				},
				value: {
					type: 'number',
					description: 'Product value',
				},
				description: {
					type: 'string',
					description: 'Product description',
				},
				categoryId: {
					type: 'string',
					description: 'Product category',
				},
				images: {
					type: 'array',
					items: {
						type: 'string',
						description: 'Product images',
					},
				},
			},
		},
		response: {
			200: {
				description: 'Success updated product data',
				type: 'object',
				properties: {
					id: {
						type: 'string',
					},
					name: {
						type: 'string',
					},
					value: {
						type: 'number',
					},
					description: {
						type: 'string',
					},
					categoryId: {
						type: 'string',
					},
					createdAt: {
						type: 'string',
						format: 'datetime',
					},
					updatedAt: {
						type: 'string',
						format: 'datetime',
					},
				},
			},
			400: {
				description: 'Bad request',
				type: 'object',
				properties: {
					path: {
						type: 'string',
					},
					status: {
						type: 'number',
					},
					message: {
						type: 'string',
					},
					details: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
				},
			},
			500: {
				description: 'Server error',
				type: 'object',
				properties: {
					path: {
						type: 'string',
					},
					status: {
						type: 'string',
					},
					message: {
						type: 'string',
					},
					details: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
				},
			},
		},
	},
};
