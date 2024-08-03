import { OrderStatusEnum } from '@domain/enums/orderStatusEnum';

export const SwaggerGetOrders = {
	schema: {
		summary: 'Get orders data',
		description: 'Returns all orders or orders by status',
		tags: ['Orders'],
		querystring: {
			status: {
				type: 'string',
				enum: [...Object.values(OrderStatusEnum)],
			},
		},
		response: {
			200: {
				description: 'Success get orders data',
				type: 'array',
				items: {
					type: 'object',
					properties: {
						id: {
							type: 'string',
						},
						customerId: {
							type: 'string',
							format: 'nullable',
						},
						status: {
							type: 'string',
						},
						value: {
							type: 'number',
						},
						createdAt: {
							type: 'string',
							format: 'date-time',
						},
						updatedAt: {
							type: 'string',
							format: 'date-time',
						},
						items: {
							type: 'array',
							items: {
								type: 'object',
								properties: {
									id: {
										type: 'string',
									},
									orderId: {
										type: 'string',
									},
									productId: {
										type: 'string',
									},
									quantity: {
										type: 'integer',
										format: 'int32',
									},
									value: {
										type: 'string',
									},
									details: {
										type: 'string',
									},
									createdAt: {
										type: 'string',
										format: 'date-time',
									},
									updatedAt: {
										type: 'string',
										format: 'date-time',
									},
									product: {
										type: 'object',
										properties: {
											id: {
												type: 'string',
											},
											categoryId: {
												type: 'string',
											},
											name: {
												type: 'string',
											},
											value: {
												type: 'string',
											},
											description: {
												type: 'string',
											},
											createdAt: {
												type: 'string',
												format: 'date-time',
											},
											updatedAt: {
												type: 'string',
												format: 'date-time',
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
													createdAt: {
														type: 'string',
														format: 'date-time',
													},
													updatedAt: {
														type: 'string',
														format: 'date-time',
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
														},
														productId: {
															type: 'string',
														},
														url: {
															type: 'string',
														},
														createdAt: {
															type: 'string',
															format: 'date-time',
														},
														updatedAt: {
															type: 'string',
															format: 'date-time',
														},
													},
												},
											},
										},
									},
								},
							},
						},
						customer: {
							type: 'object',
							properties: {
								id: {
									type: 'string',
								},
								name: {
									type: 'string',
								},
								email: {
									type: 'string',
								},
								cpf: {
									type: 'string',
								},
								createdAt: {
									type: 'string',
									format: 'date-time',
								},
								updatedAt: {
									type: 'string',
									format: 'date-time',
								},
							},
						},
						payment: {
							type: 'object',
							properties: {
								id: {
									type: 'string',
								},
								orderId: {
									type: 'string',
								},
								status: {
									type: 'string',
								},
								paidAt: {
									type: 'string',
									format: 'nullable',
								},
								createdAt: {
									type: 'string',
									format: 'date-time',
								},
								updatedAt: {
									type: 'string',
									format: 'date-time',
								},
							},
						},
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

export const SwaggerGetOrdersById = {
	schema: {
		summary: 'Get orders by Id',
		description: 'Returns orders by Id',
		tags: ['Orders'],
		params: { id: { type: 'string' } },
		response: {
			200: {
				description: 'Success get orders data',
				type: 'object',
				properties: {
					id: {
						type: 'string',
					},
					customerId: {
						type: 'string',
						format: 'nullable',
					},
					status: {
						type: 'string',
					},
					value: {
						type: 'number',
					},
					createdAt: {
						type: 'string',
						format: 'date-time',
					},
					updatedAt: {
						type: 'string',
						format: 'date-time',
					},
					items: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								id: {
									type: 'string',
								},
								orderId: {
									type: 'string',
								},
								productId: {
									type: 'string',
								},
								quantity: {
									type: 'integer',
									format: 'int32',
								},
								value: {
									type: 'string',
								},
								details: {
									type: 'string',
								},
								createdAt: {
									type: 'string',
									format: 'date-time',
								},
								updatedAt: {
									type: 'string',
									format: 'date-time',
								},
								product: {
									type: 'object',
									properties: {
										id: {
											type: 'string',
										},
										categoryId: {
											type: 'string',
										},
										name: {
											type: 'string',
										},
										value: {
											type: 'string',
										},
										description: {
											type: 'string',
										},
										createdAt: {
											type: 'string',
											format: 'date-time',
										},
										updatedAt: {
											type: 'string',
											format: 'date-time',
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
												createdAt: {
													type: 'string',
													format: 'date-time',
												},
												updatedAt: {
													type: 'string',
													format: 'date-time',
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
													},
													productId: {
														type: 'string',
													},
													url: {
														type: 'string',
													},
													createdAt: {
														type: 'string',
														format: 'date-time',
													},
													updatedAt: {
														type: 'string',
														format: 'date-time',
													},
												},
											},
										},
									},
								},
							},
						},
					},
					customer: {
						type: 'object',
						properties: {
							id: {
								type: 'string',
							},
							name: {
								type: 'string',
							},
							email: {
								type: 'string',
							},
							cpf: {
								type: 'string',
							},
							createdAt: {
								type: 'string',
								format: 'date-time',
							},
							updatedAt: {
								type: 'string',
								format: 'date-time',
							},
						},
					},
					payment: {
						type: 'object',
						properties: {
							id: {
								type: 'string',
							},
							orderId: {
								type: 'string',
							},
							status: {
								type: 'string',
							},
							paidAt: {
								type: 'string',
								format: 'nullable',
							},
							createdAt: {
								type: 'string',
								format: 'date-time',
							},
							updatedAt: {
								type: 'string',
								format: 'date-time',
							},
						},
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

export const SwaggerUpdateOrder = {
	schema: {
		summary: 'Update order',
		description: `Update order - possible status: ${Object.values(
			OrderStatusEnum
		)}`,
		tags: ['Orders'],
		params: { id: { type: 'string' } },
		body: {
			status: {
				type: 'string',
			},
		},
		response: {
			200: {
				description: 'Success updated order data',
				type: 'object',
				properties: {
					id: {
						type: 'string',
					},
					customerId: {
						type: 'string',
						format: 'nullable',
					},
					status: {
						type: 'string',
					},
					createdAt: {
						type: 'string',
						format: 'date-time',
					},
					updatedAt: {
						type: 'string',
						format: 'date-time',
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

export const SwaggerCreateOrder = {
	schema: {
		summary: 'Create order',
		description: 'Create an empty order with status equals created',
		tags: ['Orders'],
		body: {
			type: 'object',
			properties: {
				customerId: { type: 'string' },
			},
		},
		response: {
			201: {
				description: 'Success created order data',
				type: 'object',
				properties: {
					id: {
						type: 'string',
					},
					customerId: {
						type: 'string',
						format: 'nullable',
					},
					status: {
						type: 'string',
					},
					createdAt: {
						type: 'string',
						format: 'date-time',
					},
					updatedAt: {
						type: 'string',
						format: 'date-time',
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
