/* eslint-disable @typescript-eslint/no-unused-vars */
namespace USERPROFILE {
	type UserProfileResponse = {
		token: string;
		id: number;
		email: string;
	};
	export type UserProfileRequest = {
		firstName: string;
		email: string;
	};
}

namespace PROFILE {
	type UserGetProfileResponse = {
		email: string;
		name: string;
	};
}

namespace PASS {
	type UpdatePasswordUserResponse = {
		success: boolean;
		message: string;
	};

	type UpdatePasswordUserRequest = {
		currentVendorPassword: string;
		password: string;
		confirmPassword: string;
	};

	type ProfileDeleteResponse = {
		httpStatus: string;
		message: string;
	}[];
	type ProfileDeleteRequest = void;
}
