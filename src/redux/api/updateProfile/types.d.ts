/* eslint-disable @typescript-eslint/no-unused-vars */
namespace PROFILE {
	type UpdateProfileResponse = {
		success: boolean;
		message: string;
	};

	type UpdateProfileRequest = {
		firstName?: string;
		lastName?: string;
		phoneNumber?: string;
		email?: string;
		currentPassword?: string;
		newPassword?: string;
		confirmPassword?: string;
	};
}

namespace INFO {
	type UpdateInfoProfileResponse = {
		firstName: string;
		lastName: string;
		phoneNumber: string;
		email: string;
	};
}

namespace PASSWORD {
	type UpdatePasswordResponse = {
		success: boolean;
		message: string;
	};

	type UpdatePasswordRequest = {
		currentVendorPassword: string;
		password: string;
		confirmPassword: string;
	};

	type VendorDeleteResponse = {
		httpStatus: string;
		message: string;
	}[];
	type VendorDeleteRequest = void;
}
