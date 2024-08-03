export type UpdateCartItemParams = {
	id: string;
};

export type UpdateCartItemBody = {
	quantity: number;
	details: string;
};

export type UpdateCartItemProps = UpdateCartItemParams & UpdateCartItemBody;

export type UpdateCartItemRepositoryProps = UpdateCartItemProps & {
	value: number;
};

export type AddItemToCartBody = {
	productId: string;
	quantity: number;
	details: string;
};

export type AddItemToCartProps = AddItemToCartBody & {
	orderId: string;
};

export type AddItemToCartRepositoryProps = AddItemToCartProps & {
	value: number;
};
