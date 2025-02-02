export class ProductImageMockBuilder {
	private id: string;

	private productId: string;

	private url: string;

	private createdAt: Date;

	private updatedAt: Date;

	constructor() {
		this.id = '';
		this.productId = '';
		this.url = '';
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	withId(value: string) {
		this.id = value;
		return this;
	}

	withProductId(value: string) {
		this.productId = value;
		return this;
	}

	withUrl(value: string) {
		this.url = value;
		return this;
	}

	withCreatedAt(value: Date) {
		this.createdAt = value;
		return this;
	}

	withUpdatedAt(value: Date) {
		this.updatedAt = value;
		return this;
	}

	withDefaultValues() {
		this.id = 'd014876d-2531-46fd-b021-1b4ff2932ae6';
		this.productId = 'product12345-6789-4def-1234-56789abcdef0';
		this.url = 'https://example.com/image.jpg';
		this.createdAt = new Date();
		this.updatedAt = new Date();
		return this;
	}

	build() {
		return {
			id: this.id,
			productId: this.productId,
			url: this.url,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}
}
