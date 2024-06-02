/* eslint-disable @typescript-eslint/no-unused-vars */

namespace AUTHORIZATION {
	type RegistrationResponse = {
		token: string;
		simpleResponse: SimpleResponse;
		firstName: string;
	};
	type SimpleResponse = {
		httpStatus: string;
		message: string;
	};
	type RegistrationRequest = {
		name: string;
		email: string;
		password: string;
	};
	type LoginResponse = {
		token: string;
		id: number;
		email: string;
		role: string;
		firstName;
	};
	type LoginRequest = {
		email: string;
		password: string;
	};
	type VendorRegistrationResponse = {
		token: string;
		simpleResponse: SimpleVResponse;
	};
	type SimpleVResponse = {
		httpStatus: string;
		message: string;
	};
	type VendorRegistrationRequest = {
		firstName: string;
		lastName: string;
		phoneNumber: string;
		email: string;
		password: string;
	};
}
