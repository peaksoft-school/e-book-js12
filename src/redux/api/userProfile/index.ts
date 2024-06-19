import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		clientProfile: build.mutation<
			USERPROFILE.UserProfileResponse,
			USERPROFILE.UserProfileRequest
		>({
			query: (newData) => ({
				url: `/api/client/updateClient`,
				method: 'PUT',
				body: newData
			}),
			invalidatesTags: ['clientProfile']
		}),
		clientGetProfile: build.query<PROFILE.UserGetProfileResponse, void>({
			query: () => ({
				url: '/api/client/getProfile',
				method: 'GET'
			}),
			providesTags: ['clientProfile']
		}),
		updatePasswordUser: build.mutation<
			PASS.UpdatePasswordUserResponse,
			PASS.UpdatePasswordUserRequest
		>({
			query: (passwordData) => (
				console.log(passwordData),
				{
					url: '/api/user/updatePassword',
					method: 'PUT',
					body: passwordData
				}
			),
			invalidatesTags: ['clientProfile']
		}),
		deletUserProfile: build.mutation<
			PASS.ProfileDeleteResponse,
			PASS.ProfileDeleteRequest
		>({
			query: (data) => ({
				url: `/api/client/deleteClient`,
				method: 'DELETE',
				bady: data
			}),
			invalidatesTags: ['clientProfile']
		})
	})
});

export const {
	useDeletUserProfileMutation,
	useClientProfileMutation,
	useClientGetProfileQuery,
	useUpdatePasswordUserMutation
} = api;
