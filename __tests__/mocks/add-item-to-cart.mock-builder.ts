export class AddItemToCartMockBuilder {
	productId: string;

	quantity: number;

	details: string;

	orderId: string;

	constructor() {
		this.productId = '';
		this.quantity = 0;
		this.details = '';
		this.orderId = '';
	}

	withProductId(value: string) {
		this.productId = value;
		return this;
	}

	withQuantity(value: number) {
		this.quantity = value;
		return this;
	}

	withDetails(value: string) {
		this.details = value;
		return this;
	}

	withOrderId(value: string) {
		this.orderId = value;
		return this;
	}

	withDefaultValues() {
		this.productId = 'product12345-6789-4def-1234-56789abcdef0';
		this.quantity = 3;
		this.details = 'Default item details.';
		this.orderId = 'order12345-6789-4def-1234-56789abcdef0';
		return this;
	}

	build() {
		return {
			productId: this.productId,
			quantity: this.quantity,
			details: this.details,
			orderId: this.orderId,
		};
	}
}
