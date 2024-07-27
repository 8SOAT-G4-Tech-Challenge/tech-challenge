export interface User {
	id: string;
	name: string | null;
	email: string;
	password: string;
	sessionToken: string | null;
	isAdmin: boolean;
	createdAt: Date;
	updatedAt: Date;
}
