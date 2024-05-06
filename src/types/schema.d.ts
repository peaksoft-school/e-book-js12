type DateTime = string;

type User = {
	id: number;
	firstName: string;
	lastName: string;
	role: UserRole;
	auth: string;
	login: string;
	password: string;
	isActive: boolean;
	photo: string;
	phone: string;
	isPhoneVerified: boolean;
	traffic: string;
	createdAt: DateTime;
	updatedAt: DateTime;
};

type UserRole = 'ADMIN' | 'USER';

type Rating = {
	userId: number;
	firstName: string;
	lastName: string;
	role: string;
	photo: string;
	totalReq: number;
	get: number | null;
	post: number | null;
	put: number | null;
	patch: number | null;
	delete: number | null;
	createdAt: string;
	updatedAt: string;
};
