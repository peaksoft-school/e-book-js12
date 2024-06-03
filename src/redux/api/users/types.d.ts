namespace USERS {
	type GetAllUsersResponse = {
		page: number;
		pageSize: number;
		clients: [
			{
				clientId: number;
				firstName: string;
				email: string;
			}
		];
	};
	type GetAllUsersRequest = void;

	type GetUserProfileResponse = {
		email: string;
		name: string;
		dataOfRegistration: string;
	}
	type GetUserProfileRequest = number;

	type DeleteUserByIdResponse = {
		httpStatus: string;
		message: string;
	}[];
	type DeleteUserByIdRequest = number;
}
