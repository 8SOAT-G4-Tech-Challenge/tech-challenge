export class CustomerMockBuilder {
	id: string;

	name: string | null;

	email: string | null;

	cpf: string;

	createdAt: Date;

	updatedAt: Date;

	constructor() {
		this.id = '';
		this.name = null;
		this.email = null;
		this.cpf = '';
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	withId(value: string) {
		this.id = value;
		return this;
	}

	withName(value: string | null) {
		this.name = value;
		return this;
	}

	withEmail(value: string | null) {
		this.email = value;
		return this;
	}

	withCpf(value: string) {
		this.cpf = value;
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
		this.id = 'user12345-6789-4def-1234-56789abcdef0';
		this.name = 'John Doe';
		this.email = 'johndoe@example.com';
		this.cpf = '12345678900';
		this.createdAt = new Date();
		this.updatedAt = new Date();
		return this;
	}

	build() {
		return {
			id: this.id,
			name: this.name,
			email: this.email,
			cpf: this.cpf,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}
}
