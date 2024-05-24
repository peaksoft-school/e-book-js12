/* eslint-disable @typescript-eslint/no-unused-vars */
namespace USERPROFILE {
	type UserProfileResponse = {
		token: string;
		id: number;
		email: string;
	};
	type UserProfileRequest = {
		firstName: string;
		email: string;
		oldPassword: string;
		newPassword: string;
	};
}
