export interface Customer {
	id: string;
	name: string | null;
	email: string | null;
	cpf: string;
	createdAt: Date;
	updatedAt: Date;
}
