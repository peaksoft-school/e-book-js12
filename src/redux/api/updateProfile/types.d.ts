/* eslint-disable @typescript-eslint/no-unused-vars */
namespace PROFILE {
	export interface UpdateProfileResponse {
		success: boolean;
		message: string;
	}

	export interface UpdateProfileRequest {
		firstName: string;
		lastName: string;
		phoneNumber: string;
		email: string;
		currentPassword: string;
		newPassword: string;
		confirmPassword: string;
	}
}
