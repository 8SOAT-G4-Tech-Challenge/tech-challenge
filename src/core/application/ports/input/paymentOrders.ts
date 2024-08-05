export type MakePaymentOrderParams = {
	orderId: string;
};

export type CreatePaymentOrderParams = {
	orderId: string;
	value: number;
};

export type GetPaymentOrderByIdParams = {
	id: string;
};

export type GetPaymentOrderByOrderIdParams = {
	orderId: string;
};
