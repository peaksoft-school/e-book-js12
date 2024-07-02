/* eslint-disable @typescript-eslint/no-unused-vars */

namespace AUTHORIZATION {
	type RegistrationResponse = {
		data: Data;
		error: ErrorData;
	};

	type ErrorData = {
		password: string;
	};

	type Data = {
		httpStatus: string;
		message: string;
	};

	type RegistrationRequest = {
		firstName: string;
		email: string;
		password: string;
	};

	type SimpleResponse = {
		httpStatus: string;
		message: string;
	};

	type LoginResponse = {
		data?: {
			token: string;
			id: number;
			email: string;
			role: string;
			firstName: string;
		};
		error?: {
			data: {
				httpStatus: string;
				message: string;
				password: string;
				email: string;
			};
			status: number;
		};
	};

	type ConfirmEmailResponse = {
		data?: {
			token: string;
			firstName: string;
			simpleResponse: SimpleResponse;
		};
		error: ConfirmEmailError;
	};

	type ConfirmEmailError = {
		status: number;
		data: {
			timestamp: string;
			status: number;
			error: string;
			message?: string;
			path: string;
			httpStatus: string;
			exceptionClassName: string;
		};
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
		data: Data;
		error: ErrorData;
	};

	type VendorRegistrationRequest = {
		firstName: string;
		lastName: string;
		phoneNumber: string;
		email: string;
		password: string;
	};

	type SendEmailResponse = {
		data: {
			httpStatus: string;
			message: string;
		};
		status: number;
		error?: {
			data: {
				message: string;
			};
			status: number;
		};
	};

	type SendEmailRequest = string;
}
