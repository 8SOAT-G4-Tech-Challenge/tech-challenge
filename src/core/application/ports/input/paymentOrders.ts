export type MakePaymentOrderParams = {
	orderId: string;
	amount: number;
};

export type GetPaymentOrderByIdParams = {
	id: string;
};

export type GetPaymentOrderByOrderIdParams = {
	orderId: string;
};
