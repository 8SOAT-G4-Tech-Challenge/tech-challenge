export class ProductCategoryMockBuilder {
	id: string;

	name: string;

	createdAt: Date;

	updatedAt: Date;

	constructor() {
		this.id = '';
		this.name = '';
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	withId(value: string) {
		this.id = value;
		return this;
	}

	withName(value: string) {
		this.name = value;
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
		this.id = 'entity12345-6789-4def-1234-56789abcdef0';
		this.name = 'Default Name';
		this.createdAt = new Date();
		this.updatedAt = new Date();
		return this;
	}

	build() {
		return {
			id: this.id,
			name: this.name,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}
}
