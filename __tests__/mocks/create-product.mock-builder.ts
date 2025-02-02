import { MultipartFileBuffer } from '@src/core/application/ports/input/products';

export class CreateProductMockBuilder {
	id?: string;

	name: string;

	value: number;

	description: string;

	categoryId: string;

	images?: MultipartFileBuffer[];

	constructor() {
		this.id = '';
		this.name = '';
		this.value = 0;
		this.description = '';
		this.categoryId = '';
		this.images = [];
	}

	withId(value: string) {
		this.id = value;
		return this;
	}

	withName(value: string) {
		this.name = value;
		return this;
	}

	withValue(value: number) {
		this.value = value;
		return this;
	}

	withDescription(value: string) {
		this.description = value;
		return this;
	}

	withCategoryId(value: string) {
		this.categoryId = value;
		return this;
	}

	withImages(value: MultipartFileBuffer[]) {
		this.images = value;
		return this;
	}

	withDefaultValues() {
		this.id = '0e225117-b049-45c3-8c1f-39e1284154eb';
		this.name = 'Default Product';
		this.value = 99.99;
		this.description = 'This is a default product description';
		this.categoryId = '03d6ea4d-8030-423f-951e-6ec0b1222f39';
		this.images = [
			// @ts-expect-error typescript
			{
				buffer: Buffer.from('image1'),
				mimetype: 'image/png',
				filename: 'Awupkof',
			},
			// @ts-expect-error typescript
			{
				buffer: Buffer.from('image2'),
				mimetype: 'image/jpeg',
				filename: 'Imulivva',
			},
		];
		return this;
	}

	build() {
		return {
			id: this.id,
			name: this.name,
			value: this.value,
			description: this.description,
			categoryId: this.categoryId,
			images: this.images,
		};
	}
}
