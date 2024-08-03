export interface OrderItem {
	id: string;
	orderId: string;
	productId: string;
	quantity: number;
	value: number;
	details: string | null;
	createdAt: Date;
	updatedAt: Date;
}
