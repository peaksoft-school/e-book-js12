/* eslint-disable @typescript-eslint/no-unused-vars */

namespace AUTHORIZATION {
	type RegistrationResponse = {
		httpStatus: string;
		message: string;
	};
	type SimpleResponse = {
		httpStatus: string;
		message: string;
	};
	type RegistrationRequest = {
		firstName: string;
		email: string;
		password: string;
	};
	type LoginResponse = {
		token: string;
		id: number;
		email: string;
		role: string;
	};

	type ConfirmEmailResponse = {
		token: string;
		firstName: string;
		simpleResponse: SimpleResponse;
	};

	type SimpleResponse = {
		httpStatus: string;
		message: string;
	};

	type ConfirmEmailRequest = {
		email: string;
		code: number | string;
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
