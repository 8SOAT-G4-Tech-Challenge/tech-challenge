export const SwaggerGetPaymentOrders = {
	schema: {
		summary: 'Get payment orders',
		description: 'Returns payment orders data',
		tags: ['Payment Order'],
		response: {
			200: {
				description: 'Success get payment orders data',
				type: 'array',
				items: {
					type: 'object',
					properties: {
						id: {
							type: 'string',
							format: 'uuid',
						},
						orderId: {
							type: 'string',
							format: 'uuid',
						},
						status: {
							type: 'string',
						},
						paidAt: {
							type: 'string',
							format: 'datetime',
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
				description: 'Unexpected error when listing for payment orders',
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

export const SwaggerGetPaymentOrderById = {
	schema: {
		summary: 'Get payment order by ID',
		description: 'Returns payment order data for a specific ID',
		tags: ['Payment Order'],
		params: {
			type: 'object',
			properties: {
				id: {
					type: 'string',
					format: 'uuid',
					description: 'The ID of the payment order to retrieve',
				},
			},
			required: ['id'],
		},
		response: {
			200: {
				description: 'Success get payment order data',
				type: 'object',
				properties: {
					id: {
						type: 'string',
						format: 'uuid',
					},
					orderId: {
						type: 'string',
						format: 'uuid',
					},
					status: {
						type: 'string',
					},
					paidAt: {
						type: 'string',
						format: 'datetime',
					},
					amount: {
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
			404: {
				description: 'Payment order not found',
				type: 'object',
				properties: {
					message: {
						type: 'string',
					},
				},
			},
			500: {
				description: 'Unexpected error when retrieving payment order',
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

export const SwaggerGetPaymentOrderByOrderId = {
	schema: {
		summary: 'Get payment order by Order ID',
		description: 'Returns payment order data for a specific Order ID',
		tags: ['Payment Order'],
		params: {
			type: 'object',
			properties: {
				orderId: {
					type: 'string',
					format: 'uuid',
					description: 'Order ID that has a payment order',
				},
			},
			required: ['orderId'],
		},
		response: {
			200: {
				description: 'Success get payment order data',
				type: 'object',
				properties: {
					id: {
						type: 'string',
						format: 'uuid',
					},
					orderId: {
						type: 'string',
						format: 'uuid',
					},
					status: {
						type: 'string',
					},
					paidAt: {
						type: 'string',
						format: 'datetime',
					},
					amount: {
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
			404: {
				description: 'Payment order not found',
				type: 'object',
				properties: {
					message: {
						type: 'string',
					},
				},
			},
			500: {
				description: 'Unexpected error when retrieving payment order',
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

export const SwaggerPaymentOrderMakePayment = {
	schema: {
		summary: 'Make a payment for an order (fake checkout)',
		description: 'Processes the payment for the specified order',
		tags: ['Payment Order'],
		body: {
			type: 'object',
			properties: {
				orderId: {
					type: 'string',
					format: 'uuid',
					description: 'The ID of the order to make payment for',
				},
				amount: {
					type: 'string',
					description: 'The amount to be paid',
				},
			},
			required: ['amount'],
		},
		response: {
			200: {
				description: 'Order payment successfully completed',
				type: 'object',
				properties: {
					message: {
						type: 'string',
					},
				},
			},
			400: {
				description: 'Bad Request',
				type: 'object',
				properties: {
					message: {
						type: 'string',
					},
				},
			},
			500: {
				description: 'Unexpected error when making payment',
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
