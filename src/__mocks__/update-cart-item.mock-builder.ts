export class UpdateCartItemMockBuilder {
	id: string;

	quantity: number;

	details: string;

	constructor() {
		this.id = '';
		this.quantity = 0;
		this.details = '';
	}

	withId(value: string) {
		this.id = value;
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

	withDefaultValues() {
		this.id = 'item12345-6789-4def-1234-56789abcdef0';
		this.quantity = 5;
		this.details = 'Default item details.';
		return this;
	}

	build() {
		return {
			id: this.id,
			quantity: this.quantity,
			details: this.details,
		};
	}
}
